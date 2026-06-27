import * as THREE from 'three';

/** Iluminação fixa: uma luz direccional + ambiente suave (um único brilho especular) */
export function configurarIluminacaoCena(scene, { comLuzNucleo = false } = {}) {
  scene.add(new THREE.HemisphereLight(0xc8daf0, 0x12151c, 0.55));
  scene.add(new THREE.AmbientLight(0x404050, 0.28));

  const luzPrincipal = new THREE.DirectionalLight(0xffffff, 1.1);
  luzPrincipal.position.set(120, 180, 140);
  scene.add(luzPrincipal);

  if (comLuzNucleo) {
    const luzNucleo = new THREE.PointLight(0xff5577, 0.55, 520, 1.4);
    luzNucleo.position.set(0, 0, 0);
    scene.add(luzNucleo);
  }
}
