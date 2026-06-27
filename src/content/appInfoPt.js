/** Textos informativos da aplicação (substitua termos legais por versão revisada por advogado se necessário). */

export const INFO_PAGES = {
  manual: {
    title: 'Início rápido',
    intro:
      'A Tabela Periódica Dinâmica permite explorar os 118 elementos, consultar propriedades químicas e visualizar um modelo atómico 3D interativo — tudo no navegador, sem registo.',
    sections: [
      {
        heading: 'Primeiros passos',
        bullets: [
          'Abra a aplicação no navegador (ex.: http://localhost:5173 em desenvolvimento).',
          'Toque ou clique num elemento colorido na tabela.',
          'Leia os dados no painel que aparece (lateral no desktop, inferior no telemóvel).',
          'Use os botões «Modelos atómicos» no painel do elemento para abrir as visualizações 3D.',
          'Abra o menu ☰ para mais guias de utilização.'
        ]
      },
      {
        heading: 'Elemento inicial',
        text: 'Ao abrir, o elemento activo é o Carbono (Z = 6). Pode mudar a qualquer momento clicando noutra célula ou digitando um número entre 1 e 118 no campo «Nº atómico».'
      },
      {
        heading: 'Documentação completa',
        text: 'Para detalhes técnicos, arquitectura e desenvolvimento, consulte o ficheiro docs/GUIA_COMPLETO.md incluído no repositório do projecto.'
      }
    ]
  },

  tabela: {
    title: 'Tabela periódica',
    intro: 'A grelha principal mostra os 118 elementos organizados por períodos e grupos, com cores por categoria química.',
    sections: [
      {
        heading: 'Seleccionar elementos',
        bullets: [
          'Clique ou toque numa célula colorida para seleccionar o elemento.',
          'A célula activa fica com borda amarela e brilho.',
          'Células vazias (espaços entre blocos) não são clicáveis.'
        ]
      },
      {
        heading: 'Categorias e cores',
        bullets: [
          'Cada cor representa um tipo de elemento (metal alcalino, halogénio, gás nobre, etc.).',
          'Consulte a legenda «Tipos de elementos» abaixo da tabela.',
          'Lantanídeos (La:) e actinídeos (Ac:) aparecem em linhas dedicadas.'
        ]
      },
      {
        heading: 'Configuração electrónica',
        text: 'No painel do elemento, a configuração é apresentada por nível de energia (camada principal n): subníveis agrupados por n, na ordem s → p → d → f. Exemplo: o ferro aparece como …3d⁶ 4s², com o 3d antes do 4s dentro da mesma camada electrónica.'
      },
      {
        heading: 'Navegação em ecrãs pequenos',
        bullets: [
          'Em telemóvel ou tablet, a grelha tem 18 colunas — deslize horizontalmente se não couber na largura.',
          'Em retrato, percorra a página verticalmente para ver todos os períodos, lantanídeos e legenda.',
          'Não é necessário rodar fisicamente o aparelho; o scroll adapta-se à orientação.'
        ]
      }
    ]
  },

  modelo3d: {
    title: 'Modelo 3D',
    intro:
      'O visualizador mostra o átomo com núcleo, orbitais por subnível (s, p, d, f) e elétrons animados. Abre em ecrã completo com barra de ferramentas sobreposta. No modelo quântico, os orbitais têm aspecto de nuvem de probabilidade e os elétrons movem-se dentro do lóbulo correspondente.',
    sections: [
      {
        heading: 'Barra de ferramentas (topo)',
        bullets: [
          'Elétrons — mostra ou oculta as esferas dos elétrons (etiqueta e⁻).',
          'Núcleo — força o modo detalhado (prótons p⁺ e nêutrons n individuais).',
          'Rotação — liga ou desliga a rotação automática contínua.',
          'Eixos — mostra ou oculta coordenadas X/Y/Z e grelha.',
          'Subníveis ▾ — filtra tipos s, p, d, f (órbitais e elétrons).',
          'Níveis ▾ — filtra pela camada principal n (ex.: só n=2); só no modelo quântico.',
          'Orbitais ▾ — filtra orientações (pₓ, pᵧ, d_xy, orbitais f, …); só no modelo quântico.',
          'Níveis ▾ — no modelo Bohr, destaca uma camada de órbita (n=1, n=2, …).',
          'Câmera (só mobile) — activa realidade aumentada com a câmara traseira.'
        ]
      },
      {
        heading: 'Gestos e zoom',
        bullets: [
          'Arrastar (rato ou dedo) — roda o modelo no espaço.',
          'Scroll do rato ou pinch — aproxima ou afasta.',
          'Barra de zoom lateral (direita) — slider vertical; + no topo, − na base.',
          'Zoom máximo no átomo — abre automaticamente a vista ampliada só do núcleo.',
          'O símbolo do elemento aparece no canto superior direito da cena.'
        ]
      },
      {
        heading: 'Núcleo',
        text: 'Com a câmara afastada vê-se uma esfera simples. Ao aproximar o zoom ou activar «Núcleo», aparecem prótons (vermelho, p⁺) e nêutrons (cinza, n) com movimento suave. Ao atingir o zoom máximo, abre-se uma segunda tela dedicada ao núcleo, com zoom extra para examinar cada núcleon — use «Átomo» ou afaste o zoom ao máximo para voltar.'
      },
      {
        heading: 'Orbitais e elétrons (modelo quântico)',
        bullets: [
          'Orbitais desenhados como nuvens semi-transparentes (densidade de probabilidade).',
          'Elétrons (e⁻) animados dentro do orbital ou lóbulo a que pertencem — não vagueiam por todo o átomo.',
          'Lóbulos de fase negativa aparecem num tom azulado (como nos diagramas de química).',
          'Combine Subníveis, Níveis e Orbitais para isolar um subnível (ex.: só 2pₓ).'
        ]
      },
      {
        heading: 'Coordenadas',
        bullets: [
          'Eixo X — vermelho; Y — verde; Z — azul.',
          'Etiquetas +X, −X, +Y, −Y, +Z, −Z nos extremos.',
          'Rodam junto com o átomo (não ficam fixas à câmara).'
        ]
      },
      {
        heading: 'Modo RA (telefóvel/tablet)',
        bullets: [
          'Toque em «Câmera» e autorize o acesso quando o navegador pedir.',
          'O vídeo da câmara traseira passa a ser o fundo; o átomo renderiza-se por cima.',
          'Requer HTTPS ou localhost. Se falhar, o modo desliga-se automaticamente.'
        ]
      },
      {
        heading: 'Botões activos',
        text: 'Os controlos ligados ficam destacados a verde na barra sobreposta, para saber facilmente o que está activo.'
      }
    ]
  },

  mobile: {
    title: 'Telemóvel e tablet',
    intro: 'A interface adapta-se automaticamente ao tamanho do ecrã e à orientação do dispositivo.',
    sections: [
      {
        heading: 'Painel do elemento',
        bullets: [
          'Desktop (≥ 1200px): cartão fixo à esquerda da tabela.',
          'Telemóvel / tablet: painel (drawer) que sobe da parte inferior ao seleccionar um elemento.',
          'Feche o painel tocando fora dele ou no botão de fechar.',
          'Em paisagem no telemóvel, o painel usa layout compacto em duas colunas.'
        ]
      },
      {
        heading: 'Tabela em retrato',
        bullets: [
          'Células dimensionadas para leitura confortável dos símbolos.',
          'Deslize horizontalmente na grelha se necessário.',
          'Deslize verticalmente na página para ver lantanídeos, actinídeos e legenda.'
        ]
      },
      {
        heading: 'Tabela em paisagem',
        text: 'Com o aparelho deitado, aproveita-se mais largura; a grelha pode ainda requerer scroll horizontal em ecrãs estreitos.'
      },
      {
        heading: 'Modelo 3D em mobile',
        bullets: [
          'Abre sempre em ecrã completo.',
          'Barra de controlos no topo — deslize horizontalmente se não couberem todos os botões.',
          'Botão ✕ no canto para fechar.',
          'Barra de zoom sempre visível à direita.'
        ]
      },
      {
        heading: 'Menu lateral',
        text: 'Toque em ☰ no canto superior esquerdo. O menu abre por cima do conteúdo; escolha um item de ajuda ou informação legal.'
      }
    ]
  },

  dicas: {
    title: 'Dicas de desempenho',
    intro: 'Em dispositivos mais lentos ou com muitos elétrons visíveis, siga estas sugestões para melhor fluidez.',
    sections: [
      {
        heading: 'No visualizador 3D',
        bullets: [
          'Oculte elétrons se só precisar de ver a forma dos orbitais.',
          'Desligue os eixos de coordenadas.',
          'Filtre subníveis, níveis (n) ou orbitais individuais — menos partículas visíveis = melhor FPS.',
          'Evite o modo RA em aparelhos antigos.',
          'Desactive a rotação automática se notar lentidão.'
        ]
      },
      {
        heading: 'Elementos pesados',
        text: 'Elementos com muitos elétrons e subníveis f (lantanídeos, actinídeos) exigem mais recursos gráficos. Filtrar subníveis reduz significativamente a carga.'
      },
      {
        heading: 'Navegador recomendado',
        text: 'Chrome, Edge ou Safari recentes oferecem melhor desempenho WebGL. Mantenha o navegador actualizado.'
      }
    ]
  },

  terms: {
    title: 'Termos de uso',
    intro: 'Ao utilizar esta aplicação («Serviço»), concorda em fazê-lo de forma responsável e de acordo com estes termos.',
    sections: [
      {
        heading: '1. Natureza do Serviço',
        text: 'O Serviço oferece uma tabela periódica interactiva e visualizações educativas. Os dados apresentados têm carácter informativo e podem conter imprecisões ou ficar desactualizados.'
      },
      {
        heading: '2. Uso permitido',
        text: 'É permitido usar o Serviço para fins pessoais, educacionais e não comerciais, salvo acordo em contrário.'
      },
      {
        heading: '3. Limitação de responsabilidade',
        text: 'O Serviço é fornecido «como está». Não nos responsabilizamos por decisões tomadas com base exclusiva nas informações exibidas.'
      },
      {
        heading: '4. Alterações',
        text: 'Podemos alterar funcionalidades ou estes termos; o uso continuado após alterações constitui aceitação.'
      },
      {
        heading: '5. Contacto',
        text: 'Para questões sobre estes termos, utilize os canais indicados pelo responsável pelo projecto.'
      }
    ]
  },

  privacy: {
    title: 'Política de privacidade',
    intro: 'Esta aplicação foi concebida para funcionar no seu dispositivo com o mínimo de recolha de dados.',
    sections: [
      {
        heading: 'Dados locais',
        text: 'Preferências ou estado podem ser guardados apenas no seu navegador (por exemplo, sessão), sem envio automático a servidores nossos, salvo se a aplicação for integrada noutro sistema que o faça.'
      },
      {
        heading: 'Sem conta de utilizador',
        text: 'Não existe registo de utilizador; não tratamos dados de identificação pessoal através desta interface.'
      },
      {
        heading: 'Câmara (modo RA)',
        text: 'O modo de realidade aumentada acede à câmara traseira localmente no navegador. Não há gravação, armazenamento nem envio de vídeo implementado pela aplicação.'
      },
      {
        heading: 'Terceiros',
        text: 'Componentes ou plataformas de alojamento podem ter as suas próprias políticas; consulte a documentação do serviço onde a aplicação está publicada.'
      },
      {
        heading: 'Actualizações',
        text: 'Reservamo-nos o direito de actualizar esta política. Para exercer direitos de protecção de dados aplicáveis na sua região, contacte o responsável pelo tratamento indicado no projecto.'
      }
    ]
  },

  about: {
    title: 'Sobre',
    intro:
      'Tabela Periódica Dinâmica — aplicação educacional para explorar os 118 elementos químicos e comparar a evolução dos modelos atómicos ao longo da história da ciência, com visualizações 3D interactivas.',
    sections: [
      {
        heading: 'Modelos atómicos disponíveis',
        text: 'No painel «Elemento seleccionado», a secção «Modelos atómicos» apresenta quatro representações por ordem cronológica. Cada botão abre o visualizador em ecrã completo para o elemento activo (número atómico 1–118).'
      },
      {
        heading: 'Dalton (1803)',
        bullets: [
          'Autor: John Dalton — modelo da esfera sólida indivisível.',
          'Ideia central: cada elemento é formado por átomos idênticos, maciços e indestrutíveis.',
          'Na aplicação: esfera sólida colorida conforme a categoria do elemento; o tamanho varia ligeiramente com Z.',
          'Limite histórico: não explica a electricidade, a radioactividade nem a estrutura interna.'
        ]
      },
      {
        heading: 'Thomson (1904)',
        bullets: [
          'Autor: J. J. Thomson — modelo do «pudim de passas» (plum pudding).',
          'Ideia central: carga positiva difusa com elétrons (raízes) incrustados no interior.',
          'Na aplicação: esfera positiva translúcida com elétrons azuis distribuídos e animados.',
          'Limite histórico: não prevê um núcleo compacto; foi refutado pelo experimento de Rutherford (1911).'
        ]
      },
      {
        heading: 'Rutherford-Bohr (1911 / 1913)',
        bullets: [
          'Rutherford: núcleo pequeno, denso e positivo; quase toda a massa concentrada no centro.',
          'Bohr (1913): elétrons em órbitas circulares quantizadas, com níveis de energia discretos.',
          'Na aplicação: núcleo vermelho + anéis de órbita + elétrons a circular por camadas (2, 8, 18…). Menu Níveis ▾ para destacar uma camada n.',
          'Limite histórico: não explica completamente elementos com muitos elétrons nem a forma dos orbitais.'
        ]
      },
      {
        heading: 'Quântico (déc. 1920 — actual)',
        bullets: [
          'Base: mecânica quântica (Schrödinger, Heisenberg, Pauli, entre outros).',
          'Ideia central: elétrons descritos por orbitais (probabilidade), subníveis s, p, d e f.',
          'Na aplicação: núcleo detalhado (p⁺/n), orbitais esfumaçados, elétrons e⁻ dentro dos lóbulos, filtros Subníveis/Níveis/Orbitais, vista ampliada do núcleo ao zoom máximo, coordenadas 3D.',
          'Configuração electrónica no painel: por nível de energia (camada principal n).'
        ]
      },
      {
        heading: 'Nota educativa',
        text: 'Todas as visualizações 3D são representações didácticas simplificadas, não simulações rigorosas da função de onda. Servem para comparar como a compreensão do átomo evoluiu ao longo do tempo.'
      },
      {
        heading: 'Tecnologias',
        bullets: [
          'React 18 + Vite',
          'Material UI (tema claro, verde primário)',
          'Three.js (visualização WebGL)',
          '118 elementos com dados químicos educativos'
        ]
      },
      {
        heading: 'Conteúdos e dados',
        text: 'Os textos de ajuda e legais são informativos; adapte-os ao seu contexto antes de uso público. Os valores químicos servem fins educativos — para trabalho científico rigoroso consulte bases especializadas (IUPAC, NIST).'
      },
      {
        heading: 'Documentação',
        text: 'Guia completo de utilização, arquitectura e desenvolvimento: docs/GUIA_COMPLETO.md no repositório do projecto.'
      }
    ]
  }
};
