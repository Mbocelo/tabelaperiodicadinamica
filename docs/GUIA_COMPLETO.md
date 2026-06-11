# Guia completo — Tabela Periódica Dinâmica

Documentação de referência sobre **o que o projeto usa**, **como funciona** e **como utilizar** todas as funcionalidades.

---

## Índice

1. [Visão geral](#1-visão-geral)
2. [Como usar a aplicação](#2-como-usar-a-aplicação)
3. [Stack tecnológica](#3-stack-tecnológica)
4. [Estrutura do projeto](#4-estrutura-do-projeto)
5. [Arquitetura da aplicação](#5-arquitetura-da-aplicação)
6. [Modelo de dados químicos](#6-modelo-de-dados-químicos)
7. [Visualizador 3D (Three.js)](#7-visualizador-3d-threejs)
8. [Responsividade e layouts](#8-responsividade-e-layouts)
9. [Desenvolvimento](#9-desenvolvimento)
10. [Build e publicação](#10-build-e-publicação)
11. [Limitações e notas educacionais](#11-limitações-e-notas-educacionais)

---

## 1. Visão geral

**Tabela Periódica Dinâmica** é uma aplicação web educacional que permite:

- Explorar os **118 elementos** da tabela periódica.
- Consultar propriedades e **configuração eletrônica** de cada elemento.
- Visualizar um **modelo atômico 3D interativo** com núcleo, orbitais por subnível (s, p, d, f) e elétrons animados.

A aplicação funciona inteiramente no navegador (client-side). Não há servidor de API nem autenticação de utilizador.

| Aspeto | Detalhe |
|--------|---------|
| Idioma da interface | Português (PT) |
| Tema visual | Escuro (Material UI) |
| Elemento padrão ao abrir | Carbono (Z = 6) |
| Dados químicos | Isótopo estável mais comum; valores educativos |

---

## 2. Como usar a aplicação

### 2.1 Primeiro acesso

1. Instale as dependências e inicie o servidor (ver [secção 9](#9-desenvolvimento)).
2. Abra a URL no navegador (ex.: `http://localhost:5173`).
3. A tabela periódica ocupa a área principal; a barra superior mostra o título e o botão de menu (☰).

### 2.2 Tabela periódica

| Ação | Como fazer |
|------|------------|
| Selecionar elemento | Clique numa célula colorida |
| Navegar em ecrãs pequenos | Deslize horizontalmente se a grelha não couber na largura |
| Ver categorias | Consulte a legenda abaixo da tabela |
| Lantanídeos / Actinídeos | Linhas dedicadas com rótulos **La:** e **Ac:** |

A célula selecionada fica com **borda amarela** e brilho. A cor de fundo indica a **categoria química** (metal alcalino, halogénio, gás nobre, etc.).

### 2.3 Painel do elemento selecionado

Após selecionar um elemento, abre-se o painel com:

| Campo | Descrição |
|-------|-----------|
| Símbolo e nome | Identificação do elemento |
| Categoria | Tipo na tabela periódica |
| Nº atómico | Número de protões (1–118) |
| Nêutrons | Do isótopo estável usado nos dados |
| Massa atómica | Em unidades u |
| Raio atómico | Em picómetros (pm) |
| Configuração eletrónica | Notação tipo `1s² 2s² 2p²` |
| Legenda s/p/d/f | Cores dos subníveis no modelo 3D |

**Onde aparece o painel:**

| Dispositivo | Comportamento |
|-------------|---------------|
| Desktop (≥ 1200px) | Cartão fixo à esquerda da tabela |
| Telemóvel / tablet | Drawer (painel) que sobe da parte inferior |

**Campo «Nº atómico»:** digite um valor entre 1 e 118 para mudar o elemento ativo.

**Botão «Modelo 3D»:** abre o visualizador tridimensional do elemento atual.

### 2.4 Visualizador 3D — controlos

O diálogo 3D abre em janela grande no desktop ou em **ecrã completo** no telemóvel/tablet.

#### Barra de ferramentas

| Botão | Função |
|-------|--------|
| **Ocultar / Mostrar elétrons** | Esconde ou exibe todas as esferas dos elétrons |
| **Mostrar / Esconder núcleo** | Força o núcleo detalhado (prótons e nêutrons individuais) |
| **Rotação automática / Parar rotação** | Liga ou desliga a rotação contínua do modelo |
| **Mostrar / Ocultar coordenadas** | Eixos X/Y/Z, etiquetas +/− e grelha de referência |
| **Subníveis ▾** | Menu com checkboxes para `s`, `p`, `d`, `f` |
| **Câmera RA / RA ligado** | *(Só mobile)* Ativa câmera traseira como fundo |

#### Menu Subníveis

- Cada subnível (`s`, `p`, `d`, `f`) pode ser ligado ou desligado independentemente.
- Afeta **órbitais e elétrons**: só são visíveis as partículas dos subníveis marcados.
- Exemplo: marcar apenas `p` mostra só elétrons e orbitais do tipo p (2p, 3p, …).

#### Interação com o modelo

| Gestos | Efeito |
|--------|--------|
| Arrastar (rato / dedo) | Roda o átomo e as coordenadas no espaço |
| Scroll do rato | Zoom in / out |
| Pinch (dois dedos) | Zoom in / out no telemóvel |
| Rotação automática | Roda continuamente no eixo Y (quando ativada) |

**Comportamento por defeito:** o átomo está **parado** ao abrir o 3D. A rotação automática desliga-se ao fechar o diálogo.

#### Núcleo — dois modos

| Modo | Quando aparece |
|------|----------------|
| **Simples** | Câmera afastada (esfera cinzenta única) |
| **Detalhado** | Zoom próximo **ou** botão «Mostrar núcleo» |

No modo detalhado, prótons (vermelho) e nêutrons (cinza) movem-se ligeiramente dentro do volume nuclear.

#### Coordenadas 3D

- Eixos **X** (vermelho), **Y** (verde), **Z** (azul) com extensão positiva e negativa.
- Etiquetas: `+X`, `−X`, `+Y`, `−Y`, `+Z`, `−Z`.
- Grelha horizontal de referência.
- Rodam **junto com o átomo** (não ficam fixas à câmera).

#### Modo RA (realidade aumentada) — mobile

1. Abra o modelo 3D num telemóvel ou tablet.
2. Toque em **«Câmera RA»**.
3. Autorize o acesso à câmera quando o navegador pedir.
4. O vídeo da câmera traseira passa a ser o fundo; o átomo renderiza-se por cima com fundo transparente.
5. Uma sombra suave no «chão» ajuda a ancorar o modelo no espaço real.

> **Nota:** requer HTTPS ou `localhost` e permissão de câmera. Se falhar, o modo RA desliga-se automaticamente.

### 2.5 Menu lateral (☰)

| Item | Conteúdo |
|------|----------|
| Manual de uso | Resumo das funcionalidades |
| Termos de uso | Condições de utilização |
| Política de privacidade | Tratamento de dados (app local) |
| Sobre | Informação do projeto |

Os textos estão em `src/content/appInfoPt.js` e podem ser adaptados antes de uso público.

### 2.6 Fluxo típico de estudo

```
Abrir app → Clicar num elemento → Ler dados no painel
    → Abrir Modelo 3D → Explorar com zoom/rotação
    → Filtrar subnível (ex.: só «d») → Observar elétrons desse tipo
    → Ativar rotação automática (opcional) → Fechar
```

### 2.7 Dicas de desempenho

Em dispositivos mais lentos:

- Oculte elétrons se só precisar de ver orbitais.
- Desligue coordenadas.
- Filtre subníveis — menos partículas visíveis = melhor FPS.
- Evite modo RA em aparelhos antigos.

---

## 3. Stack tecnológica

### 3.1 Dependências de produção

| Pacote | Versão | Uso no projeto |
|--------|--------|----------------|
| **react** | ^18.2 | Biblioteca UI; componentes funcionais com hooks |
| **react-dom** | ^18.2 | Renderização no DOM (`createRoot`) |
| **@mui/material** | ^7.3 | Componentes visuais: AppBar, Drawer, Dialog, Button, Paper, etc. |
| **@mui/icons-material** | ^7.3 | Ícones: Menu, Science, Close, GridOn, ThreeDRotation, Videocam, … |
| **@emotion/react** | ^11.14 | Motor CSS-in-JS exigido pelo MUI |
| **@emotion/styled** | ^11.14 | Estilos styled do ecossistema MUI |
| **three** | ^0.183 | Motor WebGL: cena 3D, geometrias, materiais, luzes, animação |

### 3.2 Dependências de desenvolvimento

| Pacote | Uso |
|--------|-----|
| **vite** | Bundler e servidor de desenvolvimento |
| **@vitejs/plugin-react** | Suporte JSX/React no Vite |
| **eslint** + plugins React | Análise estática de código |
| **@types/react** / **@types/react-dom** | Tipos TypeScript (referência; projeto em JS) |

### 3.3 Ferramentas e padrões

| Tecnologia | Papel |
|------------|-------|
| **Vite 4** | `npm run dev`, HMR, build otimizado |
| **ES Modules** | `"type": "module"` no `package.json` |
| **CSS** | `index.css`, `App.css`, `TabelaPeriodica.css` + `sx` do MUI |
| **PropTypes** | Validação de props em `ElementoInfoCard` (`App.jsx`) |
| **WebGL** | Via Three.js no canvas do `Atom3D` |
| **MediaDevices API** | Câmera no modo RA (`getUserMedia`) |

### 3.4 Tema visual (MUI)

Definido em `src/main.jsx`:

| Token | Valor |
|-------|-------|
| `mode` | `dark` |
| `primary` | `#4CAF50` (verde) |
| `secondary` | `#ffff00` (amarelo) |
| Fundo geral | `#1a1a1a` |

---

## 4. Estrutura do projeto

```
tabelaperiodicadinamica/
├── index.html              # Página HTML raiz (lang pt-BR)
├── package.json            # Dependências e scripts npm
├── vite.config.js          # Configuração Vite + plugin React
├── .eslintrc.cjs           # Regras ESLint
├── README.md               # Resumo do projeto
├── docs/
│   └── GUIA_COMPLETO.md    # Este documento
└── src/
    ├── main.jsx            # Entrada: ThemeProvider + App
    ├── App.jsx             # Componente raiz e lógica principal
    ├── App.css             # Estilos do contentor 3D
    ├── index.css           # Reset global e #root
    ├── components/
    │   ├── TabelaPeriodica.jsx
    │   ├── TabelaPeriodica.css
    │   ├── Atom3D.jsx      # Cena Three.js
    │   └── AppMenu.jsx     # Barra + drawer + diálogos info
    ├── data/
    │   └── elementosQuimicos.js
    └── content/
        └── appInfoPt.js
```

---

## 5. Arquitetura da aplicação

### 5.1 Diagrama de componentes

```
main.jsx (ThemeProvider)
    └── App.jsx
            ├── AppMenuBar (AppMenu.jsx)
            │       ├── AppBar
            │       ├── Drawer (menu)
            │       └── Dialog (páginas info)
            ├── TabelaPeriodica.jsx
            │       └── elementoInfo → ElementoInfoCard (desktop)
            ├── Drawer inferior → ElementoInfoCard (mobile)
            └── Dialog 3D
                    └── Atom3D.jsx
```

### 5.2 Estado principal (`App.jsx`)

| Estado | Tipo | Descrição |
|--------|------|-----------|
| `numeroAtomico` | `number` | Elemento ativo (1–118) |
| `elementoSelecionado` | `number` | Destaque na tabela |
| `painelElementoAberto` | `boolean` | Drawer mobile aberto |
| `dialogAberto` | `boolean` | Visualizador 3D aberto |
| `mostrarEletrons` | `boolean` | Visibilidade dos elétrons |
| `mostrarCoordenadas` | `boolean` | Eixos e grelha 3D |
| `rotacaoAutomatica` | `boolean` | Rotação contínua do modelo |
| `forcarNucleoDetalhado` | `boolean` | Núcleo com prótons/nêutrons |
| `subniveisVisiveis` | `{s,p,d,f}` | Filtro de subníveis |
| `modoRealidadeAumentada` | `boolean` | Câmera RA (mobile) |
| `drawerAberto` | `boolean` | Menu lateral |
| `paginaInfo` | `string \| null` | Página info ativa |

### 5.3 Breakpoints relevantes

| Breakpoint | Uso |
|------------|-----|
| `theme.breakpoints.up('lg')` (~1200px) | Painel lateral vs drawer inferior |
| `theme.breakpoints.down('md')` | Dialog 3D fullscreen; botão RA |
| CSS `@media (min-width: 1200px)` | Sidebar na tabela |
| CSS `@media (max-width: 1024px)` | Células menores; scroll horizontal |

### 5.4 `TabelaPeriodica.jsx`

**Props:**

| Prop | Tipo | Função |
|------|------|--------|
| `numeroAtomico` | `number` | Elemento de referência |
| `onSelecionarElemento` | `function` | Callback ao clicar célula |
| `elementoSelecionado` | `number` | Célula com destaque |
| `elementoInfo` | `ReactNode` | Cartão lateral (desktop) |

Renderiza grelha 18×7 a partir de `periodosTabela`, mais linhas de lantanídeos e actinídeos.

### 5.5 `AppMenu.jsx`

**Props:** `drawerOpen`, `onOpenDrawer`, `onDrawerClose`, `infoPage`, `onInfoPage`, `onInfoClose`.

Lê textos de `INFO_PAGES` em `appInfoPt.js`.

### 5.6 `ElementoInfoCard` (interno a `App.jsx`)

Cartão MUI com dados do elemento, configuração eletrónica, campo numérico e botão 3D. Adapta layout em paisagem mobile (duas colunas compactas).

---

## 6. Modelo de dados químicos

Ficheiro: `src/data/elementosQuimicos.js`

### 6.1 Objeto de elemento

Cada entrada em `elementosQuimicos` (chave = número atómico):

```javascript
{
  simbolo: 'Fe',
  nome: 'Ferro',
  categoria: 'metal_transicao',
  neutroes: 30,
  raioAtomico: 194,    // pm
  massaAtomica: 55.85  // u
}
```

### 6.2 Categorias (`CATEGORIAS`)

| Chave | Nome | Cor (hex) |
|-------|------|-----------|
| `metal_alcalino` | Metal alcalino | `#8b5cf6` |
| `metal_alcalino_terroso` | Metal alcalino-terroso | `#f59e0b` |
| `metal_transicao` | Metal de transição | `#3b82f6` |
| `lantanideo` | Lantanídeo | `#ec4899` |
| `actinideo` | Actinídeo | `#f97316` |
| `metal_pos_transicao` | Metal pós-transição | `#22c55e` |
| `semimetal` | Semimetal | `#14b8a6` |
| `nao_metal` | Não metal | `#84cc16` |
| `halogenio` | Halogénio | `#06b6d4` |
| `gas_nobre` | Gás nobre | `#0ea5e9` |

### 6.3 Cores dos subníveis

| Subnível | Cor 3D (hex) | Uso |
|----------|--------------|-----|
| `s` | `#00ff88` | Orbitais, elétrons, legenda |
| `p` | `#4488ff` | Idem |
| `d` | `#ffcc00` | Idem |
| `f` | `#ff44aa` | Idem |

### 6.4 Configuração eletrónica

**Ordem Aufbau** (`AUFBAU_ORDER`):

```
1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p → 6s → 4f → 5d → 6p → 7s → 5f → 6d → 7p
```

**Capacidades** (`SUBLEVEL_CAPACITY`): s=2, p=6, d=10, f=14.

**Funções:**

| Função | Entrada | Saída |
|--------|---------|-------|
| `obterConfiguracaoEletronica(Z)` | Número atómico | Objeto `{ '1s': 2, '2s': 2, … }` |
| `configParaTexto(config)` | Objeto config | String `1s² 2s² 2p⁶` |

**Exceções** (`CONFIG_EXCEPCIONAIS`): Cr, Cu, Nb, Mo, Tc, Ru, Rh, Pd, Ag, La, Ce, Gd, Pt, Au, Ac, Th, Pa, U, Np, Cm.

### 6.5 Layout da tabela (`periodosTabela`)

Matriz 7×18 com números atómicos; `0` = célula vazia. Lantanídeos (57–71) e actinídeos (89–103) aparecem em linhas separadas.

---

## 7. Visualizador 3D (Three.js)

Ficheiro: `src/components/Atom3D.jsx`

### 7.1 Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `numeroAtomico` | `number` | — | Elemento a desenhar |
| `neutroes` | `number` | calculado | Nêutrons do isótopo |
| `mostrarEletrons` | `boolean` | `true` | Exibe esferas dos elétrons |
| `forcarNucleoDetalhado` | `boolean` | `false` | Força núcleo granular |
| `subniveisVisiveis` | `object` | todos `true` | Filtro s/p/d/f |
| `fundoTransparente` | `boolean` | `false` | Fundo alpha (modo RA) |
| `mostrarCoordenadas` | `boolean` | `true` | Eixos e grelha |
| `rotacaoAutomatica` | `boolean` | `false` | Rotação contínua |

### 7.2 Cena Three.js

| Elemento | Detalhe |
|----------|---------|
| Câmera | `PerspectiveCamera`, FOV 75°, posição Z inicial 520 |
| Renderer | WebGL, antialias, tone mapping ACES, sRGB |
| Grupo principal | `atomGroup` — núcleo, orbitais, elétrons, coordenadas |
| Zoom | Z entre 60 e 1000 (scroll / pinch) |

### 7.3 Iluminação (`configurarIluminacao`)

| Luz | Função |
|-----|--------|
| `HemisphereLight` | Gradiente céu/chão |
| `DirectionalLight` (principal) | Luz forte — define volume |
| `DirectionalLight` (preenchimento) | Suaviza sombras |
| `DirectionalLight` (contorno) | Rim light nas bordas |
| `DirectionalLight` (inferior) | Reflexo de baixo |
| `AmbientLight` | Base muito suave |
| `PointLight` (centro) | Realce do núcleo |

As luzes ficam **fixas na cena**; o modelo roda sob elas, reforçando a percepção 3D.

### 7.4 Partículas e geometria

| Objeto | Geometria | Material |
|--------|-----------|----------|
| Elétrons | `SphereGeometry(3, 32, 32)` | `MeshPhongMaterial` via `criarMaterialEsfera` |
| Prótons / nêutrons | Esfera dinâmica (raio variável) | Idem, cores vermelho/cinza |
| Núcleo simples | `SphereGeometry(15, 32, 32)` | Cinza, semi-transparente |
| Orbitais | Malhas por tipo s/p/d/f | `MeshPhongMaterial` translúcido |

### 7.5 Formas orbitais (simplificadas)

| Tipo | Representação visual |
|------|---------------------|
| **s** | Esfera centrada no núcleo |
| **p** | Dois lobos por eixo (x, y, z) |
| **d** | Conjunto de lobos em planos principais |
| **f** | Oito lobos distribuídos no espaço |

> São representações **educativas simplificadas**, não orbitais quânticos rigorosos.

### 7.6 Animações

| Animação | Descrição |
|----------|-----------|
| Elétrons | Órbita em coordenadas esféricas; transições com fade |
| Núcleons | Movimento browniano dentro do limite nuclear |
| Rotação automática | `atomGroup.rotation.y += 0.005` por frame (se ativa) |
| Auto-rotação idle | Desativada por defeito |

### 7.7 Coordenadas (`criarGrupoCoordenadas`)

- Linhas nos três eixos (−300 a +300).
- Sprites com etiquetas `+X` … `−Z`.
- `GridHelper` em Y = −280.
- Grupo nomeado `atom-coordinates`; preservado ao redesenhar o átomo.

### 7.8 Modo RA

- Vídeo `<video>` por baixo do canvas.
- `fundoTransparente={true}` → `scene.background = null`, alpha 0.
- Sombra radial (`ar-atom-ground-shadow`) fixa na cena (não roda com o átomo).

---

## 8. Responsividade e layouts

### Desktop (≥ 1200px)

- Tabela + painel lateral do elemento.
- Dialog 3D em janela modal centrada.
- Sem botão de câmera RA.

### Tablet / telemóvel (< 1200px)

- Drawer inferior ao selecionar elemento.
- Dialog 3D em fullscreen.
- Botão **Câmera RA** visível.
- Barra de controlos 3D com scroll horizontal se necessário.
- Safe areas (`env(safe-area-inset-*)`) no dialog e drawer.

### Tabela em mobile

- Scroll horizontal na grelha 18 colunas.
- Células com `clamp()` para texto legível.
- Sem obrigar rotação do dispositivo.

---

## 9. Desenvolvimento

### 9.1 Pré-requisitos

- **Node.js** 16 ou superior
- **npm** (incluído com Node)

### 9.2 Instalação

```bash
git clone <url-do-repositorio>
cd tabelaperiodicadinamica
npm install
```

### 9.3 Scripts npm

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento Vite (HMR) |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Serve o build localmente para teste |
| `npm run lint` | ESLint em ficheiros `.js` / `.jsx` |

### 9.4 Servidor de desenvolvimento

```bash
npm run dev
```

Abra a URL indicada (normalmente `http://localhost:5173`). Alterações em `src/` recarregam automaticamente.

### 9.5 Adicionar ou editar elementos

Edite `src/data/elementosQuimicos.js`:

1. Adicione entrada em `elementosQuimicos`.
2. Se necessário, atualize `periodosTabela`, `lantanides` ou `actinides`.
3. Para exceção eletrónica, acrescente em `CONFIG_EXCEPCIONAIS`.

### 9.6 Alterar textos de ajuda / legais

Edite `src/content/appInfoPt.js` → objeto `INFO_PAGES`.

### 9.7 Alterar tema

Edite `src/main.jsx` → `createTheme({ palette: { … } })`.

### 9.8 Ajustar visual 3D

Constantes no topo de `Atom3D.jsx`:

| Constante | Significado |
|-----------|-------------|
| `CAMERA_Z_INICIAL` | Distância inicial da câmera |
| `AXES_SIZE` | Comprimento dos eixos |
| `RAIO_ELETRON` | Tamanho das esferas dos elétrons |
| `ROTACAO_AUTOMATICA_VELOCIDADE` | Velocidade da rotação automática |
| `ZOOM_THRESHOLD_NUCLEUS` | Distância para alternar núcleo simples/detalhado |

---

## 10. Build e publicação

### 10.1 Gerar build

```bash
npm run build
```

Saída em `dist/` (HTML, JS e assets estáticos).

### 10.2 Testar build local

```bash
npm run preview
```

### 10.3 Publicação estática

O projeto é uma SPA estática. Pode ser hospedado em:

- GitHub Pages
- Netlify
- Vercel
- Qualquer servidor de ficheiros estáticos

**Modo RA:** em produção, o site deve ser servido por **HTTPS** para `getUserMedia` funcionar (exceto em `localhost`).

### 10.4 Variáveis de ambiente

Não há ficheiro `.env` nem variáveis obrigatórias. A aplicação não depende de API keys externas.

---

## 11. Limitações e notas educacionais

### 11.1 Limitações técnicas

| Aspeto | Limitação |
|--------|-----------|
| Orbitais | Formas geométricas simplificadas |
| Posições dos elétrons | Distribuição ilustrativa, não solução da função de onda |
| Nêutrons | Isótopo estável representativo; não há seletor de isótopo |
| Elementos superpesados | Dados aproximados (Z > 100) |
| Desempenho | Muitos elétrons + núcleo detalhado podem reduzir FPS |
| RA | Depende de permissões e hardware do dispositivo |

### 11.2 Precisão dos dados

Os valores servem fins **educativos**. Para trabalho científico rigoroso, consulte bases de dados especializadas (IUPAC, NIST, etc.).

### 11.3 Privacidade

A aplicação não envia dados a servidores próprios. O modo RA usa a câmera **localmente** no navegador; não há gravação nem upload implementado.

### 11.4 Navegadores recomendados

- Chrome / Edge (Chromium) — melhor suporte WebGL e câmera
- Firefox
- Safari (iOS) — RA pode exigir gestos do utilizador para permissões

---

## Referência rápida de ficheiros

| Ficheiro | Responsabilidade |
|----------|------------------|
| `src/main.jsx` | Bootstrap React + tema |
| `src/App.jsx` | Estado global, UI principal, dialog 3D |
| `src/components/TabelaPeriodica.jsx` | Grelha periódica |
| `src/components/Atom3D.jsx` | Motor 3D completo |
| `src/components/AppMenu.jsx` | Navegação e páginas info |
| `src/data/elementosQuimicos.js` | Dados e lógica química |
| `src/content/appInfoPt.js` | Textos PT do menu |
| `vite.config.js` | Configuração do bundler |

---

*Documento atualizado para refletir o estado atual da aplicação. Para um resumo breve, consulte o [README.md](../README.md) na raiz do projeto.*
