import { elementosQuimicos, periodosTabela, lantanides, actinides, CATEGORIAS } from '../data/elementosQuimicos';
import './TabelaPeriodica.css';

export default function TabelaPeriodica({ numeroAtomico, onSelecionarElemento, elementoSelecionado, elementoInfo }) {
  const getCorCategoria = (categoria) => CATEGORIAS[categoria]?.cor ?? '#3a3a3a';

  const criarCelula = (num, keyPrefix = '') => {
    if (!num) {
      return (
        <div key={`${keyPrefix}empty`} className="periodic-table-cell empty" />
      );
    }

    const elemento = elementosQuimicos[num];
    if (!elemento) return null;

    const isSelected = elementoSelecionado === num;
    const corCategoria = getCorCategoria(elemento.categoria);

    return (
      <div
        key={`${keyPrefix}${num}`}
        className={`periodic-table-cell ${isSelected ? 'selected' : ''}`}
        style={{ backgroundColor: corCategoria }}
        onClick={() => onSelecionarElemento(num)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelecionarElemento(num)}
      >
        <div className="element-number">{num}</div>
        <div className="element-symbol-table">{elemento.simbolo}</div>
        <div className="element-name-table">{elemento.nome}</div>
      </div>
    );
  };

  const celulasPrincipais = periodosTabela.flatMap((periodo, pIdx) =>
    periodo.map((num, cIdx) => criarCelula(num, `p${pIdx}-c${cIdx}-`)).filter(Boolean)
  );

  return (
    <div className={`periodic-table-container ${elementoInfo ? 'has-element-info' : ''}`}>
      {elementoInfo && (
        <aside className="element-info-sidebar" aria-label="Dados do elemento selecionado">
          {elementoInfo}
        </aside>
      )}
      <div className="periodic-table-main">
        <h2 className="table-title">Tabela Periódica</h2>
        <p className="periodic-table-portrait-hint" aria-live="polite">
          Modo retrato: a tabela foi girada para usar melhor a largura do ecrã. Em paisagem, o layout é normal.
        </p>
        <div className="periodic-table-responsive">
          <div className="periodic-table-rotate-inner">
            <div className="periodic-table">
              {celulasPrincipais}
            </div>
            <div className="legend">
              <strong>Lantanídeos e Actinídeos:</strong>
              <div className="lantanides-actinides">
                <div className="lantanides-row">
                  <div className="label-cell">La:</div>
                  {lantanides.map((num) => criarCelula(num, 'la-'))}
                </div>
                <div className="actinides-row">
                  <div className="label-cell">Ac:</div>
                  {actinides.map((num) => criarCelula(num, 'ac-'))}
                </div>
              </div>
              <div className="categorias-legend">
                <strong>Tipos de elementos:</strong>
                <div className="categorias-cores">
                  {Object.entries(CATEGORIAS).map(([key, { nome, cor }]) => (
                    <span key={key} className="categoria-item" style={{ backgroundColor: cor }}>
                      {nome}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
