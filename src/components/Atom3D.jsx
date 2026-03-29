import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  obterConfiguracaoEletronica,
  AUFBAU_ORDER,
  SUBLEVEL_COLORS
} from '../data/elementosQuimicos';

const ZOOM_THRESHOLD_NUCLEUS = 220;

function criarFormaOrbital(tipo, radius, cor) {
  const group = new THREE.Group();
  const material = new THREE.MeshPhongMaterial({
    color: cor,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide
  });
  const r = radius * 0.35;

  if (tipo === 's') {
    const geo = new THREE.SphereGeometry(radius, 32, 32);
    group.add(new THREE.Mesh(geo, material));
  } else if (tipo === 'p') {
    const dist = radius * 0.55;
    const lobeGeo = new THREE.SphereGeometry(r, 16, 16);
    const eixos = [
      [[dist, 0, 0], [-dist, 0, 0]],
      [[0, dist, 0], [0, -dist, 0]],
      [[0, 0, dist], [0, 0, -dist]]
    ];
    for (const par of eixos) {
      for (const pos of par) {
        const m = new THREE.Mesh(lobeGeo, material.clone());
        m.position.set(pos[0], pos[1], pos[2]);
        group.add(m);
      }
    }
  } else if (tipo === 'd') {
    const dist = radius * 0.45;
    const lobeGeo = new THREE.SphereGeometry(r * 0.65, 12, 12);
    const dz2 = [[0, 0, dist], [0, 0, -dist]];
    for (const pos of dz2) {
      const m = new THREE.Mesh(lobeGeo, material.clone());
      m.position.set(pos[0], pos[1], pos[2]);
      group.add(m);
    }
    const dx2y2 = [[dist, 0, 0], [-dist, 0, 0], [0, dist, 0], [0, -dist, 0]];
    for (const pos of dx2y2) {
      const m = new THREE.Mesh(lobeGeo, material.clone());
      m.position.set(pos[0], pos[1], pos[2]);
      group.add(m);
    }
    const a = dist * 0.7;
    const quadLobes = [
      [[a, a, 0], [-a, -a, 0], [a, -a, 0], [-a, a, 0]],
      [[a, 0, a], [-a, 0, -a], [a, 0, -a], [-a, 0, a]],
      [[0, a, a], [0, -a, -a], [0, a, -a], [0, -a, a]]
    ];
    for (const quartet of quadLobes) {
      for (const pos of quartet) {
        const m = new THREE.Mesh(lobeGeo, material.clone());
        m.position.set(pos[0], pos[1], pos[2]);
        group.add(m);
      }
    }
  } else {
    const dist = radius * 0.55;
    const lobeGeo = new THREE.SphereGeometry(r * 0.8, 12, 12);
    const sinais = [1, -1];
    let count = 0;
    for (const sx of sinais) {
      for (const sy of sinais) {
        for (const sz of sinais) {
          if (count++ >= 8) break;
          const m = new THREE.Mesh(lobeGeo, material.clone());
          m.position.set(sx * dist, sy * dist, sz * dist);
          group.add(m);
        }
      }
    }
  }
  return group;
}

function obterPosicoesSubnivel(tipo, qtd, radius) {
  const pos = [];
  const r = radius * 0.98;

  if (tipo === 's') {
    const dirs = [[0, 0, 1], [0, 0, -1]];
    for (let i = 0; i < qtd; i++) {
      const d = dirs[i % 2];
      pos.push([d[0] * r, d[1] * r, d[2] * r]);
    }
  } else if (tipo === 'p') {
    const eixos = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    for (let i = 0; i < qtd; i++) {
      const eixo = eixos[Math.floor(i / 2) % 3];
      const sinal = i % 2 === 0 ? 1 : -1;
      pos.push([eixo[0] * r * sinal, eixo[1] * r * sinal, eixo[2] * r * sinal]);
    }
  } else if (tipo === 'd') {
    const orientacoes = [
      [1, 1, 0], [-1, -1, 0], [1, -1, 0], [-1, 1, 0],
      [1, 0, 1], [-1, 0, -1], [0, 1, 1], [0, -1, -1],
      [0, 0, 1], [0, 0, -1]
    ];
    for (let i = 0; i < qtd; i++) {
      const o = orientacoes[i];
      const norm = Math.sqrt(o[0] ** 2 + o[1] ** 2 + o[2] ** 2) || 1;
      pos.push([o[0] * r / norm, o[1] * r / norm, o[2] * r / norm]);
    }
  } else {
    for (let i = 0; i < qtd; i++) {
      const theta = (2 * Math.PI * i) / Math.max(qtd, 1);
      const phi = Math.acos(2 * (i / Math.max(qtd, 1)) - 1 + 0.01) - Math.PI / 2;
      pos.push([
        r * Math.cos(phi) * Math.cos(theta),
        r * Math.cos(phi) * Math.sin(theta),
        r * Math.sin(phi)
      ]);
    }
  }
  return pos;
}

