# Tabela Periódica Dinâmica

Aplicativo educacional interativo para estudo da Tabela Periódica e visualização de modelo atômico 3D com orbitais por subnível.

📖 **Documentação completa:** [docs/GUIA_COMPLETO.md](docs/GUIA_COMPLETO.md) — guia de utilização, stack tecnológica, arquitetura, dados químicos e desenvolvimento.

## Funcionalidades

### Tabela periódica interativa
- Exibe os **118 elementos**, incluindo séries de **lantanídeos** e **actinídeos**.
- Células coloridas por **categoria química** (metais, halogênios, gases nobres etc.).
- Seleção de elemento com destaque visual.
- Legenda de categorias e linhas dedicadas para lantanídeos/actinídeos.

### Painel de informações do elemento
- Mostra: símbolo, nome, número atômico, nêutrons, massa atômica, raio atômico e categoria.
- Exibe a **configuração eletrônica** por ordem crescente de energia (**Pauling** / Aufbau).
- Inclui legenda de cores para subníveis (**s, p, d, f**).
- Campo de entrada para alterar o número atômico manualmente.
- Botão para abrir o **modelo 3D** do elemento selecionado.

### Modelo atômico 3D (Three.js)
- Núcleo em dois modos:
  - **Simples** (esfera única) quando distante.
  - **Detalhado** (prótons e nêutrons animados) quando aproximado ou forçado por botão.
- Orbitais e elétrons distribuídos por subnível com animação contínua.
- Elétrons, prótons e nêutrons renderizados como **esferas lisas** com o mesmo tipo de material e iluminação.
- Formas orbitais:
  - `s`: esférico
  - `p`: halteres em eixos principais
  - `d`: distribuição lobular simplificada
  - `f`: distribuição multi-lobular simplificada
- **Iluminação em camadas** (hemisférica, principal, preenchimento, contorno e luz no núcleo) para dar profundidade e volume ao modelo.
- O átomo inicia **parado**; a rotação é opcional e controlada pelo utilizador.

### Sistema de coordenadas 3D
- Eixos **X, Y e Z** com extensão positiva e negativa a partir da origem.
- Etiquetas nos seis extremos: `+X`, `−X`, `+Y`, `−Y`, `+Z`, `−Z`.
- Grelha de referência no plano horizontal.
- As coordenadas **rodam com o modelo** (mesmo grupo de transformação do átomo).
- Podem ser ocultadas ou exibidas pelo botão dedicado no visualizador.

### Controles no visualizador 3D
- Diálogo em **ecrã completo** com barra de ferramentas **sobreposta** e zoom lateral.
- Símbolo do elemento no canto superior direito da cena.
- Botões activos destacados a **verde**.
- **Elétrons**, **Núcleo**, **Rotação**, **Eixos**, menu **Subníveis** (`s`, `p`, `d`, `f`).
- Interação: arrastar (rotação), scroll/pinch (zoom), barra lateral de zoom.

### Modo RA em celular (câmera)
- Disponível no diálogo 3D em telas móveis.
- Ativa vídeo da câmera traseira como fundo do modelo.
- O átomo é renderizado com fundo transparente sobre a câmera.
- Inclui **sombra de contato do átomo** (fixa na cena) para melhor percepção espacial.

### Menu superior e ajuda (☰)

Menu lateral com secções **Como utilizar** e **Informação**:

| Item | Descrição |
|------|-----------|
| Início rápido | Primeiros passos |
| Tabela periódica | Seleção, cores, scroll mobile |
| Modelo 3D | Controlos e gestos |
| Telemóvel e tablet | Layouts adaptados |
| Dicas de desempenho | Optimizar o 3D |
| Termos / Privacidade / Sobre | Informação legal e projecto |

Conteúdo em `src/content/appInfoPt.js`; documentação técnica em [docs/GUIA_COMPLETO.md](docs/GUIA_COMPLETO.md).

### Responsividade
- Layout adaptado para desktop, tablet e celular.
- Em telas grandes, painel de elemento fica em área lateral fixa.
- Em telas pequenas, informações do elemento são exibidas em Drawer inferior.
- Diálogo 3D em ecrã completo em telemóvel e tablet.
- A tabela em retrato móvel funciona no fluxo normal, com **scroll horizontal** quando necessário (sem exigir rotação do aparelho).
- Células da tabela ajustadas para melhor leitura no celular.

### Regras eletrônicas
- Construção eletrônica baseada na regra de Aufbau.
- Inclui principais exceções conhecidas (como Cr, Cu, Ag, Au, entre outras).

## Estrutura do projeto

```
src/
├── main.jsx                 # Entrada React + tema MUI (claro, verde)
├── App.jsx                  # Orquestração: tabela, painel, diálogo 3D
├── components/
│   ├── TabelaPeriodica.jsx  # Grelha periódica e legenda
│   ├── Atom3D.jsx           # Visualização Three.js
│   └── AppMenu.jsx          # Menu lateral e páginas informativas
├── data/
│   └── elementosQuimicos.js # Dados dos 118 elementos e lógica Aufbau
└── content/
    └── appInfoPt.js         # Textos de ajuda e legais (PT)
```

## Instalação e execução

### Pré-requisitos
- Node.js 16+
- npm

### Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

Depois de `npm run dev`, abra a URL exibida no terminal (normalmente `http://localhost:5173`).

## Tecnologias

- React 18
- Vite
- Material UI (MUI) — tema claro
- Three.js

## Recomendação de uso

Para dispositivos mais modestos, caso o 3D fique pesado, reduza elementos visuais no visualizador (por exemplo, ocultando elétrons, coordenadas ou subníveis não necessários para o estudo).
