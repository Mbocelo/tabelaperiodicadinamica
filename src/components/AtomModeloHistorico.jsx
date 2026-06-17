import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  CAMERA_Z_INICIAL,
  CAMERA_Z_MIN,
  CAMERA_Z_MAX
} from './Atom3D';
import { COORDINATES_GROUP_NAME, criarGrupoCoordenadas } from './coordenadas3D';
import { configurarIluminacaoSimples, atualizarLuzPeloPointer } from './iluminacao3D';

const FUNDO_3D = 0x263238;
const ROTACAO_VELOCIDADE = 0.005;

function hexParaCor(hex) {
  if (!hex) return 0x4caf50;
  const limpo = hex.replace('#', '');
  return parseInt(limpo, 16);
}

/** Elétrons uniformes no volume da esfera positiva (direcção + raio independentes) */
function distribuirEletronsThomson(n, raioMaximo) {
  const pontos = [];
  if (n <= 0) return pontos;

  const phi = Math.PI * (3 - Math.sqrt(5));
  let passoRaio = Math.floor(n * 0.618033988749895) % n;
  if (passoRaio === 0) passoRaio = 1;

  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n;
    const anel = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    const j = (i * passoRaio) % n;
    const raio = raioMaximo * Math.cbrt((j + 0.5) / n);
    pontos.push([
      Math.cos(theta) * anel * raio,
      y * raio,
      Math.sin(theta) * anel * raio
    ]);
  }
  return pontos;
}

function electronsPorCamadaBohr(Z) {
  const capacidades = [2, 8, 18, 32, 32, 18, 8];
  const camadas = [];
  let restante = Z;
  for (const cap of capacidades) {
    if (restante <= 0) break;
    const n = Math.min(restante, cap);
    camadas.push(n);
    restante -= n;
  }
  return camadas;
}

function posicaoEletronBohr(raio, angulo, plano) {
  const a = angulo;
  if (plano === 0) return [raio * Math.cos(a), 0, raio * Math.sin(a)];
  if (plano === 1) return [raio * Math.cos(a), raio * Math.sin(a), 0];
  return [0, raio * Math.cos(a), raio * Math.sin(a)];
}

function criarAnelOrbita(raio, plano = 0, cor = 0x88aacc) {
  const curva = new THREE.EllipseCurve(0, 0, raio, raio, 0, Math.PI * 2, false, 0);
  const pontos = curva.getPoints(96).map((p) => {
    if (plano === 0) return new THREE.Vector3(p.x, 0, p.y);
    if (plano === 1) return new THREE.Vector3(p.x, p.y, 0);
    return new THREE.Vector3(0, p.x, p.y);
  });
  const geo = new THREE.BufferGeometry().setFromPoints(pontos);
  const mat = new THREE.LineBasicMaterial({ color: cor, transparent: true, opacity: 0.55 });
  return new THREE.Line(geo, mat);
}

let texturaRotuloEletron = null;

function obterTexturaRotuloEletron() {
  if (texturaRotuloEletron) return texturaRotuloEletron;
  const canvas = document.createElement('canvas');
  const w = 56;
  const h = 48;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const baseY = h / 2 + 2;
    ctx.font = '400 26px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText('e', 4, baseY);

    ctx.font = '500 15px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText('−', 21, baseY - 9);
  }
  texturaRotuloEletron = new THREE.CanvasTexture(canvas);
  texturaRotuloEletron.colorSpace = THREE.SRGBColorSpace;
  return texturaRotuloEletron;
}

/** Etiqueta «e−» sempre visível, junto ao elétron (direcção radial) */
function criarRotuloEletronThomson(x, y, z, raioEletron = 3.5) {
  const len = Math.hypot(x, y, z) || 1;
  const nx = x / len;
  const ny = y / len;
  const nz = z / len;
  const offset = raioEletron + 0.35;

  const mat = new THREE.SpriteMaterial({
    map: obterTexturaRotuloEletron(),
    transparent: true,
    depthTest: false,
    depthWrite: false,
    toneMapped: false
  });
  const sprite = new THREE.Sprite(mat);
  sprite.center.set(0.1, 0.52);
  sprite.scale.set(14, 11, 1);
  sprite.position.set(nx * offset, ny * offset, nz * offset);
  sprite.renderOrder = 20;
  sprite.userData = { thomsonRotulo: true };
  return sprite;
}

function limparGrupo(group) {
  const filhosRemoviveis = group.children.filter((child) => child.name !== COORDINATES_GROUP_NAME);
  for (const child of filhosRemoviveis) {
    group.remove(child);
    child.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        const map = obj.material.map;
        if (map && map !== texturaRotuloEletron) map.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => {
          if (m.map && m.map !== texturaRotuloEletron) m.map.dispose();
          m.dispose();
        });
        else obj.material.dispose();
      }
    });
  }
}

