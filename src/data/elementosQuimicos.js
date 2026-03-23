// Categorias e cores para a tabela periódica
export const CATEGORIAS = {
  metal_alcalino: { nome: 'Metal alcalino', cor: '#8b5cf6' },
  metal_alcalino_terroso: { nome: 'Metal alcalino-terroso', cor: '#f59e0b' },
  metal_transicao: { nome: 'Metal de transição', cor: '#3b82f6' },
  lantanideo: { nome: 'Lantanídeo', cor: '#ec4899' },
  actinideo: { nome: 'Actinídeo', cor: '#f97316' },
  metal_pos_transicao: { nome: 'Metal pós-transição', cor: '#22c55e' },
  semimetal: { nome: 'Semimetal', cor: '#14b8a6' },
  nao_metal: { nome: 'Não metal', cor: '#84cc16' },
  halogenio: { nome: 'Halogênio', cor: '#06b6d4' },
  gas_nobre: { nome: 'Gás nobre', cor: '#0ea5e9' }
};

// Tabela periódica - Elementos químicos (1-118)
// neutroes = isótopo mais estável | raioAtomico em pm | massaAtomica em u
export const elementosQuimicos = {
  1: { simbolo: 'H', nome: 'Hidrogênio', categoria: 'nao_metal', neutroes: 0, raioAtomico: 120, massaAtomica: 1.008 },
  2: { simbolo: 'He', nome: 'Hélio', categoria: 'gas_nobre', neutroes: 2, raioAtomico: 140, massaAtomica: 4.003 },
  3: { simbolo: 'Li', nome: 'Lítio', categoria: 'metal_alcalino', neutroes: 4, raioAtomico: 182, massaAtomica: 6.941 },
  4: { simbolo: 'Be', nome: 'Berílio', categoria: 'metal_alcalino_terroso', neutroes: 5, raioAtomico: 153, massaAtomica: 9.012 },
  5: { simbolo: 'B', nome: 'Boro', categoria: 'semimetal', neutroes: 6, raioAtomico: 192, massaAtomica: 10.81 },
  6: { simbolo: 'C', nome: 'Carbono', categoria: 'nao_metal', neutroes: 6, raioAtomico: 170, massaAtomica: 12.01 },
  7: { simbolo: 'N', nome: 'Nitrogênio', categoria: 'nao_metal', neutroes: 7, raioAtomico: 155, massaAtomica: 14.01 },
  8: { simbolo: 'O', nome: 'Oxigênio', categoria: 'nao_metal', neutroes: 8, raioAtomico: 152, massaAtomica: 16.00 },
  9: { simbolo: 'F', nome: 'Flúor', categoria: 'halogenio', neutroes: 10, raioAtomico: 135, massaAtomica: 19.00 },
  10: { simbolo: 'Ne', nome: 'Neônio', categoria: 'gas_nobre', neutroes: 10, raioAtomico: 154, massaAtomica: 20.18 },
  11: { simbolo: 'Na', nome: 'Sódio', categoria: 'metal_alcalino', neutroes: 12, raioAtomico: 227, massaAtomica: 22.99 },
  12: { simbolo: 'Mg', nome: 'Magnésio', categoria: 'metal_alcalino_terroso', neutroes: 12, raioAtomico: 173, massaAtomica: 24.31 },
  13: { simbolo: 'Al', nome: 'Alumínio', categoria: 'metal_pos_transicao', neutroes: 14, raioAtomico: 184, massaAtomica: 26.98 },
  14: { simbolo: 'Si', nome: 'Silício', categoria: 'semimetal', neutroes: 14, raioAtomico: 210, massaAtomica: 28.09 },
  15: { simbolo: 'P', nome: 'Fósforo', categoria: 'nao_metal', neutroes: 16, raioAtomico: 180, massaAtomica: 30.97 },
  16: { simbolo: 'S', nome: 'Enxofre', categoria: 'nao_metal', neutroes: 16, raioAtomico: 180, massaAtomica: 32.07 },
  17: { simbolo: 'Cl', nome: 'Cloro', categoria: 'halogenio', neutroes: 18, raioAtomico: 180, massaAtomica: 35.45 },
  18: { simbolo: 'Ar', nome: 'Argônio', categoria: 'gas_nobre', neutroes: 22, raioAtomico: 188, massaAtomica: 39.95 },
  19: { simbolo: 'K', nome: 'Potássio', categoria: 'metal_alcalino', neutroes: 20, raioAtomico: 275, massaAtomica: 39.10 },
  20: { simbolo: 'Ca', nome: 'Cálcio', categoria: 'metal_alcalino_terroso', neutroes: 20, raioAtomico: 231, massaAtomica: 40.08 },
  21: { simbolo: 'Sc', nome: 'Escândio', categoria: 'metal_transicao', neutroes: 24, raioAtomico: 211, massaAtomica: 44.96 },
  22: { simbolo: 'Ti', nome: 'Titânio', categoria: 'metal_transicao', neutroes: 26, raioAtomico: 197, massaAtomica: 47.87 },
  23: { simbolo: 'V', nome: 'Vanádio', categoria: 'metal_transicao', neutroes: 28, raioAtomico: 192, massaAtomica: 50.94 },
  24: { simbolo: 'Cr', nome: 'Cromo', categoria: 'metal_transicao', neutroes: 28, raioAtomico: 189, massaAtomica: 52.00 },
  25: { simbolo: 'Mn', nome: 'Manganês', categoria: 'metal_transicao', neutroes: 30, raioAtomico: 197, massaAtomica: 54.94 },
  26: { simbolo: 'Fe', nome: 'Ferro', categoria: 'metal_transicao', neutroes: 30, raioAtomico: 194, massaAtomica: 55.85 },
  27: { simbolo: 'Co', nome: 'Cobalto', categoria: 'metal_transicao', neutroes: 32, raioAtomico: 192, massaAtomica: 58.93 },
  28: { simbolo: 'Ni', nome: 'Níquel', categoria: 'metal_transicao', neutroes: 31, raioAtomico: 163, massaAtomica: 58.69 },
  29: { simbolo: 'Cu', nome: 'Cobre', categoria: 'metal_transicao', neutroes: 35, raioAtomico: 140, massaAtomica: 63.55 },
  30: { simbolo: 'Zn', nome: 'Zinco', categoria: 'metal_transicao', neutroes: 35, raioAtomico: 139, massaAtomica: 65.38 },
  31: { simbolo: 'Ga', nome: 'Gálio', categoria: 'metal_pos_transicao', neutroes: 39, raioAtomico: 187, massaAtomica: 69.72 },
  32: { simbolo: 'Ge', nome: 'Germânio', categoria: 'semimetal', neutroes: 41, raioAtomico: 211, massaAtomica: 72.64 },
  33: { simbolo: 'As', nome: 'Arsênio', categoria: 'semimetal', neutroes: 42, raioAtomico: 185, massaAtomica: 74.92 },
  34: { simbolo: 'Se', nome: 'Selênio', categoria: 'nao_metal', neutroes: 45, raioAtomico: 190, massaAtomica: 78.96 },
  35: { simbolo: 'Br', nome: 'Bromo', categoria: 'halogenio', neutroes: 45, raioAtomico: 183, massaAtomica: 79.90 },
  36: { simbolo: 'Kr', nome: 'Criptônio', categoria: 'gas_nobre', neutroes: 48, raioAtomico: 202, massaAtomica: 83.80 },
  37: { simbolo: 'Rb', nome: 'Rubídio', categoria: 'metal_alcalino', neutroes: 48, raioAtomico: 303, massaAtomica: 85.47 },
  38: { simbolo: 'Sr', nome: 'Estrôncio', categoria: 'metal_alcalino_terroso', neutroes: 50, raioAtomico: 249, massaAtomica: 87.62 },
  39: { simbolo: 'Y', nome: 'Ítrio', categoria: 'metal_transicao', neutroes: 50, raioAtomico: 219, massaAtomica: 88.91 },
  40: { simbolo: 'Zr', nome: 'Zircônio', categoria: 'metal_transicao', neutroes: 51, raioAtomico: 203, massaAtomica: 91.22 },
  41: { simbolo: 'Nb', nome: 'Nióbio', categoria: 'metal_transicao', neutroes: 52, raioAtomico: 198, massaAtomica: 92.91 },
  42: { simbolo: 'Mo', nome: 'Molibdênio', categoria: 'metal_transicao', neutroes: 54, raioAtomico: 190, massaAtomica: 95.96 },
  43: { simbolo: 'Tc', nome: 'Tecnécio', categoria: 'metal_transicao', neutroes: 55, raioAtomico: 196, massaAtomica: 98 },
  44: { simbolo: 'Ru', nome: 'Rutênio', categoria: 'metal_transicao', neutroes: 57, raioAtomico: 189, massaAtomica: 101.1 },
  45: { simbolo: 'Rh', nome: 'Ródio', categoria: 'metal_transicao', neutroes: 58, raioAtomico: 193, massaAtomica: 102.9 },
  46: { simbolo: 'Pd', nome: 'Paládio', categoria: 'metal_transicao', neutroes: 60, raioAtomico: 202, massaAtomica: 106.4 },
  47: { simbolo: 'Ag', nome: 'Prata', categoria: 'metal_transicao', neutroes: 61, raioAtomico: 172, massaAtomica: 107.9 },
  48: { simbolo: 'Cd', nome: 'Cádmio', categoria: 'metal_transicao', neutroes: 64, raioAtomico: 158, massaAtomica: 112.4 },
  49: { simbolo: 'In', nome: 'Índio', categoria: 'metal_pos_transicao', neutroes: 66, raioAtomico: 193, massaAtomica: 114.8 },
  50: { simbolo: 'Sn', nome: 'Estanho', categoria: 'metal_pos_transicao', neutroes: 69, raioAtomico: 217, massaAtomica: 118.7 },
  51: { simbolo: 'Sb', nome: 'Antimônio', categoria: 'semimetal', neutroes: 71, raioAtomico: 206, massaAtomica: 121.8 },
  52: { simbolo: 'Te', nome: 'Telúrio', categoria: 'semimetal', neutroes: 76, raioAtomico: 206, massaAtomica: 127.6 },
  53: { simbolo: 'I', nome: 'Iodo', categoria: 'halogenio', neutroes: 74, raioAtomico: 198, massaAtomica: 126.9 },
  54: { simbolo: 'Xe', nome: 'Xenônio', categoria: 'gas_nobre', neutroes: 77, raioAtomico: 216, massaAtomica: 131.3 },
  55: { simbolo: 'Cs', nome: 'Césio', categoria: 'metal_alcalino', neutroes: 78, raioAtomico: 298, massaAtomica: 132.9 },
  56: { simbolo: 'Ba', nome: 'Bário', categoria: 'metal_alcalino_terroso', neutroes: 81, raioAtomico: 253, massaAtomica: 137.3 },
  57: { simbolo: 'La', nome: 'Lantânio', categoria: 'lantanideo', neutroes: 82, raioAtomico: 195, massaAtomica: 138.9 },
  58: { simbolo: 'Ce', nome: 'Cério', categoria: 'lantanideo', neutroes: 82, raioAtomico: 185, massaAtomica: 140.1 },
  59: { simbolo: 'Pr', nome: 'Praseodímio', categoria: 'lantanideo', neutroes: 82, raioAtomico: 247, massaAtomica: 140.9 },
  60: { simbolo: 'Nd', nome: 'Neodímio', categoria: 'lantanideo', neutroes: 84, raioAtomico: 206, massaAtomica: 144.2 },
  61: { simbolo: 'Pm', nome: 'Promécio', categoria: 'lantanideo', neutroes: 84, raioAtomico: 205, massaAtomica: 145 },
  62: { simbolo: 'Sm', nome: 'Samário', categoria: 'lantanideo', neutroes: 88, raioAtomico: 238, massaAtomica: 150.4 },
  63: { simbolo: 'Eu', nome: 'Európio', categoria: 'lantanideo', neutroes: 89, raioAtomico: 231, massaAtomica: 152.0 },
  64: { simbolo: 'Gd', nome: 'Gadolínio', categoria: 'lantanideo', neutroes: 93, raioAtomico: 233, massaAtomica: 157.3 },
  65: { simbolo: 'Tb', nome: 'Térbio', categoria: 'lantanideo', neutroes: 94, raioAtomico: 225, massaAtomica: 158.9 },
  66: { simbolo: 'Dy', nome: 'Disprósio', categoria: 'lantanideo', neutroes: 97, raioAtomico: 228, massaAtomica: 162.5 },
  67: { simbolo: 'Ho', nome: 'Hólmio', categoria: 'lantanideo', neutroes: 98, raioAtomico: 226, massaAtomica: 164.9 },
  68: { simbolo: 'Er', nome: 'Érbio', categoria: 'lantanideo', neutroes: 99, raioAtomico: 226, massaAtomica: 167.3 },
  69: { simbolo: 'Tm', nome: 'Túlio', categoria: 'lantanideo', neutroes: 100, raioAtomico: 222, massaAtomica: 168.9 },
  70: { simbolo: 'Yb', nome: 'Itérbio', categoria: 'lantanideo', neutroes: 103, raioAtomico: 222, massaAtomica: 173.0 },
  71: { simbolo: 'Lu', nome: 'Lutécio', categoria: 'lantanideo', neutroes: 104, raioAtomico: 217, massaAtomica: 175.0 },
  72: { simbolo: 'Hf', nome: 'Háfnio', categoria: 'metal_transicao', neutroes: 106, raioAtomico: 208, massaAtomica: 178.5 },
  73: { simbolo: 'Ta', nome: 'Tântalo', categoria: 'metal_transicao', neutroes: 108, raioAtomico: 200, massaAtomica: 180.9 },
  74: { simbolo: 'W', nome: 'Tungstênio', categoria: 'metal_transicao', neutroes: 110, raioAtomico: 193, massaAtomica: 183.8 },
  75: { simbolo: 'Re', nome: 'Rênio', categoria: 'metal_transicao', neutroes: 111, raioAtomico: 188, massaAtomica: 186.2 },
  76: { simbolo: 'Os', nome: 'Ósmio', categoria: 'metal_transicao', neutroes: 114, raioAtomico: 185, massaAtomica: 190.2 },
  77: { simbolo: 'Ir', nome: 'Irídio', categoria: 'metal_transicao', neutroes: 115, raioAtomico: 180, massaAtomica: 192.2 },
  78: { simbolo: 'Pt', nome: 'Platina', categoria: 'metal_transicao', neutroes: 117, raioAtomico: 177, massaAtomica: 195.1 },
  79: { simbolo: 'Au', nome: 'Ouro', categoria: 'metal_transicao', neutroes: 118, raioAtomico: 174, massaAtomica: 197.0 },
  80: { simbolo: 'Hg', nome: 'Mercúrio', categoria: 'metal_transicao', neutroes: 121, raioAtomico: 171, massaAtomica: 200.6 },
  81: { simbolo: 'Tl', nome: 'Tálio', categoria: 'metal_pos_transicao', neutroes: 123, raioAtomico: 196, massaAtomica: 204.4 },
  82: { simbolo: 'Pb', nome: 'Chumbo', categoria: 'metal_pos_transicao', neutroes: 125, raioAtomico: 202, massaAtomica: 207.2 },
  83: { simbolo: 'Bi', nome: 'Bismuto', categoria: 'metal_pos_transicao', neutroes: 126, raioAtomico: 207, massaAtomica: 209.0 },
  84: { simbolo: 'Po', nome: 'Polônio', categoria: 'metal_pos_transicao', neutroes: 125, raioAtomico: 197, massaAtomica: 209 },
  85: { simbolo: 'At', nome: 'Astato', categoria: 'halogenio', neutroes: 125, raioAtomico: 202, massaAtomica: 210 },
  86: { simbolo: 'Rn', nome: 'Radônio', categoria: 'gas_nobre', neutroes: 136, raioAtomico: 220, massaAtomica: 222 },
  87: { simbolo: 'Fr', nome: 'Frâncio', categoria: 'metal_alcalino', neutroes: 136, raioAtomico: 348, massaAtomica: 223 },
  88: { simbolo: 'Ra', nome: 'Rádio', categoria: 'metal_alcalino_terroso', neutroes: 138, raioAtomico: 283, massaAtomica: 226 },
  89: { simbolo: 'Ac', nome: 'Actínio', categoria: 'actinideo', neutroes: 138, raioAtomico: 195, massaAtomica: 227 },
  90: { simbolo: 'Th', nome: 'Tório', categoria: 'actinideo', neutroes: 142, raioAtomico: 180, massaAtomica: 232.0 },
  91: { simbolo: 'Pa', nome: 'Protactínio', categoria: 'actinideo', neutroes: 140, raioAtomico: 180, massaAtomica: 231.0 },
  92: { simbolo: 'U', nome: 'Urânio', categoria: 'actinideo', neutroes: 146, raioAtomico: 175, massaAtomica: 238.0 },
  93: { simbolo: 'Np', nome: 'Neptúnio', categoria: 'actinideo', neutroes: 144, raioAtomico: 175, massaAtomica: 237 },
  94: { simbolo: 'Pu', nome: 'Plutônio', categoria: 'actinideo', neutroes: 150, raioAtomico: 175, massaAtomica: 244 },
  95: { simbolo: 'Am', nome: 'Amerício', categoria: 'actinideo', neutroes: 148, raioAtomico: 175, massaAtomica: 243 },
  96: { simbolo: 'Cm', nome: 'Cúrio', categoria: 'actinideo', neutroes: 151, raioAtomico: 176, massaAtomica: 247 },
  97: { simbolo: 'Bk', nome: 'Berquélio', categoria: 'actinideo', neutroes: 150, raioAtomico: 170, massaAtomica: 247 },
  98: { simbolo: 'Cf', nome: 'Califórnio', categoria: 'actinideo', neutroes: 153, raioAtomico: 186, massaAtomica: 251 },
  99: { simbolo: 'Es', nome: 'Einstênio', categoria: 'actinideo', neutroes: 153, raioAtomico: 186, massaAtomica: 252 },
  100: { simbolo: 'Fm', nome: 'Férmio', categoria: 'actinideo', neutroes: 157, raioAtomico: 175, massaAtomica: 257 },
  101: { simbolo: 'Md', nome: 'Mendelévio', categoria: 'actinideo', neutroes: 157, raioAtomico: 175, massaAtomica: 258 },
  102: { simbolo: 'No', nome: 'Nobélio', categoria: 'actinideo', neutroes: 157, raioAtomico: 175, massaAtomica: 259 },
  103: { simbolo: 'Lr', nome: 'Laurêncio', categoria: 'actinideo', neutroes: 163, raioAtomico: 161, massaAtomica: 266 },
  104: { simbolo: 'Rf', nome: 'Rutherfórdio', categoria: 'metal_transicao', neutroes: 163, raioAtomico: 157, massaAtomica: 267 },
  105: { simbolo: 'Db', nome: 'Dúbnio', categoria: 'metal_transicao', neutroes: 163, raioAtomico: 149, massaAtomica: 268 },
  106: { simbolo: 'Sg', nome: 'Seabórgio', categoria: 'metal_transicao', neutroes: 163, raioAtomico: 143, massaAtomica: 269 },
  107: { simbolo: 'Bh', nome: 'Bóhrio', categoria: 'metal_transicao', neutroes: 163, raioAtomico: 141, massaAtomica: 270 },
  108: { simbolo: 'Hs', nome: 'Hássio', categoria: 'metal_transicao', neutroes: 169, raioAtomico: 134, massaAtomica: 277 },
  109: { simbolo: 'Mt', nome: 'Meitnério', categoria: 'metal_transicao', neutroes: 169, raioAtomico: 128, massaAtomica: 278 },
  110: { simbolo: 'Ds', nome: 'Darmstádtio', categoria: 'metal_transicao', neutroes: 171, raioAtomico: 128, massaAtomica: 281 },
  111: { simbolo: 'Rg', nome: 'Roentgênio', categoria: 'metal_transicao', neutroes: 171, raioAtomico: 121, massaAtomica: 282 },
  112: { simbolo: 'Cn', nome: 'Copernício', categoria: 'metal_transicao', neutroes: 173, raioAtomico: 118, massaAtomica: 285 },
  113: { simbolo: 'Nh', nome: 'Nihônio', categoria: 'metal_pos_transicao', neutroes: 173, raioAtomico: 136, massaAtomica: 286 },
  114: { simbolo: 'Fl', nome: 'Fleróvio', categoria: 'metal_pos_transicao', neutroes: 175, raioAtomico: 143, massaAtomica: 289 },
  115: { simbolo: 'Mc', nome: 'Moscóvio', categoria: 'metal_pos_transicao', neutroes: 175, raioAtomico: 162, massaAtomica: 290 },
  116: { simbolo: 'Lv', nome: 'Livermório', categoria: 'metal_pos_transicao', neutroes: 177, raioAtomico: 175, massaAtomica: 293 },
  117: { simbolo: 'Ts', nome: 'Tenesso', categoria: 'halogenio', neutroes: 177, raioAtomico: 165, massaAtomica: 294 },
  118: { simbolo: 'Og', nome: 'Oganessônio', categoria: 'gas_nobre', neutroes: 176, raioAtomico: 157, massaAtomica: 294 }
};

