import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Paper,
  Typography,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import ScienceIcon from '@mui/icons-material/Science';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Atom3D from './components/Atom3D';
import { AppMenuBar } from './components/AppMenu';
import TabelaPeriodica from './components/TabelaPeriodica';
import {
  elementosQuimicos,
  CATEGORIAS,
  obterConfiguracaoEletronica,
  configParaTexto,
  SUBLEVEL_COLORS_HEX
} from './data/elementosQuimicos';
import './App.css';

const SUBNIVEIS_INITIAL = { s: true, p: true, d: true, f: true };

function ElementoInfoCard({
  elemento,
  numeroAtomico,
  onNumeroAtomicoChange,
  onAbrir3D,
  fullWidth = false,
  mostrarBotaoFechar = false,
  onFechar
}) {
  const categoriaCor = CATEGORIAS[elemento.categoria]?.cor ?? '#4CAF50';
  const configTexto = configParaTexto(obterConfiguracaoEletronica(numeroAtomico));

  return (
    <Paper
      elevation={0}
      sx={{
        zIndex: 1000,
        marginLeft: fullWidth ? 0 : { xs: 0, md: 6 },
        maxWidth: fullWidth ? 'none' : { xs: 'min(100%, 380px)', md: 340 },
        width: fullWidth ? '100%' : { xs: '100%', md: 'auto' },
        borderRadius: mostrarBotaoFechar ? { xs: 0, sm: 2 } : 2,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: `1px solid ${alpha(categoriaCor, 0.4)}`,
        boxShadow: `0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px ${alpha(categoriaCor, 0.12)}`,
        '& .MuiTypography-root': { color: 'text.primary' }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          px: 2,
          py: 2,
          pr: mostrarBotaoFechar ? 5 : 2,
          background: `linear-gradient(155deg, ${alpha(categoriaCor, 0.28)} 0%, ${alpha(categoriaCor, 0.06)} 55%, transparent 100%)`,
          borderBottom: `1px solid ${alpha(categoriaCor, 0.22)}`
        }}
      >
        {mostrarBotaoFechar && (
          <IconButton
            type="button"
            aria-label="Fechar painel do elemento"
            onClick={onFechar}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <Typography
          variant="overline"
          sx={{ letterSpacing: 1.1, color: 'text.secondary', fontSize: '0.65rem', display: 'block' }}
        >
          Elemento selecionado
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
          <Box
            sx={{
              width: 76,
              height: 76,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              bgcolor: alpha(categoriaCor, 0.28),
              border: `2px solid ${alpha(categoriaCor, 0.55)}`,
              boxShadow: `inset 0 1px 0 ${alpha('#fff', 0.07)}`
            }}
          >
            <Typography
              variant="h3"
              component="span"
              sx={{
                fontWeight: 800,
                color: 'common.white',
                lineHeight: 1,
                fontSize: { xs: '2rem', sm: '2.125rem' }
              }}
            >
              {elemento.simbolo}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="h6" component="p" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 0.75 }}>
              {elemento.nome}
            </Typography>
            <Chip
              label={CATEGORIAS[elemento.categoria]?.nome ?? '—'}
              size="small"
              sx={{
                height: 26,
                maxWidth: '100%',
                fontWeight: 600,
                fontSize: '0.72rem',
                bgcolor: alpha(categoriaCor, 0.22),
                color: 'common.white',
                border: `1px solid ${alpha(categoriaCor, 0.45)}`,
                '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' }
              }}
            />
          </Box>
        </Stack>
      </Box>

      <Box sx={{ px: 2, py: 1.75 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1.5,
            columnGap: 2
          }}
        >
          {[
            { label: 'Nº atômico', value: numeroAtomico },
            { label: 'Nêutrons', value: elemento.neutroes },
            { label: 'Massa atômica', value: `${elemento.massaAtomica} u` },
            { label: 'Raio atômico', value: `${elemento.raioAtomico} pm` }
          ].map(({ label, value }) => (
            <Box key={label}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ lineHeight: 1.2 }}>
                {label}
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ mt: 0.35 }}>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'divider' }} />

      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.75 }}>
          Configuração eletrónica
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
            fontSize: '0.8125rem',
            lineHeight: 1.5,
            bgcolor: 'action.hover',
            color: 'text.primary',
            px: 1.25,
            py: 1,
            borderRadius: 1,
            wordBreak: 'break-word'
          }}
        >
          {configTexto}
        </Typography>
      </Box>

      <Box sx={{ px: 2, pb: 1.5 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.85, display: 'block' }}>
          Subníveis (legenda)
        </Typography>
        <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.75 }}>
          {['s', 'p', 'd', 'f'].map((t) => (
            <Box
              key={t}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.6,
                px: 1,
                py: 0.35,
                borderRadius: 10,
                bgcolor: alpha(SUBLEVEL_COLORS_HEX[t], 0.14),
                border: `1px solid ${alpha(SUBLEVEL_COLORS_HEX[t], 0.35)}`
              }}
            >
              <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: SUBLEVEL_COLORS_HEX[t] }} />
              <Typography variant="caption" component="span" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                {t}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: (theme) => alpha(theme.palette.action.hover, theme.palette.mode === 'dark' ? 0.35 : 1),
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="flex-start"
        >
          <TextField
            label="Nº atômico"
            type="number"
            value={numeroAtomico}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              if (!isNaN(n) && n >= 1 && n <= 118) onNumeroAtomicoChange(n);
            }}
            inputProps={{ min: 1, max: 118 }}
            size="small"
            sx={{ width: { xs: '100%', sm: 108 } }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<ScienceIcon />}
            onClick={onAbrir3D}
            size="medium"
            sx={{ width: { xs: '100%', sm: 'auto' }, minHeight: 40 }}
          >
            Modelo 3D
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

