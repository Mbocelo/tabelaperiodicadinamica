import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { COORDINATES_GROUP_NAME, criarGrupoCoordenadas } from './coordenadas3D';
import { configurarIluminacaoCena } from './iluminacao3D';
import { criarGrupoNucleoDetalhado, animarNucleons } from './nucleo3DShared';

const FUNDO_3D = 0x263238;
const ROTACAO_AUTOMATICA_VELOCIDADE = 0.005;
/** Escala do núcleo na vista dedicada (permite zoom extra nos núcleons) */
const ESCALA_NUCLEO_VISTA = 3.5;

export const CAMERA_NUCLEO_Z_INICIAL = 52;
export const CAMERA_NUCLEO_Z_MIN = 6;
export const CAMERA_NUCLEO_Z_MAX = 100;

export function cameraNucleoZParaSlider(z) {
  return ((CAMERA_NUCLEO_Z_MAX - z) / (CAMERA_NUCLEO_Z_MAX - CAMERA_NUCLEO_Z_MIN)) * 100;
}

export function sliderParaCameraNucleoZ(valorSlider) {
  return CAMERA_NUCLEO_Z_MAX - (valorSlider / 100) * (CAMERA_NUCLEO_Z_MAX - CAMERA_NUCLEO_Z_MIN);
}

function distanciaPinça(pointersMap) {
  if (pointersMap.size < 2) return 0;
  const pts = [...pointersMap.values()];
  return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
}

export default function Nucleo3D({
  numeroAtomico,
  neutroes,
  mostrarCoordenadas = true,
  rotacaoAutomatica = false,
  zoomCamera,
  onZoomChange,
  /** Ao afastar o zoom ao máximo, voltar à vista do átomo */
  onZoomLimiteAtomo
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const nucleoGroupRef = useRef(null);
  const coordenadasGroupRef = useRef(null);
  const animationIdRef = useRef(null);
  const mouseRef = useRef({ isDown: false, x: 0, y: 0, rotX: 0, rotY: 0 });
  const rotacaoAutomaticaRef = useRef(rotacaoAutomatica);
  const onZoomChangeRef = useRef(onZoomChange);
  const onZoomLimiteAtomoRef = useRef(onZoomLimiteAtomo);

  rotacaoAutomaticaRef.current = rotacaoAutomatica;
  onZoomChangeRef.current = onZoomChange;
  onZoomLimiteAtomoRef.current = onZoomLimiteAtomo;

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
      500
    );
    camera.position.set(0, 0, CAMERA_NUCLEO_Z_INICIAL);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setClearColor(FUNDO_3D, 1);
    renderer.domElement.style.touchAction = 'none';
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    configurarIluminacaoCena(scene, { comLuzNucleo: true });

    const nucleoGroup = new THREE.Group();
    const num = Math.max(1, Math.min(118, numeroAtomico || 1));
    nucleoGroup.add(criarGrupoNucleoDetalhado(num, neutroes, ESCALA_NUCLEO_VISTA));
    scene.add(nucleoGroup);
    nucleoGroupRef.current = nucleoGroup;

    const coordenadasGroup = criarGrupoCoordenadas();
    coordenadasGroup.scale.setScalar(0.35);
    coordenadasGroup.visible = mostrarCoordenadas;
    nucleoGroup.add(coordenadasGroup);
    coordenadasGroupRef.current = coordenadasGroup;

    const mouse = mouseRef.current;
    const pointers = new Map();
    let lastPinchDistance = 0;

    const notificarZoom = () => onZoomChangeRef.current?.(camera.position.z);

    const aplicarLimiteZoom = (tentativaAfastar = false) => {
      const zAntes = camera.position.z;
      camera.position.z = Math.max(CAMERA_NUCLEO_Z_MIN, Math.min(CAMERA_NUCLEO_Z_MAX, camera.position.z));
      if (
        tentativaAfastar
        && zAntes >= CAMERA_NUCLEO_Z_MAX - 0.5
        && camera.position.z >= CAMERA_NUCLEO_Z_MAX - 0.5
      ) {
        onZoomLimiteAtomoRef.current?.();
      }
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
      mouse.rotX = nucleoGroup.rotation.x;
      mouse.rotY = nucleoGroup.rotation.y;
    };

    const handlePointerUp = (e) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) lastPinchDistance = 0;
      if (pointers.size === 0) mouse.isDown = false;
    };

    const handlePointerMove = (e) => {
      if (pointers.has(e.pointerId)) {
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      }
      if (pointers.size === 2) {
        e.preventDefault();
        const dist = distanciaPinça(pointers);
        if (lastPinchDistance > 0 && dist > 0) {
          const factor = dist / lastPinchDistance;
          camera.position.z /= factor;
          aplicarLimiteZoom(factor < 1);
        }
        lastPinchDistance = dist;
        return;
      }
      if (!mouse.isDown) return;
      const deltaX = e.clientX - mouse.x;
      const deltaY = e.clientY - mouse.y;
      mouse.rotY += deltaX * 0.005;
      mouse.rotX += deltaY * 0.005;
      nucleoGroup.rotation.y = mouse.rotY;
      nucleoGroup.rotation.x = mouse.rotX;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const afastar = e.deltaY > 0;
      const step = e.ctrlKey ? 0.06 : 0.1;
      camera.position.z += (afastar ? 1 : -1) * step * camera.position.z * 0.1;
      aplicarLimiteZoom(afastar);
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
      if (nucleoGroup) {
        if (rotacaoAutomaticaRef.current) {
          nucleoGroup.rotation.y += ROTACAO_AUTOMATICA_VELOCIDADE;
        }
        const detalhado = nucleoGroup.children.find((c) => c.userData?.isNucleusDetailed);
        animarNucleons(detalhado);
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
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const nucleoGroup = nucleoGroupRef.current;
    if (!nucleoGroup) return;
    const detalhado = nucleoGroup.children.find((c) => c.userData?.isNucleusDetailed);
    if (detalhado) nucleoGroup.remove(detalhado);
    const num = Math.max(1, Math.min(118, numeroAtomico || 1));
    const novo = criarGrupoNucleoDetalhado(num, neutroes, ESCALA_NUCLEO_VISTA);
    nucleoGroup.add(novo);
    const coords = nucleoGroup.children.find((c) => c.name === COORDINATES_GROUP_NAME);
    if (coords) nucleoGroup.remove(coords);
    const coordenadasGroup = criarGrupoCoordenadas();
    coordenadasGroup.scale.setScalar(0.35);
    coordenadasGroup.visible = mostrarCoordenadas;
    nucleoGroup.add(coordenadasGroup);
    coordenadasGroupRef.current = coordenadasGroup;
  }, [numeroAtomico, neutroes]);

  useEffect(() => {
    const group = coordenadasGroupRef.current;
    if (group) group.visible = mostrarCoordenadas;
  }, [mostrarCoordenadas]);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera || zoomCamera == null) return;
    const z = Math.max(CAMERA_NUCLEO_Z_MIN, Math.min(CAMERA_NUCLEO_Z_MAX, zoomCamera));
    if (Math.abs(camera.position.z - z) > 0.5) {
      camera.position.z = z;
    }
  }, [zoomCamera]);

  return <div ref={containerRef} className="atom3d-container" aria-label="Vista ampliada do núcleo" />;
}