export const lantanides = [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71];
export const actinides = [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103];

// Ordem de preenchimento dos subníveis (Aufbau)
export const AUFBAU_ORDER = [
  '1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'
];
export const SUBLEVEL_CAPACITY = { s: 2, p: 6, d: 10, f: 14 };
export const SUBLEVEL_COLORS = { s: 0x00ff88, p: 0x4488ff, d: 0xffcc00, f: 0xff44aa };
export const SUBLEVEL_COLORS_HEX = { s: '#00ff88', p: '#4488ff', d: '#ffcc00', f: '#ff44aa' };

// Exceções à regra de Aufbau
export const CONFIG_EXCEPCIONAIS = {
  24: { '3d': 5, '4s': 1 },   // Cr
  29: { '3d': 10, '4s': 1 },  // Cu
  41: { '4d': 4, '5s': 1 },   // Nb
  42: { '4d': 5, '5s': 1 },   // Mo
  43: { '4d': 6, '5s': 1 },   // Tc
  44: { '4d': 7, '5s': 1 },   // Ru
  45: { '4d': 8, '5s': 1 },   // Rh
  46: { '4d': 10, '5s': 0 },  // Pd
  47: { '4d': 10, '5s': 1 },  // Ag
  57: { '5d': 1, '4f': 0, '6s': 2 },  // La
  58: { '4f': 1, '5d': 1, '6s': 2 },  // Ce
  64: { '4f': 7, '5d': 1, '6s': 2 },  // Gd
  78: { '5d': 9, '6s': 1 },   // Pt
  79: { '5d': 10, '6s': 1 },  // Au
  89: { '6d': 1, '5f': 0, '7s': 2 },  // Ac
  90: { '6d': 2, '5f': 0, '7s': 2 },  // Th
  91: { '5f': 2, '6d': 1, '7s': 2 },  // Pa
  92: { '5f': 3, '6d': 1, '7s': 2 },  // U
  93: { '5f': 4, '6d': 1, '7s': 2 },  // Np
  96: { '5f': 7, '6d': 1, '7s': 2 }   // Cm
};