ElementoInfoCard.propTypes = {
  elemento: PropTypes.shape({
    categoria: PropTypes.string.isRequired,
    simbolo: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    neutroes: PropTypes.number.isRequired,
    massaAtomica: PropTypes.number.isRequired,
    raioAtomico: PropTypes.number.isRequired
  }).isRequired,
  numeroAtomico: PropTypes.number.isRequired,
  onNumeroAtomicoChange: PropTypes.func.isRequired,
  onAbrir3D: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  mostrarBotaoFechar: PropTypes.bool,
  onFechar: PropTypes.func
};

function App() {
  const theme = useTheme();
  const layoutDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [numeroAtomico, setNumeroAtomico] = useState(6);
  const [elementoSelecionado, setElementoSelecionado] = useState(6);
  const [painelElementoAberto, setPainelElementoAberto] = useState(false);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [mostrarEletrons, setMostrarEletrons] = useState(true);
  const [forcarNucleoDetalhado, setForcarNucleoDetalhado] = useState(false);
  const [subniveisVisiveis, setSubniveisVisiveis] = useState(SUBNIVEIS_INITIAL);
  const [subniveisAnchor, setSubniveisAnchor] = useState(null);
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [paginaInfo, setPaginaInfo] = useState(null);

  useEffect(() => {
    if (layoutDesktop) setPainelElementoAberto(false);
  }, [layoutDesktop]);

  const handleDesenharAtomo = () => {
    const num = parseInt(String(numeroAtomico), 10);
    if (isNaN(num) || num < 1 || num > 118) {
      setNumeroAtomico(6);
      setElementoSelecionado(6);
    } else {
      setNumeroAtomico(num);
      setElementoSelecionado(num);
    }
    setDialogAberto(true);
  };

  const handleSelecionarElemento = (num) => {
    setNumeroAtomico(num);
    setElementoSelecionado(num);
    if (!layoutDesktop) {
      setPainelElementoAberto(true);
    }
  };

  const handleFecharDialog = () => setDialogAberto(false);

  const elemento = elementosQuimicos[numeroAtomico];

  const propsCartaoElemento = elemento
    ? {
      elemento,
      numeroAtomico,
      onNumeroAtomicoChange: (n) => {
        setNumeroAtomico(n);
        setElementoSelecionado(n);
      },
      onAbrir3D: () => {
        if (!layoutDesktop) setPainelElementoAberto(false);
        handleDesenharAtomo();
      }
    }
    : null;

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'auto',
        position: 'relative',
        bgcolor: '#1a1a1a'
      }}
    >
      <AppMenuBar
        drawerOpen={drawerAberto}
        onOpenDrawer={() => setDrawerAberto(true)}
        onDrawerClose={() => setDrawerAberto(false)}
        infoPage={paginaInfo}
        onInfoPage={setPaginaInfo}
        onInfoClose={() => setPaginaInfo(null)}
      />
      <TabelaPeriodica
        numeroAtomico={numeroAtomico}
        onSelecionarElemento={handleSelecionarElemento}
        elementoSelecionado={elementoSelecionado}
        elementoInfo={
          layoutDesktop && propsCartaoElemento ? (
            <ElementoInfoCard {...propsCartaoElemento} fullWidth />
          ) : null
        }
      />

      <Drawer
        anchor="bottom"
        open={Boolean(!layoutDesktop && elemento && painelElementoAberto)}
        onClose={() => setPainelElementoAberto(false)}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: 'rgba(0,0,0,0.55)' }
          }
        }}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: 'background.paper'
          }
        }}
      >
        {propsCartaoElemento && (
          <ElementoInfoCard
            {...propsCartaoElemento}
            fullWidth
            mostrarBotaoFechar
            onFechar={() => setPainelElementoAberto(false)}
          />
        )}
      </Drawer>
      <Dialog
        open={dialogAberto}
        onClose={handleFecharDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>
            Modelo atômico 3D {elemento && `– ${elemento.simbolo} ${elemento.nome}`}
          </span>
          <IconButton aria-label="fechar" onClick={handleFecharDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0, bgcolor: '#0a0a0a' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              p: 1.5,
              bgcolor: '#1a1a1a',
              borderBottom: 1,
              borderColor: 'divider',
              alignItems: 'center'
            }}
          >
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              startIcon={mostrarEletrons ? <VisibilityOffIcon /> : <VisibilityIcon />}
              onClick={() => setMostrarEletrons(!mostrarEletrons)}
            >
              {mostrarEletrons ? 'Ocultar Elétrons' : 'Mostrar Elétrons'}
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => setForcarNucleoDetalhado(!forcarNucleoDetalhado)}
            >
              {forcarNucleoDetalhado ? 'Esconder Núcleo' : 'Mostrar Núcleo'}
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={(e) => setSubniveisAnchor(e.currentTarget)}
            >
              Subníveis ▾
            </Button>
            <Menu
              anchorEl={subniveisAnchor}
              open={Boolean(subniveisAnchor)}
              onClose={(e, reason) => {
                if (reason === 'backdropClick' || reason === 'escapeKeyDown') setSubniveisAnchor(null);
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              MenuListProps={{ onClick: (e) => e.stopPropagation() }}
            >
              {['s', 'p', 'd', 'f'].map((t) => (
                <MenuItem key={t} dense disableRipple>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={subniveisVisiveis[t]}
                        onChange={(e) =>
                          setSubniveisVisiveis((prev) => ({ ...prev, [t]: e.target.checked }))
                        }
                      />
                    }
                    label={
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: SUBLEVEL_COLORS_HEX[t] }} />
                        {t}
                      </span>
                    }
                  />
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ width: '100%', height: 500, minHeight: 500 }}>
            {dialogAberto && (
              <Atom3D
                numeroAtomico={numeroAtomico}
                neutroes={elemento?.neutroes}
                mostrarEletrons={mostrarEletrons}
                forcarNucleoDetalhado={forcarNucleoDetalhado}
                subniveisVisiveis={subniveisVisiveis}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 2, py: 1.5 }}>
          <Button onClick={handleFecharDialog} variant="outlined">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