function construirDalton(group, Z, corHex) {
  const raio = 52 + Math.log(Z + 1) * 4;
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(raio, 64, 64),
    new THREE.MeshPhongMaterial({
      color: hexParaCor(corHex),
      emissive: hexParaCor(corHex),
      emissiveIntensity: 0.08,
      specular: 0xffffff,
      shininess: 70
    })
  );
  mesh.userData = { tipoModelo: 'dalton' };
  group.add(mesh);
}

function construirThomson(group, Z) {
  const raioPositivo = 72 + Math.log(Z + 1) * 3;
  const esferaPositiva = new THREE.Mesh(
    new THREE.SphereGeometry(raioPositivo, 48, 48),
    new THREE.MeshPhongMaterial({
      color: 0xff9955,
      emissive: 0xff6622,
      emissiveIntensity: 0.12,
      transparent: true,
      opacity: 0.38,
      specular: 0xffccaa,
      shininess: 40,
      side: THREE.DoubleSide,
      depthWrite: false
    })
  );
  esferaPositiva.renderOrder = 0;
  group.add(esferaPositiva);

  const raioEletron = 3.5;
  const geoEletron = new THREE.SphereGeometry(raioEletron, 24, 24);
  const matEletron = new THREE.MeshPhongMaterial({
    color: 0x3399ff,
    emissive: 0x1166cc,
    emissiveIntensity: 0.25,
    specular: 0xffffff,
    shininess: 80,
    depthWrite: true
  });

  const pontos = distribuirEletronsThomson(Z, raioPositivo * 0.82);
  pontos.forEach(([x, y, z], i) => {
    const grupoEletron = new THREE.Group();
    grupoEletron.renderOrder = 10;
    const e = new THREE.Mesh(geoEletron, matEletron);
    e.renderOrder = 10;
    grupoEletron.add(e);
    grupoEletron.add(criarRotuloEletronThomson(x, y, z, raioEletron));
    grupoEletron.position.set(x, y, z);
    grupoEletron.userData = {
      thomson: true,
      baseX: x,
      baseY: y,
      baseZ: z,
      fase: i * 0.7
    };
    group.add(grupoEletron);
  });
}

function construirRutherfordBohr(group, Z) {
  const raioNucleo = Math.max(10, 8 + Math.log(Z + 1) * 1.5);
  const nucleo = new THREE.Mesh(
    new THREE.SphereGeometry(raioNucleo, 32, 32),
    new THREE.MeshPhongMaterial({
      color: 0xe53935,
      emissive: 0xaa1111,
      emissiveIntensity: 0.2,
      specular: 0xffffff,
      shininess: 60
    })
  );
  group.add(nucleo);

  const geoEletron = new THREE.SphereGeometry(3.2, 24, 24);
  const matEletron = new THREE.MeshPhongMaterial({
    color: 0x44ccff,
    emissive: 0x1188cc,
    emissiveIntensity: 0.3,
    specular: 0xffffff,
    shininess: 80
  });

  const camadas = electronsPorCamadaBohr(Z);
  camadas.forEach((numEletrons, indice) => {
    const raioOrbita = 32 + (indice + 1) * 38;
    const plano = indice % 3;
    const anel = criarAnelOrbita(raioOrbita, plano);
    group.add(anel);

    for (let i = 0; i < numEletrons; i++) {
      const anguloInicial = (i / numEletrons) * Math.PI * 2;
      const e = new THREE.Mesh(geoEletron, matEletron.clone());
      const [x, y, z] = posicaoEletronBohr(raioOrbita, anguloInicial, plano);
      e.position.set(x, y, z);
      e.userData = {
        bohr: true,
        raio: raioOrbita,
        angulo: anguloInicial,
        velocidade: 0.018 / (indice + 1),
        plano
      };
      group.add(e);
    }
  });
}

function construirModelo(group, tipo, Z, corHex) {
  limparGrupo(group);
  if (tipo === 'dalton') construirDalton(group, Z, corHex);
  else if (tipo === 'thomson') construirThomson(group, Z);
  else if (tipo === 'rutherford-bohr') construirRutherfordBohr(group, Z);
}

function distanciaPinça(pointersMap) {
  if (pointersMap.size < 2) return 0;
  const pts = [...pointersMap.values()];
  return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
}

function animarParticulas(group, tempo) {
  group.traverse((child) => {
    if (!child.userData) return;
    if (child.userData.thomson) {
      const { baseX, baseY, baseZ, fase } = child.userData;
      const amp = 2.5;
      child.position.set(
        baseX + Math.sin(tempo * 1.8 + fase) * amp,
        baseY + Math.cos(tempo * 1.5 + fase) * amp,
        baseZ + Math.sin(tempo * 1.3 + fase * 0.5) * amp
      );
    }
    if (child.userData.bohr) {
      const { raio, velocidade, plano } = child.userData;
      child.userData.angulo += velocidade;
      const [x, y, z] = posicaoEletronBohr(raio, child.userData.angulo, plano);
      child.position.set(x, y, z);
    }
  });
}

