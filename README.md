# Tabela Periódica Dinâmica

Aplicação web educacional em **português** para explorar os **118 elementos** da tabela periódica, consultar propriedades químicas e comparar **quatro modelos atómicos** em visualização 3D interactiva — tudo no navegador, sem registo nem servidor.

📖 **Documentação completa:** [docs/GUIA_COMPLETO.md](docs/GUIA_COMPLETO.md) — utilização, stack, arquitectura, dados químicos, desenvolvimento e publicação.

| Aspeto | Detalhe |
|--------|---------|
| Idioma | Português (PT) |
| Tema | Claro (Material UI — verde `#2e7d32`) |
| Elemento inicial | Carbono (Z = 6) |
| Configuração electrónica | Ordem crescente de energia (**Pauling** / Aufbau) |
| Dados químicos | Isótopo estável; fins educativos |

---

## Funcionalidades

### Tabela periódica interactiva

- **118 elementos**, incluindo **lantanídeos** (La:) e **actinídeos** (Ac:).
- Células coloridas por **categoria química** (metal alcalino, halogénio, gás nobre, etc.).
- Selecção com **borda amarela** e brilho.
- Legenda «Tipos de elementos» abaixo da grelha.
- **Mobile/tablet:** scroll horizontal na grelha (18 colunas) e scroll vertical na página; adapta-se a retrato e paisagem.

### Painel do elemento seleccionado

Aparece **à esquerda** no desktop (≥ 1200px) ou em **drawer inferior** no telemóvel/tablet.

| Campo | Conteúdo |
|-------|----------|
| Símbolo, nome, categoria | Identificação e tipo na tabela |
| Nº atómico, nêutrons, massa, raio | Propriedades do isótopo estável |
| Configuração electrónica | Notação `1s² 2s² …` por ordem **Pauling** (ex.: Fe `…4s² 3d⁶`) |
| Legenda s / p / d / 4f / 5f | Cores dos subníveis no modelo quântico |
| Campo «Nº atómico» | Alterar elemento activo (1–118) |

#### Modelos atómicos (ordem histórica)

Quatro botões abrem o visualizador 3D em ecrã completo:

| Botão | Ano | Representação |
|-------|-----|---------------|
| **Dalton** | 1803 | Esfera sólida indivisível (cor da categoria) |
| **Thomson** | 1904 | «Pudim de passas» — carga positiva difusa + elétrons |
| **Rutherford-Bohr** | 1913 | Núcleo compacto + elétrons em órbitas circulares |
| **Quântico** | 1926+ | Núcleo, orbitais s/p/d/f e elétrons animados |

História e detalhes de cada modelo: menu ☰ → **Sobre**.

---

### Visualizador 3D (Three.js)

Diálogo em **ecrã completo** (desktop e mobile), fundo `#263238`, barra de ferramentas **sobreposta** e zoom flutuante à direita.

#### Identificação na cena

- Título **«Modelo de …»** na barra superior (ex.: Modelo de Dalton).
- Símbolo grande, número atómico e nome no canto superior direito.

#### Modelo quântico

- **Núcleo** simples (afastado) ou **detalhado** (prótons/nêutrons animados).
- Orbitais **s, p, d, f** com formas educativas simplificadas; cores distintas para **4f** (rosa) e **5f** (laranja).
- Elétrons, prótons e nêutrons como esferas com iluminação em camadas.
- Átomo **parado** ao abrir; rotação opcional.

#### Modelos históricos (Dalton, Thomson, Bohr)

- Visualizações didácticas simplificadas por época.
- **Rotação** e **eixos** disponíveis; elétrons animados (Thomson e Bohr).
- Bohr: elétrons alinhados às linhas circulares das órbitas.

#### Coordenadas 3D (todos os modelos)

- Eixos **X** vermelho, **Y** verde, **Z** azul com etiquetas `+X` … `−Z`.
- Grelha horizontal de referência.
- Rodam **junto com o modelo**; botão **Eixos / Ocultar eixos** em todos os modelos.

#### Controlos

