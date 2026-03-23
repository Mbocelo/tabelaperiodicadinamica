# Tabela Periódica Dinâmica — Manual do Professor

## Modelo Atômico 3D Interativo

Este aplicativo é uma ferramenta educacional para auxiliar no ensino de Química, permitindo a exploração visual da tabela periódica e do modelo atômico em três dimensões, com configuração eletrônica por subníveis (s, p, d, f).

---

## Instalação e execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Comandos

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Gerar versão para produção
npm run build

# Visualizar a versão de produção localmente
npm run preview
```

Após executar `npm run dev`, abra o navegador em `http://localhost:5173` (ou a URL indicada no terminal).

---

## Interface principal

### 1. Tabela periódica
- A tabela exibe os **118 elementos químicos**, incluindo lantanídeos e actinídeos.
- As cores indicam o **tipo de elemento** (metal alcalino, metal de transição, halogênio, gás nobre, etc.).
- A **legenda** na parte inferior explica cada categoria.
- O elemento selecionado aparece com borda amarela/verde em destaque.

### 2. Painel de informações do elemento
Ao clicar em um elemento, surge um painel à esquerda com:
- **Símbolo e nome** do elemento
- **Número atômico** e **número de nêutrons** (isótopo mais estável)
- **Massa atômica** (u) e **raio atômico** (pm)
- **Tipo/categoria** do elemento
- **Configuração eletrônica** completa (ex.: 1s² 2s² 2p² para carbono)
- **Legenda de subníveis** (s, p, d, f) com cores correspondentes
- Campo para alterar o número atômico e botão **3D** para abrir o modelo atômico

---

## Modelo atômico 3D

### Como abrir
- Clique em um elemento na tabela e, em seguida, no botão **3D** no painel de informações,  
**ou**
- Digite o número atômico (1 a 118) e clique em **3D**.

### Representação visual

#### Núcleo
- **Zoom distante:** núcleo representado como uma única esfera cinza.
- **Zoom próximo** (scroll para perto ou botão “Mostrar Núcleo”):
  - **Prótons** em vermelho
  - **Nêutrons** em cinza
  - Partículas animadas simulando o movimento dentro do núcleo.

#### Elétrons e orbitais
- Os elétrons são distribuídos por **subníveis** (s, p, d, f), de acordo com a regra de Aufbau.
- Cores por subnível:
  - **s:** verde (#00ff88)
  - **p:** azul (#4488ff)
  - **d:** amarelo (#ffcc00)
  - **f:** rosa (#ff44aa)
- Formas dos orbitais:
  - **s:** esfera
  - **p:** halteres nos eixos x, y e z
  - **d:** cinco orbitais com lobos em diferentes orientações
  - **f:** oito lobos em arranjo cúbico simplificado
- Os elétrons animam-se em órbitas com efeito de transição (“teleporte”) entre posições, representando o caráter probabilístico do modelo quântico.

---

## Controles do modelo 3D

Na barra de ferramentas acima do canvas 3D:

| Controle | Função |
|----------|--------|
| **Ocultar / Mostrar Elétrons** | Esconde ou exibe os elétrons, mantendo apenas os orbitais (útil para focar na geometria). |
| **Mostrar / Esconder Núcleo** | Alterna entre núcleo simples (esfera) e núcleo detalhado (prótons e nêutrons individuais), independente do zoom. |
| **Subníveis ▾** | Menu com checkboxes para exibir ou ocultar cada tipo de subnível (s, p, d, f). Permite destacar apenas os orbitais desejados. |

### Interação com o modelo
- **Arrastar com o mouse:** rotacionar o átomo
- **Scroll (roda do mouse):** zoom para perto ou para longe (para ver o núcleo detalhado, aproxime bastante)
- **Rotação automática:** o modelo gira lentamente por padrão

---

## Exceções à regra de Aufbau

O simulador considera as principais **exceções à regra de Aufbau**, como:
- Cromo (Cr), Cobre (Cu), Paládio (Pd), Prata (Ag)
- Lantânio (La), Cério (Ce), Gadolínio (Gd)
- Platina (Pt), Ouro (Au)
- Actínio (Ac), Tório (Th), Protactínio (Pa), Urânio (U), Neptúnio (Np), Cúrio (Cm)

A configuração eletrônica exibida corresponde a essas exceções.

---

## Sugestões de uso pedagógico

1. **Introdução à estrutura eletrônica:** usar elementos simples (H, He, C) para explicar camadas e subníveis.
2. **Regra de Aufbau:** comparar carbono (6) e oxigênio (8) e discutir o preenchimento de 2p.
3. **Elementos de transição:** elementos como Fe (26) ou Cu (29) permitem trabalhar orbitais d e exceções.
4. **Lantanídeos e actinídeos:** usar o menu de subníveis para destacar orbitais f.
5. **Núcleo atômico:** aproximar o zoom ou usar “Mostrar Núcleo” para discutir prótons, nêutrons e isótopos.
6. **Tabela periódica:** explorar as cores das categorias e a relação com a configuração eletrônica.
7. **Projeção em sala:** usar em datashow ou tela compartilhada para explicações ao vivo.

---

## Requisitos técnicos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- JavaScript habilitado
- Resolução mínima sugerida: 1024×768
- Para performance ideal em dispositivos mais antigos, considere ocultar elétrons ou alguns subníveis quando o modelo estiver pesado.

---

## Tecnologias utilizadas

- **React** + **Vite** — interface
- **Material UI** — componentes visuais
- **Three.js** — renderização 3D

---

*Desenvolvido para fins educacionais. Dados baseados em referências científicas consolidadas.*