export default function AtomModeloHistorico({
  tipo,
  numeroAtomico,
  corElemento = '#4caf50',
  rotacaoAutomatica = false,
  mostrarCoordenadas = true,
  fundoTransparente = false,
  zoomCamera,
  onZoomChange
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelGroupRef = useRef(null);
  const coordenadasGroupRef = useRef(null);
  const animationIdRef = useRef(null);
  const mouseRef = useRef({ isDown: false, x: 0, y: 0, rotX: 0, rotY: 0 });
  const rotacaoAutomaticaRef = useRef(rotacaoAutomatica);
  const onZoomChangeRef = useRef(onZoomChange);
  const tempoRef = useRef(0);

  rotacaoAutomaticaRef.current = rotacaoAutomatica;
  onZoomChangeRef.current = onZoomChange;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(FUNDO_3D);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, CAMERA_Z_INICIAL);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(FUNDO_3D, 1);
    renderer.domElement.style.touchAction = 'none';
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const luzes = configurarIluminacaoSimples(scene);
    atualizarLuzPeloPointer(luzes, {}, renderer.domElement, camera);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    const Z = Math.max(1, Math.min(118, numeroAtomico || 6));
    construirModelo(modelGroup, tipo, Z, corElemento);

    const coordenadasGroup = criarGrupoCoordenadas();
    coordenadasGroup.visible = mostrarCoordenadas;
    modelGroup.add(coordenadasGroup);
    coordenadasGroupRef.current = coordenadasGroup;

    const mouse = mouseRef.current;
    const pointers = new Map();
    let lastPinchDistance = 0;

    const notificarZoom = () => onZoomChangeRef.current?.(camera.position.z);

    const aplicarLimiteZoom = () => {
      camera.position.z = Math.max(CAMERA_Z_MIN, Math.min(CAMERA_Z_MAX, camera.position.z));
      notificarZoom();
    };

    const handlePointerDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        mouse.isDown = false;
        lastPinchDistance = distanciaPinça(pointers);
        return;
      }
      mouse.isDown = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.rotX = modelGroup.rotation.x;
      mouse.rotY = modelGroup.rotation.y;
    };

    const handlePointerUp = (e) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) lastPinchDistance = 0;
      if (pointers.size === 0) mouse.isDown = false;
    };

    const handlePointerMove = (e) => {
      atualizarLuzPeloPointer(luzes, e, renderer.domElement, camera);

      if (pointers.has(e.pointerId)) {
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      }
      if (pointers.size === 2) {
        e.preventDefault();
        const dist = distanciaPinça(pointers);
        if (lastPinchDistance > 0 && dist > 0) {
          camera.position.z /= dist / lastPinchDistance;
          aplicarLimiteZoom();
        }
        lastPinchDistance = dist;
        return;
      }
      if (!mouse.isDown) return;
      const deltaX = e.clientX - mouse.x;
      const deltaY = e.clientY - mouse.y;
      mouse.rotY += deltaX * 0.005;
      mouse.rotX += deltaY * 0.005;
      modelGroup.rotation.y = mouse.rotY;
      modelGroup.rotation.x = mouse.rotX;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const step = e.ctrlKey ? 0.06 : 0.1;
      camera.position.z += (e.deltaY > 0 ? 1 : -1) * step * camera.position.z * 0.1;
      aplicarLimiteZoom();
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);
    renderer.domElement.addEventListener('pointercancel', handlePointerUp);
    renderer.domElement.addEventListener('pointermove', handlePointerMove, { passive: false });
    renderer.domElement.addEventListener('wheel', handleWheel, { passive: false });

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      tempoRef.current += 0.016;
      if (modelGroup) {
        if (rotacaoAutomaticaRef.current) {
          modelGroup.rotation.y += ROTACAO_VELOCIDADE;
        }
        animarParticulas(modelGroup, tempoRef.current);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      renderer.domElement.removeEventListener('pointercancel', handlePointerUp);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      limparGrupo(modelGroup);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [tipo]);

  useEffect(() => {
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    if (!scene || !renderer) return;
    if (fundoTransparente) {
      scene.background = null;
      renderer.setClearColor(0x000000, 0);
    } else {
      scene.background = new THREE.Color(FUNDO_3D);
      renderer.setClearColor(FUNDO_3D, 1);
    }
  }, [fundoTransparente]);

  useEffect(() => {
    const group = coordenadasGroupRef.current;
    if (group) group.visible = mostrarCoordenadas;
  }, [mostrarCoordenadas]);

  useEffect(() => {
    const group = modelGroupRef.current;
    if (!group) return;
    const Z = Math.max(1, Math.min(118, numeroAtomico || 6));
    construirModelo(group, tipo, Z, corElemento);
  }, [numeroAtomico, corElemento, tipo]);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera || zoomCamera == null) return;
    const z = Math.max(CAMERA_Z_MIN, Math.min(CAMERA_Z_MAX, zoomCamera));
    if (Math.abs(camera.position.z - z) > 0.5) {
      camera.position.z = z;
    }
  }, [zoomCamera]);

  return <div ref={containerRef} className="atom3d-container" />;
}