| Controlos | Disponível |
|-----------|------------|
| Elétrons, Núcleo, Subníveis ▾ | Só modelo **Quântico** |
| Rotação, Eixos | **Todos** os modelos |
| Câmera RA | Mobile — todos os modelos |
| Zoom (scroll, pinch, barra lateral) | **Todos** |
| Botões activos a **verde** | Barra sobreposta |

#### Modo RA (telefóvel/tablet)

- Câmara traseira como fundo; átomo com fundo transparente.
- Sombra de contacto no «chão» da cena.
- Requer `localhost` ou **HTTPS** e permissão de câmara.

---

### Menu e ajuda (☰)

Secções **Como utilizar** e **Informação**, com diálogos formatados:

| Item | Conteúdo |
|------|----------|
| Início rápido | Primeiros passos |
| Tabela periódica | Selecção, Pauling, scroll mobile |
| Modelo 3D | Controlos, gestos, RA, eixos |
| Telemóvel e tablet | Drawer, layouts, menu |
| Dicas de desempenho | Optimizar FPS no 3D |
| Termos / Privacidade | Informação legal |
| Sobre | Evolução dos modelos atómicos, tecnologias, docs |

Textos em `src/content/appInfoPt.js`.

---

### Responsividade

| Dispositivo | Comportamento |
|-------------|---------------|
| Desktop (≥ 1200px) | Tabela + cartão lateral do elemento |
| Telemóvel / tablet | Drawer inferior; 3D fullscreen; barra com scroll horizontal |
| Paisagem mobile | Painel compacto em duas colunas; tabela com scroll se necessário |

---

### Dados químicos

- Regra de **Aufbau** com excepções (`Cr`, `Cu`, lantanídeos, actinídeos, etc.).
- Configuração por **ordem de energia (Pauling)**, não agrupada só por camada.
- **10 categorias** com cores na tabela e no cartão do elemento.
- Valores educativos — para rigor científico consulte IUPAC, NIST, etc.

---

## Estrutura do projecto

```
tabelaperiodicadinamica/
├── docs/
│   └── GUIA_COMPLETO.md       # Documentação de referência
├── src/
│   ├── main.jsx               # React + tema MUI (claro)
│   ├── App.jsx                # Estado global, painel, diálogo 3D
│   ├── components/
│   │   ├── TabelaPeriodica.jsx
│   │   ├── TabelaPeriodica.css
│   │   ├── Atom3D.jsx         # Modelo quântico (Three.js)
│   │   ├── AtomModeloHistorico.jsx  # Dalton, Thomson, Bohr
│   │   ├── coordenadas3D.js   # Eixos e grelha partilhados
│   │   └── AppMenu.jsx        # Menu ☰ e páginas de ajuda
│   ├── data/
│   │   ├── elementosQuimicos.js   # 118 elementos, Aufbau, cores
│   │   └── tiposModeloAtomico.js  # Tipos e ordem histórica
│   └── content/
│       └── appInfoPt.js       # Textos PT do menu
├── package.json
└── vite.config.js
```

---

## Instalação e execução

### Pré-requisitos

- Node.js **16+**
- npm

### Comandos

```bash
git clone <url-do-repositorio>
cd tabelaperiodicadinamica
npm install
npm run dev      # http://localhost:5173
npm run build    # saída em dist/
npm run preview  # testar build local
npm run lint
```

---

## Tecnologias

| Pacote | Uso |
|--------|-----|
| **React 18** | Interface e estado |
| **Vite 4** | Dev server, HMR, build |
| **Material UI 7** | Componentes, tema claro |
| **Three.js** | Cena 3D WebGL |
| **PropTypes** | Validação de props |

---

## Publicação

SPA estática — pode ser hospedada em GitHub Pages, Netlify, Vercel ou qualquer servidor de ficheiros. **Modo RA** em produção exige **HTTPS** (excepto `localhost`).

---

## Limitações educativas

- Orbitais e modelos históricos são **representações simplificadas**, não simulações rigorosas.
- Sem selector de isótopo; dados aproximados para Z > 100.
- Desempenho pode reduzir com muitos elétrons + orbitais f + núcleo detalhado.

**Dica:** oculte elétrons, eixos ou filtre subníveis para melhor fluidez em dispositivos modestos.

---

## Licença e créditos

Projecto educacional open source. Adapte textos legais em `appInfoPt.js` antes de uso público.