export function obterConfiguracaoEletronica(numeroAtomico) {
  if (CONFIG_EXCEPCIONAIS[numeroAtomico]) {
    const excecao = CONFIG_EXCEPCIONAIS[numeroAtomico];
    const config = {};
    let restante = numeroAtomico;
    for (const sub of AUFBAU_ORDER) {
      if (restante <= 0) break;
      if (excecao[sub] !== undefined) {
        config[sub] = Math.min(excecao[sub], restante);
      } else {
        const tipo = sub.charAt(sub.length - 1);
        const max = SUBLEVEL_CAPACITY[tipo];
        config[sub] = Math.min(max, restante);
      }
      restante -= config[sub];
    }
    return config;
  }
  const config = {};
  let restante = numeroAtomico;
  for (const sub of AUFBAU_ORDER) {
    if (restante <= 0) break;
    const tipo = sub.charAt(sub.length - 1);
    const max = SUBLEVEL_CAPACITY[tipo];
    config[sub] = Math.min(max, restante);
    restante -= config[sub];
  }
  return config;
}

const SUPERSCRIPTS = '⁰¹²³⁴⁵⁶⁷⁸⁹';
export function configParaTexto(config) {
  const partes = [];
  for (const sub of AUFBAU_ORDER) {
    if (config[sub] > 0) {
      const expoente = config[sub].toString().split('').map((c) => SUPERSCRIPTS[parseInt(c, 10)] || c).join('');
      partes.push(sub + expoente);
    }
  }
  return partes.join(' ');
}

// Estrutura da tabela periódica para renderização (períodos 1-7, 18 colunas cada)
export const periodosTabela = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10],
  [11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
  [55, 56, 57, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
  [87, 88, 89, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118]
];
