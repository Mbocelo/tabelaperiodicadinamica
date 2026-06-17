import * as THREE from 'three';

export const COORDINATES_GROUP_NAME = 'atom-coordinates';

const AXES_SIZE = 300;
const GRID_SIZE = 620;
const GRID_DIVISIONS = 31;
const GRID_Y = -280;
const AXIS_LABEL_OFFSET = 22;
const AXIS_LABEL_SCALE = 42;
const COR_EIXO_X = 0xff5555;
const COR_EIXO_Y = 0x55ff55;
const COR_EIXO_Z = 0x5599ff;
const COR_GRELHA_PRINCIPAL = 0xffffff;
const COR_GRELHA_SECUNDARIA = 0xcccccc;

function criarLinhaEixo(cor, inicio, fim) {
  const geo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(...inicio),
    new THREE.Vector3(...fim)
  ]);
  const mat = new THREE.LineBasicMaterial({ color: cor, transparent: true, opacity: 0.9 });
  return new THREE.Line(geo, mat);
}

function criarEtiquetaEixo(texto, cor) {
  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = cor;
    ctx.font = 'bold 28px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(texto, size / 2, size / 2);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    depthTest: true,
    toneMapped: false
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(AXIS_LABEL_SCALE, AXIS_LABEL_SCALE, 1);
  sprite.userData = { isAxisLabel: true, labelTexture: tex };
  return sprite;
}

/** Eixos X/Y/Z, grelha e etiquetas +/− — rodam com o grupo pai */
export function criarGrupoCoordenadas() {
  const group = new THREE.Group();
  group.name = COORDINATES_GROUP_NAME;

  const eixosLinhas = [
    { cor: COR_EIXO_X, inicio: [-AXES_SIZE, 0, 0], fim: [AXES_SIZE, 0, 0] },
    { cor: COR_EIXO_Y, inicio: [0, -AXES_SIZE, 0], fim: [0, AXES_SIZE, 0] },
    { cor: COR_EIXO_Z, inicio: [0, 0, -AXES_SIZE], fim: [0, 0, AXES_SIZE] }
  ];
  for (const { cor, inicio, fim } of eixosLinhas) {
    const linha = criarLinhaEixo(cor, inicio, fim);
    linha.renderOrder = 1;
    group.add(linha);
  }

  const grid = new THREE.GridHelper(GRID_SIZE, GRID_DIVISIONS, COR_GRELHA_PRINCIPAL, COR_GRELHA_SECUNDARIA);
  grid.position.y = GRID_Y;
  const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
  gridMaterials.forEach((mat) => {
    mat.transparent = true;
    mat.opacity = 0.4;
  });
  grid.renderOrder = 0;
  group.add(grid);

  const extremo = AXES_SIZE + AXIS_LABEL_OFFSET;
  const etiquetas = [
    { texto: '+X', cor: '#ff5555', pos: [extremo, 0, 0] },
    { texto: '−X', cor: '#ff5555', pos: [-extremo, 0, 0] },
    { texto: '+Y', cor: '#55ff55', pos: [0, extremo, 0] },
    { texto: '−Y', cor: '#55ff55', pos: [0, -extremo, 0] },
    { texto: '+Z', cor: '#5599ff', pos: [0, 0, extremo] },
    { texto: '−Z', cor: '#5599ff', pos: [0, 0, -extremo] }
  ];
  for (const { texto, cor, pos } of etiquetas) {
    const label = criarEtiquetaEixo(texto, cor);
    label.position.set(pos[0], pos[1], pos[2]);
    group.add(label);
  }

  return group;
}
