import * as THREE from 'three';

let texturaEsferaEletron = null;
let texturaEsferaEletronVersao = 0;
const TEX_ESFERA_ELETRON_V = 4;
const texturasNucleon = {};
const texturasNucleonVersao = { p: 0, n: 0 };
const TEX_NUCLEON_V = { p: 3, n: 1 };

export function texturaTextoEmCache(map) {
  return map === texturaEsferaEletron
    || map === texturasNucleon.p
    || map === texturasNucleon.n;
}

function desenharSimboloProton(ctx, cx, cy) {
  const baseY = cy + 2;
  const corContorno = '#4a0818';

  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';

  ctx.font = '700 52px ui-monospace, Menlo, Consolas, monospace';
  ctx.lineWidth = 5;
  ctx.strokeStyle = corContorno;
  ctx.strokeText('p', cx - 22, baseY);
  ctx.fillStyle = '#fff8e8';
  ctx.fillText('p', cx - 22, baseY);

  ctx.font = '700 30px ui-monospace, Menlo, Consolas, monospace';
  ctx.lineWidth = 3.5;
  ctx.strokeText('+', cx + 8, baseY - 18);
  ctx.fillStyle = '#ffff00';
  ctx.fillText('+', cx + 8, baseY - 18);
}

function obterTexturaNucleon(letra) {
  if (texturasNucleon[letra] && texturasNucleonVersao[letra] === TEX_NUCLEON_V[letra]) {
    return texturasNucleon[letra];
  }
  texturasNucleon[letra]?.dispose();
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const cx = size / 2;
    const cy = size / 2;
    const cores = letra === 'p'
      ? { c0: '#f87171', c1: '#e11d48', c2: '#9f1239' }
      : { c0: '#cbd5e1', c1: '#94a3b8', c2: '#64748b' };
    const grad = ctx.createRadialGradient(cx, cy - 6, 4, cx, cy, size * 0.5);
    grad.addColorStop(0, cores.c0);
    grad.addColorStop(0.55, cores.c1);
    grad.addColorStop(1, cores.c2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    if (letra === 'p') {
      desenharSimboloProton(ctx, cx, cy);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '700 52px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText('n', cx, cy + 2);
    }
  }
  texturasNucleon[letra] = new THREE.CanvasTexture(canvas);
  texturasNucleon[letra].colorSpace = THREE.SRGBColorSpace;
  texturasNucleonVersao[letra] = TEX_NUCLEON_V[letra];
  return texturasNucleon[letra];
}

export function criarMaterialNucleonComLetra(letra) {
  return new THREE.MeshPhongMaterial({
    map: obterTexturaNucleon(letra),
    emissive: letra === 'p' ? 0xaa1111 : 0x475569,
    emissiveIntensity: letra === 'p' ? 0.08 : 0.05,
    specular: 0x666666,
    shininess: 45
  });
}

function desenharSimboloEletron(ctx, cx, cy) {
  const baseY = cy + 2;
  const corSimbolo = '#ffff00';
  const corContorno = '#1a2840';

  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';

  ctx.font = '700 52px ui-monospace, Menlo, Consolas, monospace';
  ctx.lineWidth = 5;
  ctx.strokeStyle = corContorno;
  ctx.strokeText('e', cx - 22, baseY);
  ctx.fillStyle = corSimbolo;
  ctx.fillText('e', cx - 22, baseY);

  ctx.font = '600 30px ui-monospace, Menlo, Consolas, monospace';
  ctx.lineWidth = 3.5;
  ctx.strokeText('−', cx + 6, baseY - 18);
  ctx.fillStyle = '#ffff33';
  ctx.fillText('−', cx + 6, baseY - 18);
}

function obterTexturaEsferaEletron() {
  if (texturaEsferaEletron && texturaEsferaEletronVersao === TEX_ESFERA_ELETRON_V) {
    return texturaEsferaEletron;
  }
  texturaEsferaEletron?.dispose();
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const cx = size / 2;
    const cy = size / 2;
    const grad = ctx.createRadialGradient(cx, cy - 6, 4, cx, cy, size * 0.5);
    grad.addColorStop(0, '#66bbff');
    grad.addColorStop(0.55, '#3399ff');
    grad.addColorStop(1, '#1a5599');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    desenharSimboloEletron(ctx, cx, cy);
  }
  texturaEsferaEletron = new THREE.CanvasTexture(canvas);
  texturaEsferaEletron.colorSpace = THREE.SRGBColorSpace;
  texturaEsferaEletronVersao = TEX_ESFERA_ELETRON_V;
  return texturaEsferaEletron;
}

export function criarMaterialEletronComLetra() {
  return new THREE.MeshPhongMaterial({
    map: obterTexturaEsferaEletron(),
    emissive: 0x1166cc,
    emissiveIntensity: 0.06,
    specular: 0x666666,
    shininess: 45,
    transparent: true,
    opacity: 1
  });
}

/** Orienta a textura radial para ficar legível a partir do centro */
export function orientarMalhaRadial(mesh, x, y, z) {
  if (x || y || z) mesh.lookAt(x * 2, y * 2, z * 2);
}