function distribuirNucleons(total, radius) {
  const pos = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < total; i++) {
    const y = 1 - (i / Math.max(total - 1, 1)) * 2;
    const rAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    const x = Math.cos(theta) * rAtY;
    const z = Math.sin(theta) * rAtY;
    const r = radius * 0.85 * Math.cbrt((i + 0.5) / total);
    pos.push([x * r, y * r, z * r]);
  }
  return pos;
}

export default function Atom3D({
  numeroAtomico,
  neutroes,
  mostrarEletrons = true,
  forcarNucleoDetalhado = false,
  subniveisVisiveis = { s: true, p: true, d: true, f: true },
  /** Fundo transparente para sobrepor o vídeo da câmera (modo RA em celular) */
  fundoTransparente = false
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const luzAmbienteArRef = useRef(null);
  const atomGroupRef = useRef(null);
  const nucleusSimpleRef = useRef(null);
  const nucleusDetailedRef = useRef(null);
  const animationIdRef = useRef(null);
  const electronAnimationIdRef = useRef(null);
  const mouseRef = useRef({ isDown: false, x: 0, y: 0, rotX: 0, rotY: 0 });
  const forcarNucleoRef = useRef(forcarNucleoDetalhado);

  forcarNucleoRef.current = forcarNucleoDetalhado;

  const desenharAtomo = (scene, atomGroup, num, nNeutroes) => {
    if (!atomGroup || !scene) return;

    while (atomGroup.children.length > 0) {
      atomGroup.remove(atomGroup.children[0]);
    }

    const numNeutroes = nNeutroes ?? (num === 1 ? 0 : Math.round(num * (num <= 20 ? 1.0 : 1.15)));
    const totalNucleons = num + numNeutroes;

    const nucleusGroup = new THREE.Group();
    nucleusGroup.userData = { isNucleus: true };

    const nucleusGeometry = new THREE.SphereGeometry(15, 32, 32);
    const nucleusMaterial = new THREE.MeshPhongMaterial({
      color: 0x9ca3af,
      transparent: true,
      opacity: 0.92
    });
    const nucleusSimple = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    nucleusSimple.userData = { isNucleusSimple: true };
    nucleusGroup.add(nucleusSimple);
    nucleusSimpleRef.current = nucleusSimple;

    const nucleonRadius = Math.max(1.0, 3.5 - Math.log(totalNucleons + 1) * 0.5);
    const nucleusRadius = 12;
    const particleGeo = new THREE.SphereGeometry(nucleonRadius, 20, 20);
    const protonMat = new THREE.MeshPhongMaterial({
      color: 0xe11d48,
      emissive: 0xbe123c,
      emissiveIntensity: 0.15,
      specular: 0xffffff,
      shininess: 30
    });
    const neutronMat = new THREE.MeshPhongMaterial({
      color: 0x94a3b8,
      emissive: 0x64748b,
      emissiveIntensity: 0.05,
      specular: 0xffffff,
      shininess: 20
    });

    const posicoes = distribuirNucleons(totalNucleons, nucleusRadius);
    const maxSpeed = 0.15;
    const nucleusLimit = nucleusRadius * 0.8;

    const nucleusDetailed = new THREE.Group();
    nucleusDetailed.userData = { isNucleusDetailed: true };
    nucleusDetailed.visible = false;

    for (let i = 0; i < num; i++) {
      const p = new THREE.Mesh(particleGeo, protonMat.clone());
      p.position.set(posicoes[i][0], posicoes[i][1], posicoes[i][2]);
      p.userData = {
        tipo: 'proton',
        vx: (Math.random() - 0.5) * maxSpeed,
        vy: (Math.random() - 0.5) * maxSpeed,
        vz: (Math.random() - 0.5) * maxSpeed,
        limit: nucleusLimit
      };
      nucleusDetailed.add(p);
    }
    for (let i = num; i < totalNucleons; i++) {
      const n = new THREE.Mesh(particleGeo, neutronMat.clone());
      n.position.set(posicoes[i][0], posicoes[i][1], posicoes[i][2]);
      n.userData = {
        tipo: 'neutron',
        vx: (Math.random() - 0.5) * maxSpeed,
        vy: (Math.random() - 0.5) * maxSpeed,
        vz: (Math.random() - 0.5) * maxSpeed,
        limit: nucleusLimit
      };
      nucleusDetailed.add(n);
    }
    nucleusGroup.add(nucleusDetailed);
    nucleusDetailedRef.current = nucleusDetailed;
    atomGroup.add(nucleusGroup);

    const config = obterConfiguracaoEletronica(num);
    const electronGeometry = new THREE.SphereGeometry(3, 16, 16);
    let sublevelIndex = 0;

    for (const sub of AUFBAU_ORDER) {
      const qtd = config[sub] || 0;
      if (qtd <= 0) continue;

      const n = parseInt(sub.charAt(0), 10);
      const tipo = sub.charAt(sub.length - 1);
      const cor = SUBLEVEL_COLORS[tipo];
      const baseRadius = 35 + n * 28 + { s: 0, p: 3, d: 6, f: 9 }[tipo];

      const shell = criarFormaOrbital(tipo, baseRadius, cor);
      shell.userData = { isSublevelShell: true, tipo };
      shell.visible = subniveisVisiveis[tipo] !== false;
      atomGroup.add(shell);

      const posicoesElectron = obterPosicoesSubnivel(tipo, qtd, baseRadius);

      for (let e = 0; e < posicoesElectron.length; e++) {
        const [x, y, z] = posicoesElectron[e];
        const electronMaterial = new THREE.MeshPhongMaterial({
          color: cor,
          emissive: cor,
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 1.0
        });
        const electron = new THREE.Mesh(electronGeometry, electronMaterial);
        electron.position.set(x, y, z);
        const r = Math.sqrt(x * x + y * y + z * z);
        const angle1 = Math.atan2(y, x);
        const angle2 = Math.asin(Math.max(-1, Math.min(1, z / r)));
        electron.visible = mostrarEletrons;
        electron.userData = {
          isElectron: true,
          radius: r,
          angle1,
          angle2,
          speed: 0.008 + sublevelIndex * 0.003,
          rotationSpeed: 0.02,
          targetAngle1: angle1,
          targetAngle2: angle2,
          startAngle1: undefined,
          startAngle2: undefined,
          transitionProgress: 1.0,
          transitionDuration: 1000,
          transitionCounter: 1000,
          shellIndex: sublevelIndex,
          electronIndex: e,
          sublevel: sub
        };
        atomGroup.add(electron);
      }
      sublevelIndex++;
    }
  };

  const atualizarVisibilidadeNucleo = () => {
    const nucleusSimple = nucleusSimpleRef.current;
    const nucleusDetailed = nucleusDetailedRef.current;
    const camera = cameraRef.current;
    if (!nucleusSimple || !nucleusDetailed || !camera) return;
    const dist = camera.position.z;
    const mostrarDetalhado = forcarNucleoRef.current || dist < ZOOM_THRESHOLD_NUCLEUS;
    nucleusSimple.visible = !mostrarDetalhado;
    nucleusDetailed.visible = mostrarDetalhado;
  };

  const animarNucleons = () => {
    const nucleusDetailed = nucleusDetailedRef.current;
    if (!nucleusDetailed || !nucleusDetailed.visible) return;
    const perturbacao = 0.02;
    nucleusDetailed.children.forEach((nucleon) => {
      const ud = nucleon.userData;
      if (ud.vx === undefined) return;
      nucleon.position.x += ud.vx;
      nucleon.position.y += ud.vy;
      nucleon.position.z += ud.vz;
      ud.vx += (Math.random() - 0.5) * perturbacao;
      ud.vy += (Math.random() - 0.5) * perturbacao;
      ud.vz += (Math.random() - 0.5) * perturbacao;
      const limit = ud.limit || 9.6;
      const r = Math.sqrt(nucleon.position.x ** 2 + nucleon.position.y ** 2 + nucleon.position.z ** 2);
      if (r > limit && r > 0.001) {
        const scale = limit / r;
        nucleon.position.multiplyScalar(scale);
        const dot = nucleon.position.x * ud.vx + nucleon.position.y * ud.vy + nucleon.position.z * ud.vz;
        if (dot > 0) {
          ud.vx -= (nucleon.position.x * dot) / (r * r) * 0.5;
          ud.vy -= (nucleon.position.y * dot) / (r * r) * 0.5;
          ud.vz -= (nucleon.position.z * dot) / (r * r) * 0.5;
        }
      }
      const maxV = 0.2;
      ud.vx = Math.max(-maxV, Math.min(maxV, ud.vx));
      ud.vy = Math.max(-maxV, Math.min(maxV, ud.vy));
      ud.vz = Math.max(-maxV, Math.min(maxV, ud.vz));
    });
  };

  const atualizarVisibilidadeEletrons = () => {
    const atomGroup = atomGroupRef.current;
    if (!atomGroup) return;
    atomGroup.children.forEach((child) => {
      if (child.userData?.isElectron) {
        child.visible = mostrarEletrons;
      }
    });
  };

  const atualizarVisibilidadeSubniveis = () => {
    const atomGroup = atomGroupRef.current;
    if (!atomGroup) return;
    atomGroup.children.forEach((child) => {
      if (child.userData?.isSublevelShell && child.userData.tipo) {
        child.visible = subniveisVisiveis[child.userData.tipo] !== false;
      }
    });
  };

  const animateElectrons = (group) => {
    if (!group) return;
    group.children.forEach((child) => {
      if (child.userData?.isElectron) {
        const data = child.userData;
        const material = child.material;
        data.transitionCounter++;
        if (data.transitionCounter < data.transitionDuration) {
          const t = data.transitionCounter / data.transitionDuration;
          if (t < 0.5) {
            const fadeOutProgress = t * 2;
            data.transitionProgress = 1.0 - fadeOutProgress;
            if (fadeOutProgress < 0.1 && data.startAngle1 === undefined) {
              data.startAngle1 = data.angle1;
              data.startAngle2 = data.angle2;
              data.targetAngle1 = data.angle1 + (Math.random() - 0.5) * Math.PI * 1.5;
              data.targetAngle2 = data.angle2 + (Math.random() - 0.5) * Math.PI * 0.5;
            }
            data.angle1 += data.speed * 0.5;
            data.angle2 += data.rotationSpeed * 0.05;
            child.position.set(
              data.radius * Math.cos(data.angle2) * Math.cos(data.angle1),
              data.radius * Math.cos(data.angle2) * Math.sin(data.angle1),
              data.radius * Math.sin(data.angle2)
            );
          } else {
            const fadeInProgress = (t - 0.5) * 2;
            data.transitionProgress = fadeInProgress;
            const lerpFactor = fadeInProgress * fadeInProgress;
            const startAngle1 = data.startAngle1 ?? data.angle1;
            const startAngle2 = data.startAngle2 ?? data.angle2;
            const currentAngle1 = startAngle1 + (data.targetAngle1 - startAngle1) * lerpFactor;
            const currentAngle2 = startAngle2 + (data.targetAngle2 - startAngle2) * lerpFactor;
            child.position.set(
              data.radius * Math.cos(currentAngle2) * Math.cos(currentAngle1),
              data.radius * Math.cos(currentAngle2) * Math.sin(currentAngle1),
              data.radius * Math.sin(currentAngle2)
            );
            if (fadeInProgress >= 0.99) {
              data.angle1 = data.targetAngle1;
              data.angle2 = data.targetAngle2;
              data.startAngle1 = undefined;
              data.startAngle2 = undefined;
            }
          }
          material.opacity = data.transitionProgress;
        } else {
          if (Math.random() < 0.02) {
            data.transitionCounter = 0;
            data.transitionDuration = 80 + Math.random() * 60;
            data.startAngle1 = undefined;
            data.startAngle2 = undefined;
          }
          data.angle1 += data.speed;
          data.angle2 += data.rotationSpeed * 0.1;
          child.position.set(
            data.radius * Math.cos(data.angle2) * Math.cos(data.angle1),
            data.radius * Math.cos(data.angle2) * Math.sin(data.angle1),
            data.radius * Math.sin(data.angle2)
          );
          material.opacity = 1.0;
        }
      }
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 300);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    renderer.domElement.style.touchAction = 'none';
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const atomGroup = new THREE.Group();
    scene.add(atomGroup);
    atomGroupRef.current = atomGroup;

    const num = Math.max(1, Math.min(118, numeroAtomico || 6));
    desenharAtomo(scene, atomGroup, num, neutroes);

    const mouse = mouseRef.current;
    const handlePointerDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      mouse.isDown = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (atomGroup) {
        mouse.rotX = atomGroup.rotation.x;
        mouse.rotY = atomGroup.rotation.y;
      }
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (_) {
        /* ignore */
      }
    };
    const handlePointerUp = () => {
      mouse.isDown = false;
    };
    const handlePointerMove = (e) => {
      if (!mouse.isDown || !atomGroup) return;
      const deltaX = e.clientX - mouse.x;
      const deltaY = e.clientY - mouse.y;
      mouse.rotY += deltaX * 0.005;
      mouse.rotX += deltaY * 0.005;
      atomGroup.rotation.y = mouse.rotY;
      atomGroup.rotation.x = mouse.rotX;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleWheel = (e) => {
      e.preventDefault();
      const zoomDirection = e.deltaY > 0 ? 1 : -1;
      camera.position.z += zoomDirection * 0.1 * camera.position.z * 0.1;
      camera.position.z = Math.max(60, Math.min(1000, camera.position.z));
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);
    renderer.domElement.addEventListener('pointercancel', handlePointerUp);
    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('wheel', handleWheel, { passive: false });

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      if (atomGroup) {
        atomGroup.rotation.y += 0.005;
        atualizarVisibilidadeNucleo();
        animarNucleons();
      }
      renderer.render(scene, camera);
    };
    animate();

    const electronLoop = () => {
      electronAnimationIdRef.current = requestAnimationFrame(electronLoop);
      animateElectrons(atomGroup);
    };
    electronLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      renderer.domElement.removeEventListener('pointercancel', handlePointerUp);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (electronAnimationIdRef.current) cancelAnimationFrame(electronAnimationIdRef.current);
      const sceneEnd = sceneRef.current;
      if (sceneEnd && luzAmbienteArRef.current) {
        sceneEnd.remove(luzAmbienteArRef.current);
        luzAmbienteArRef.current = null;
      }
      renderer.dispose();
      rendererRef.current = null;
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    if (!scene || !renderer) return;

    if (fundoTransparente) {
      scene.background = null;
      renderer.setClearColor(0x000000, 0);
      /* Neblina exponencial: partes mais distantes escurecem — sensação de profundidade sobre o vídeo */
      scene.fog = new THREE.FogExp2(0x0a0c14, 0.00135);
      if (!luzAmbienteArRef.current) {
        const hemi = new THREE.HemisphereLight(0x9eb4d8, 0x1a1a22, 0.42);
        scene.add(hemi);
        luzAmbienteArRef.current = hemi;
      }
    } else {
      scene.background = new THREE.Color(0x000000);
      renderer.setClearColor(0x000000, 1);
      scene.fog = null;
      if (luzAmbienteArRef.current) {
        scene.remove(luzAmbienteArRef.current);
        luzAmbienteArRef.current = null;
      }
    }
  }, [fundoTransparente]);

  useEffect(() => {
    const atomGroup = atomGroupRef.current;
    const scene = sceneRef.current;
    if (!atomGroup || !scene) return;
    const num = Math.max(1, Math.min(118, numeroAtomico || 6));
    desenharAtomo(scene, atomGroup, num, neutroes);
  }, [numeroAtomico, neutroes]);

  useEffect(() => {
    atualizarVisibilidadeEletrons();
  }, [mostrarEletrons]);

  useEffect(() => {
    atualizarVisibilidadeSubniveis();
  }, [subniveisVisiveis]);

  return <div ref={containerRef} id="canvas-container" className="atom3d-container" />;
}
