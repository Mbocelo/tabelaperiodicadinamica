/** Tipos de modelo atómico disponíveis no visualizador 3D */

export const TIPOS_MODELO_ATOMICO = {
  dalton: {
    id: 'dalton',
    label: 'Dalton',
    labelCurto: 'Dalton',
    ano: 1803,
    descricao: 'Esfera sólida indivisível (1803)'
  },
  thomson: {
    id: 'thomson',
    label: 'Thomson',
    labelCurto: 'Thomson',
    ano: 1904,
    descricao: '«Pudim de passas» — carga positiva difusa (1904)'
  },
  'rutherford-bohr': {
    id: 'rutherford-bohr',
    label: 'Rutherford-Bohr',
    labelCurto: 'Bohr',
    ano: 1913,
    descricao: 'Núcleo denso e elétrons em órbitas circulares (1913)'
  },
  quantico: {
    id: 'quantico',
    label: 'Quântico',
    labelCurto: 'Quânt.',
    ano: 1926,
    descricao: 'Orbitais s, p, d, f — modelo actual (mecânica quântica)'
  }
};

/** Ordem cronológica (história da ciência) */
export const LISTA_MODELOS_ATOMICOS = [
  TIPOS_MODELO_ATOMICO.dalton,
  TIPOS_MODELO_ATOMICO.thomson,
  TIPOS_MODELO_ATOMICO['rutherford-bohr'],
  TIPOS_MODELO_ATOMICO.quantico
];

export function obterModeloAtomico(id) {
  return TIPOS_MODELO_ATOMICO[id] ?? TIPOS_MODELO_ATOMICO.quantico;
}

export function tituloModeloVisualizador(id) {
  const modelo = obterModeloAtomico(id);
  return `Modelo de ${modelo.label}`;
}
