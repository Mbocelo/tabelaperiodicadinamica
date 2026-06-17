import * as THREE from 'three';

const DIST_LUZ_PRINCIPAL = 420;

/**
 * Iluminação com luz principal/contorno/preenchimento actualizáveis pelo ponteiro.
 * @returns {object} Referências às luzes direccionais móveis
 */
export function configurarIluminacaoInterativa(scene, { comLuzNucleo = false, intensidadePrincipal = 1.4 } = {}) {
  scene.add(new THREE.HemisphereLight(0xc8daf0, 0x12151c, 0.42));
  scene.add(new THREE.AmbientLight(0x353545, 0.16));

  const luzPrincipal = new THREE.DirectionalLight(0xfff8f0, intensidadePrincipal);
  luzPrincipal.position.set(150, 220, 170);
  scene.add(luzPrincipal);

  const luzPreenchimento = new THREE.DirectionalLight(0x8aa0c8, 0.55);
  luzPreenchimento.position.set(-170, 70, -130);
  scene.add(luzPreenchimento);

  const luzContorno = new THREE.DirectionalLight(0xb0c8ff, 0.8);
  luzContorno.position.set(-110, 90, -240);
  scene.add(luzContorno);

  const luzInferior = new THREE.DirectionalLight(0x4a5568, 0.28);
  luzInferior.position.set(40, -220, 100);
  scene.add(luzInferior);

  let luzNucleo = null;
  if (comLuzNucleo) {
    luzNucleo = new THREE.PointLight(0xff5577, 1.0, 520, 1.4);
    luzNucleo.position.set(0, 0, 0);
    scene.add(luzNucleo);
  }

  return { luzPrincipal, luzPreenchimento, luzContorno, luzInferior, luzNucleo };
}

/** Versão reduzida para modelos históricos (Dalton, Thomson, Bohr) */
export function configurarIluminacaoSimples(scene) {
  scene.add(new THREE.HemisphereLight(0xc8daf0, 0x12151c, 0.45));
  scene.add(new THREE.AmbientLight(0x404050, 0.22));

  const luzPrincipal = new THREE.DirectionalLight(0xfff8f0, 1.2);
  luzPrincipal.position.set(140, 200, 160);
  scene.add(luzPrincipal);

  const luzPreenchimento = new THREE.DirectionalLight(0x8aa0c8, 0.5);
  luzPreenchimento.position.set(-160, 60, -120);
  scene.add(luzPreenchimento);

  const luzContorno = new THREE.DirectionalLight(0xb0c8ff, 0.45);
  luzContorno.position.set(-100, 80, -200);
  scene.add(luzContorno);

  return {
    luzPrincipal,
    luzPreenchimento,
    luzContorno,
    luzInferior: null,
    luzNucleo: null
  };
}

const _dir = new THREE.Vector3();
const _rim = new THREE.Vector3();
const _fill = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
const _side = new THREE.Vector3();

/**
 * Posiciona as luzes principais conforme a posição do rato/dedo no canvas.
 */
export function atualizarLuzPeloPointer(luzes, pointer, canvas, camera) {
  if (!luzes?.luzPrincipal || !canvas || !camera) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;

  const clientX = pointer.clientX ?? rect.left + rect.width / 2;
  const clientY = pointer.clientY ?? rect.top + rect.height / 2;

  const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
  const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;

  _dir.set(ndcX, ndcY, 0.35).unproject(camera).sub(camera.position).normalize();

  luzes.luzPrincipal.position.copy(_dir).multiplyScalar(DIST_LUZ_PRINCIPAL);

  if (luzes.luzContorno) {
    _rim.copy(_dir).multiplyScalar(-DIST_LUZ_PRINCIPAL * 0.72);
    _rim.y += 70;
    luzes.luzContorno.position.copy(_rim);
  }

  if (luzes.luzPreenchimento) {
    _side.crossVectors(_dir, _up);
    if (_side.lengthSq() < 1e-6) _side.set(1, 0, 0);
    _side.normalize();
    _fill.copy(_side).multiplyScalar(DIST_LUZ_PRINCIPAL * 0.5);
    _fill.y -= 50;
    luzes.luzPreenchimento.position.copy(_fill);
  }
}
