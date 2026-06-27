import * as THREE from 'three';
import {
  criarMaterialNucleonComLetra,
  orientarMalhaRadial
} from './particulasTextura3D';

const ESFERA_SEGMENTOS = 32;

export function calcularNumNeutroes(numeroAtomico, neutroesInformados) {
  if (neutroesInformados != null) return neutroesInformados;
  return numeroAtomico === 1 ? 0 : Math.round(numeroAtomico * (numeroAtomico <= 20 ? 1.0 : 1.15));
}

export function distribuirNucleons(total, radius) {
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

/**
 * Grupo com prótons e nêutrons individuais (sem esfera simples).
 * @param {number} escalaVisual — amplia o núcleo na vista dedicada
 */
export function criarGrupoNucleoDetalhado(numeroAtomico, neutroesInformados, escalaVisual = 1) {
  const num = Math.max(1, Math.min(118, numeroAtomico || 1));
  const numNeutroes = calcularNumNeutroes(num, neutroesInformados);
  const totalNucleons = num + numNeutroes;

  const grupo = new THREE.Group();
  grupo.userData = { isNucleus: true, isNucleusDetailed: true };

  const nucleonRadius = Math.max(1.0, 3.5 - Math.log(totalNucleons + 1) * 0.5);
  const nucleusRadius = 12;
  const particleGeo = new THREE.SphereGeometry(nucleonRadius, ESFERA_SEGMENTOS, ESFERA_SEGMENTOS);
  const protonMat = criarMaterialNucleonComLetra('p');
  const neutronMat = criarMaterialNucleonComLetra('n');

  const posicoes = distribuirNucleons(totalNucleons, nucleusRadius);
  const maxSpeed = 0.15;
  const nucleusLimit = nucleusRadius * 0.8;
  const maxV = 0.2;

  for (let i = 0; i < num; i++) {
    const p = new THREE.Mesh(particleGeo, protonMat);
    p.position.set(posicoes[i][0], posicoes[i][1], posicoes[i][2]);
    orientarMalhaRadial(p, posicoes[i][0], posicoes[i][1], posicoes[i][2]);
    p.userData = {
      tipo: 'proton',
      vx: (Math.random() - 0.5) * maxSpeed,
      vy: (Math.random() - 0.5) * maxSpeed,
      vz: (Math.random() - 0.5) * maxSpeed,
      limit: nucleusLimit,
      maxV
    };
    grupo.add(p);
  }
  for (let i = num; i < totalNucleons; i++) {
    const n = new THREE.Mesh(particleGeo, neutronMat);
    n.position.set(posicoes[i][0], posicoes[i][1], posicoes[i][2]);
    orientarMalhaRadial(n, posicoes[i][0], posicoes[i][1], posicoes[i][2]);
    n.userData = {
      tipo: 'neutron',
      vx: (Math.random() - 0.5) * maxSpeed,
      vy: (Math.random() - 0.5) * maxSpeed,
      vz: (Math.random() - 0.5) * maxSpeed,
      limit: nucleusLimit,
      maxV
    };
    grupo.add(n);
  }

  if (escalaVisual !== 1) grupo.scale.setScalar(escalaVisual);
  return grupo;
}

export function animarNucleons(grupoDetalhado) {
  if (!grupoDetalhado?.visible) return;
  const perturbacao = 0.02;
  grupoDetalhado.children.forEach((nucleon) => {
    const ud = nucleon.userData;
    if (ud.vx === undefined) return;
    nucleon.position.x += ud.vx;
    nucleon.position.y += ud.vy;
    nucleon.position.z += ud.vz;
    ud.vx += (Math.random() - 0.5) * perturbacao;
    ud.vy += (Math.random() - 0.5) * perturbacao;
    ud.vz += (Math.random() - 0.5) * perturbacao;
    const limit = ud.limit || 9.6;
    const r = Math.hypot(nucleon.position.x, nucleon.position.y, nucleon.position.z);
    if (r > limit && r > 0.001) {
      nucleon.position.multiplyScalar(limit / r);
      const dot = nucleon.position.x * ud.vx + nucleon.position.y * ud.vy + nucleon.position.z * ud.vz;
      if (dot > 0) {
        ud.vx -= (nucleon.position.x * dot) / (r * r) * 0.5;
        ud.vy -= (nucleon.position.y * dot) / (r * r) * 0.5;
        ud.vz -= (nucleon.position.z * dot) / (r * r) * 0.5;
      }
    }
    const maxV = ud.maxV ?? 0.2;
    ud.vx = Math.max(-maxV, Math.min(maxV, ud.vx));
    ud.vy = Math.max(-maxV, Math.min(maxV, ud.vy));
    ud.vz = Math.max(-maxV, Math.min(maxV, ud.vz));
    orientarMalhaRadial(nucleon, nucleon.position.x, nucleon.position.y, nucleon.position.z);
  });
}
