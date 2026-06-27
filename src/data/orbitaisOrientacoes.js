/** Orientações orbitais por subnível (notação química) */
export const ORBITAIS_S = ['s'];
export const ORBITAIS_P = ['px', 'py', 'pz'];
export const ORBITAIS_D = ['dxy', 'dyz', 'dxz', 'dx2-y2', 'dz2'];
export const ORBITAIS_F = [
  'fx(x2-3y2)',
  'fy(x2-z2)',
  'fxz2',
  'fz3',
  'fyz2',
  'fxyz',
  'fy(3x2-y2)'
];

export const ORBITAIS_POR_TIPO = {
  s: ORBITAIS_S,
  p: ORBITAIS_P,
  d: ORBITAIS_D,
  f: ORBITAIS_F
};

/** Rótulos para menus e UI */
export const ROTULOS_ORBITAL = {
  s: 's',
  px: 'pₓ',
  py: 'pᵧ',
  pz: 'p_z',
  dxy: 'd_xy',
  dyz: 'd_yz',
  dxz: 'd_xz',
  'dx2-y2': 'd_x²−y²',
  dz2: 'd_z²',
  'fx(x2-3y2)': 'f_x(x²−3y²)',
  'fy(x2-z2)': 'f_y(x²−z²)',
  fxz2: 'f_xz²',
  fz3: 'f_z³',
  fyz2: 'f_yz²',
  fxyz: 'f_xyz',
  'fy(3x2-y2)': 'f_y(3x²−y²)'
};

export function criarOrbitaisOrientacaoVisiveisIniciais() {
  const visiveis = {};
  for (const ids of Object.values(ORBITAIS_POR_TIPO)) {
    for (const id of ids) visiveis[id] = true;
  }
  return visiveis;
}

export function obterNiveisEnergiaOcupados(config) {
  const niveis = new Set();
  for (const [sub, qtd] of Object.entries(config)) {
    if (qtd > 0) niveis.add(parseInt(sub.charAt(0), 10));
  }
  return [...niveis].sort((a, b) => a - b);
}
