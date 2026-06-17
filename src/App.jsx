import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  TextField,
  Dialog,
  DialogContent,
  IconButton,
  Slider,
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
import VideocamIcon from '@mui/icons-material/Videocam';
import GridOnIcon from '@mui/icons-material/GridOn';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import Atom3D, {
  CAMERA_Z_INICIAL,
  cameraZParaSlider,
  sliderParaCameraZ
} from './components/Atom3D';
import AtomModeloHistorico from './components/AtomModeloHistorico';
import { AppMenuBar } from './components/AppMenu';
import TabelaPeriodica from './components/TabelaPeriodica';
import {
  elementosQuimicos,
  CATEGORIAS,
  obterConfiguracaoEletronica,
  configParaTexto,
  SUBLEVEL_COLORS_HEX,
  SUBLEVEL_SHELL_COLORS_HEX
} from './data/elementosQuimicos';
import { LISTA_MODELOS_ATOMICOS, ehModeloQuantico, tituloModeloVisualizador } from './data/tiposModeloAtomico';
import './App.css';

const SUBNIVEIS_INITIAL = { s: true, p: true, d: true, f: true };

const LEGENDA_SUBNIVEIS = [
  { id: 's', cor: SUBLEVEL_COLORS_HEX.s },
  { id: 'p', cor: SUBLEVEL_COLORS_HEX.p },
  { id: 'd', cor: SUBLEVEL_COLORS_HEX.d },
  { id: '4f', cor: SUBLEVEL_SHELL_COLORS_HEX['4f'] },
  { id: '5f', cor: SUBLEVEL_SHELL_COLORS_HEX['5f'] }
];

function ElementoInfoCard({
  elemento,
  numeroAtomico,
  onNumeroAtomicoChange,
  onAbrirModelo,
  fullWidth = false,
  mostrarBotaoFechar = false,
  onFechar
}) {
  const theme = useTheme();
  const paisagemEmMovel = useMediaQuery('(max-width: 1024px) and (orientation: landscape)');
  /** Painel inferior (drawer): em paisagem o ecrã é baixo — layout em duas colunas e mais compacto */
  const layoutPaisagemDrawer = Boolean(fullWidth && paisagemEmMovel);

  const categoriaCor = CATEGORIAS[elemento.categoria]?.cor ?? '#4CAF50';
  const configTexto = configParaTexto(obterConfiguracaoEletronica(numeroAtomico));

  const dadosGrid = (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: layoutPaisagemDrawer ? 'repeat(2, minmax(0, 1fr))' : '1fr 1fr',
        gap: layoutPaisagemDrawer ? 0.75 : 1.5,
        columnGap: layoutPaisagemDrawer ? 1 : 2
      }}
    >
      {[
        { label: 'Nº atômico', value: numeroAtomico },
        { label: 'Nêutrons', value: elemento.neutroes },
        { label: 'Massa atômica', value: `${elemento.massaAtomica} u` },
        { label: 'Raio atômico', value: `${elemento.raioAtomico} pm` }
      ].map(({ label, value }) => (
        <Box key={label}>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ lineHeight: 1.15, fontSize: layoutPaisagemDrawer ? '0.65rem' : undefined }}
          >
            {label}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              mt: 0.25,
              fontSize: layoutPaisagemDrawer ? '0.75rem' : undefined,
              lineHeight: 1.25
            }}
          >
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  const blocoConfigESubníveis = (
    <>
      <Box sx={{ mb: layoutPaisagemDrawer ? 0 : 1, py: layoutPaisagemDrawer ? 0 : undefined }}>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mb: layoutPaisagemDrawer ? 0.35 : 0.75, fontSize: layoutPaisagemDrawer ? '0.65rem' : undefined }}
        >
          Configuração eletrónica
          <Typography
            component="span"
            variant="caption"
            color="text.disabled"
            sx={{ display: 'block', fontSize: layoutPaisagemDrawer ? '0.58rem' : '0.68rem', mt: 0.15 }}
          >
            ordem crescente de energia (Pauling)
          </Typography>
        </Typography>
        <Typography
          variant="body2"
          component="div"
          sx={{
            fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
            fontSize: layoutPaisagemDrawer ? '0.68rem' : '0.8125rem',
            lineHeight: 1.4,
            bgcolor: 'action.hover',
            color: 'text.primary',
            px: layoutPaisagemDrawer ? 0.75 : 1.25,
            py: layoutPaisagemDrawer ? 0.5 : 1,
            borderRadius: 1,
            wordBreak: 'break-word',
            maxHeight: layoutPaisagemDrawer ? 88 : 'none',
            overflowY: layoutPaisagemDrawer ? 'auto' : 'visible',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {configTexto}
        </Typography>
      </Box>

      <Box sx={{ pb: layoutPaisagemDrawer ? 0 : 1.5, pt: layoutPaisagemDrawer ? 0.5 : 0 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mb: layoutPaisagemDrawer ? 0.35 : 0.85,
            display: 'block',
            fontSize: layoutPaisagemDrawer ? '0.65rem' : undefined
          }}
        >
          Subníveis (legenda)
        </Typography>
        <Stack direction="row" flexWrap="wrap" sx={{ gap: layoutPaisagemDrawer ? 0.4 : 0.75 }}>
          {LEGENDA_SUBNIVEIS.map(({ id, cor }) => (
            <Box
              key={id}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.45,
                px: layoutPaisagemDrawer ? 0.6 : 1,
                py: 0.25,
                borderRadius: 10,
                bgcolor: alpha(cor, 0.14),
                border: `1px solid ${alpha(cor, 0.35)}`
              }}
            >
              <Box
                component="span"
                sx={{
                  width: layoutPaisagemDrawer ? 6 : 8,
                  height: layoutPaisagemDrawer ? 6 : 8,
                  borderRadius: '50%',
                  bgcolor: cor
                }}
              />
              <Typography
                variant="caption"
                component="span"
                sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: layoutPaisagemDrawer ? '0.65rem' : undefined }}
              >
                {id}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        zIndex: 1000,
        marginLeft: fullWidth ? 0 : { xs: 0, md: 6 },
        maxWidth: fullWidth ? 'none' : { xs: 'min(100%, 380px)', md: 340 },
        width: fullWidth ? '100%' : { xs: '100%', md: 'auto' },
        /* No drawer: cantos iguais. No drawer inferior: alinhar ao raio do Drawer (16px) para a borda não “cortar” no canto superior direito */
        borderRadius: mostrarBotaoFechar
          ? { xs: '16px 16px 0 0', sm: 2 }
          : 2,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        boxSizing: 'border-box',
        border: `1px solid ${alpha(categoriaCor, 0.4)}`,
        boxShadow: `0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px ${alpha(categoriaCor, 0.12)}`,
        '& .MuiTypography-root': { color: 'text.primary' }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          px: layoutPaisagemDrawer ? 1.25 : 2,
          py: layoutPaisagemDrawer ? 1 : 2,
          pr: mostrarBotaoFechar ? (layoutPaisagemDrawer ? 5 : 5.5) : layoutPaisagemDrawer ? 1.25 : 2,
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
              top: layoutPaisagemDrawer ? 6 : 10,
              right: layoutPaisagemDrawer ? 6 : 10,
              zIndex: 1,
              color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <CloseIcon fontSize={layoutPaisagemDrawer ? 'small' : 'medium'} />
          </IconButton>
        )}
        <Typography
          variant="overline"
          sx={{
            letterSpacing: 1.1,
            color: 'text.secondary',
            fontSize: layoutPaisagemDrawer ? '0.58rem' : '0.65rem',
            display: 'block',
            lineHeight: 1.2
          }}
        >
          Elemento selecionado
        </Typography>
        <Stack direction="row" alignItems="center" spacing={layoutPaisagemDrawer ? 1.25 : 2} sx={{ mt: layoutPaisagemDrawer ? 0.5 : 1 }}>
          <Box
            sx={{
              width: layoutPaisagemDrawer ? 52 : 76,
              height: layoutPaisagemDrawer ? 52 : 76,
              borderRadius: layoutPaisagemDrawer ? 1.5 : 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              bgcolor: categoriaCor,
              border: `2px solid ${alpha(categoriaCor, 0.85)}`,
              boxShadow: `0 2px 8px ${alpha(categoriaCor, 0.35)}`
            }}
          >
            <Typography
              variant="h3"
              component="span"
              sx={{
                fontWeight: 800,
                color: 'common.white',
                lineHeight: 1,
                fontSize: layoutPaisagemDrawer ? '1.35rem' : { xs: '2rem', sm: '2.125rem' }
              }}
            >
              {elemento.simbolo}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontWeight: 700,
                lineHeight: 1.25,
                mb: layoutPaisagemDrawer ? 0.35 : 0.75,
                fontSize: layoutPaisagemDrawer ? '0.95rem' : undefined
              }}
            >
              {elemento.nome}
            </Typography>
            <Chip
              label={CATEGORIAS[elemento.categoria]?.nome ?? '—'}
              size="small"
              sx={{
                height: layoutPaisagemDrawer ? 22 : 26,
                maxWidth: '100%',
                fontWeight: 700,
                fontSize: layoutPaisagemDrawer ? '0.65rem' : '0.72rem',
                bgcolor: alpha(categoriaCor, 0.16),
                color: categoriaCor,
                border: `1.5px solid ${alpha(categoriaCor, 0.55)}`,
                '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis', px: layoutPaisagemDrawer ? 0.75 : 1 }
              }}
            />
          </Box>
        </Stack>
      </Box>

      {layoutPaisagemDrawer ? (
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="stretch"
          sx={{
            px: 1.25,
            py: 1,
            gap: 1.25,
            borderTop: `1px solid ${theme.palette.divider}`,
            minHeight: 0
          }}
        >
          <Box sx={{ flex: '0 0 38%', minWidth: 0, maxWidth: '42%' }}>{dadosGrid}</Box>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              overflow: 'hidden'
            }}
          >
            {blocoConfigESubníveis}
          </Box>
        </Stack>
      ) : (
        <>
          <Box sx={{ px: 2, py: 1.75 }}>{dadosGrid}</Box>
          <Divider sx={{ borderColor: 'divider' }} />
          <Box sx={{ px: 2, py: 1.5 }}>{blocoConfigESubníveis}</Box>
        </>
      )}

      <Box
        sx={{
          px: layoutPaisagemDrawer ? 1.25 : 2,
          py: layoutPaisagemDrawer ? 1 : 1.25,
          pb: mostrarBotaoFechar && !layoutPaisagemDrawer ? 2 : layoutPaisagemDrawer ? 1.25 : 1.25,
          bgcolor: (t) =>
            t.palette.mode === 'dark'
              ? alpha(t.palette.common.black, 0.25)
              : alpha(t.palette.primary.main, 0.06),
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Stack spacing={layoutPaisagemDrawer ? 0.75 : 1}>
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
            fullWidth
            sx={{ bgcolor: 'background.paper' }}
          />
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: 'block',
                mb: 0.75,
                fontWeight: 600,
                fontSize: layoutPaisagemDrawer ? '0.65rem' : '0.72rem'
              }}
            >
              Modelos atómicos
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: layoutPaisagemDrawer ? 0.5 : 0.75
              }}
            >
              {LISTA_MODELOS_ATOMICOS.map(({ id, label, labelCurto, descricao }) => (
                <Button
                  key={id}
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={id === 'quantico' && !layoutPaisagemDrawer ? <ScienceIcon sx={{ fontSize: 16 }} /> : undefined}
                  onClick={() => onAbrirModelo(id)}
                  title={descricao}
                  sx={{
                    minHeight: layoutPaisagemDrawer ? 32 : 36,
                    px: layoutPaisagemDrawer ? 0.75 : 1,
                    fontSize: layoutPaisagemDrawer ? '0.68rem' : '0.78rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    justifyContent: 'flex-start'
                  }}
                >
                  {layoutPaisagemDrawer ? labelCurto : label}
                </Button>
              ))}
            </Box>
          </Box>
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
  onAbrirModelo: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  mostrarBotaoFechar: PropTypes.bool,
  onFechar: PropTypes.func
};

function App() {
  const theme = useTheme();
  const layoutDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  /** Telefone e tablet: dialog 3D em ecrã completo e layout flexível */
  const dialogMobileLayout = useMediaQuery(theme.breakpoints.down('md'));
  const [numeroAtomico, setNumeroAtomico] = useState(6);
  const [elementoSelecionado, setElementoSelecionado] = useState(6);
  const [painelElementoAberto, setPainelElementoAberto] = useState(false);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [tipoModeloAtomico, setTipoModeloAtomico] = useState('quantico');
  const [mostrarEletrons, setMostrarEletrons] = useState(true);
  const [mostrarCoordenadas, setMostrarCoordenadas] = useState(true);
  const [rotacaoAutomatica, setRotacaoAutomatica] = useState(false);
  const [forcarNucleoDetalhado, setForcarNucleoDetalhado] = useState(false);
  const [subniveisVisiveis, setSubniveisVisiveis] = useState(SUBNIVEIS_INITIAL);
  const [subniveisAnchor, setSubniveisAnchor] = useState(null);
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [paginaInfo, setPaginaInfo] = useState(null);
  /** Câmera ao fundo do átomo (estilo RA) — só em telas abaixo do breakpoint md */
  const [modoRealidadeAumentada, setModoRealidadeAumentada] = useState(false);
  const [zoomCamera, setZoomCamera] = useState(CAMERA_Z_INICIAL);
  const videoCameraRef = useRef(null);
  const streamCameraRef = useRef(null);

  useEffect(() => {
    if (layoutDesktop) setPainelElementoAberto(false);
  }, [layoutDesktop]);

  useEffect(() => {
    if (!dialogAberto) {
      setModoRealidadeAumentada(false);
      setRotacaoAutomatica(false);
    } else {
      setZoomCamera(CAMERA_Z_INICIAL);
    }
  }, [dialogAberto]);

  useEffect(() => {
    if (!dialogAberto || !dialogMobileLayout || !modoRealidadeAumentada) {
      if (streamCameraRef.current) {
        streamCameraRef.current.getTracks().forEach((t) => t.stop());
        streamCameraRef.current = null;
      }
      const v = videoCameraRef.current;
      if (v) v.srcObject = null;
      return undefined;
    }

    const video = videoCameraRef.current;
    let cancelled = false;

    const iniciar = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamCameraRef.current = stream;
        if (video) {
          video.srcObject = stream;
          await video.play().catch(() => { });
        }
      } catch {
        setModoRealidadeAumentada(false);
      }
    };

    iniciar();

    return () => {
      cancelled = true;
      if (streamCameraRef.current) {
        streamCameraRef.current.getTracks().forEach((t) => t.stop());
        streamCameraRef.current = null;
      }
      if (video) video.srcObject = null;
    };
  }, [dialogAberto, dialogMobileLayout, modoRealidadeAumentada]);

  const handleAbrirModelo = (tipo) => {
    const num = parseInt(String(numeroAtomico), 10);
    if (isNaN(num) || num < 1 || num > 118) {
      setNumeroAtomico(6);
      setElementoSelecionado(6);
    } else {
      setNumeroAtomico(num);
      setElementoSelecionado(num);
    }
    setTipoModeloAtomico(tipo);
    if (!layoutDesktop) setPainelElementoAberto(false);
    setDialogAberto(true);
  };

  const handleSelecionarElemento = (num) => {
    setNumeroAtomico(num);
    setElementoSelecionado(num);
    if (!layoutDesktop) {
      setPainelElementoAberto(true);
    }
  };

  const handleFecharDialog = () => {
    setModoRealidadeAumentada(false);
    setDialogAberto(false);
  };

  const sxBotaoOverlay3D = (theme, { ativo = false } = {}) => ({
    borderRadius: 1.5,
    textTransform: 'none',
    fontWeight: 600,
    py: dialogMobileLayout ? 0.4 : 0.15,
    px: dialogMobileLayout ? 0.85 : 0.55,
    minHeight: dialogMobileLayout ? 32 : 24,
    fontSize: dialogMobileLayout ? '0.75rem' : '0.7rem',
    flexShrink: 0,
    ...(ativo
      ? {
        borderColor: theme.palette.primary.main,
        color: 'common.white',
        bgcolor: theme.palette.primary.main,
        '&:hover': {
          borderColor: theme.palette.primary.dark,
          bgcolor: theme.palette.primary.dark
        }
      }
      : {
        borderColor: alpha('#fff', 0.22),
        color: 'grey.100',
        bgcolor: alpha('#000', 0.14),
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, 0.55),
          bgcolor: alpha('#000', 0.28)
        }
      })
  });

  const elemento = elementosQuimicos[numeroAtomico];

  const modeloQuantico = ehModeloQuantico(tipoModeloAtomico);
  const categoriaCor = elemento ? (CATEGORIAS[elemento.categoria]?.cor ?? '#4CAF50') : '#4CAF50';

  const propsCartaoElemento = elemento
    ? {
      elemento,
      numeroAtomico,
      onNumeroAtomicoChange: (n) => {
        setNumeroAtomico(n);
        setElementoSelecionado(n);
      },
      onAbrirModelo: handleAbrirModelo
    }
    : null;

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'auto',
        position: 'relative',
        bgcolor: 'background.default'
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
            sx: { backgroundColor: 'rgba(0,0,0,0.35)' }
          }
        }}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            width: '100%',
            maxWidth: '100vw',
            maxHeight: 'min(95dvh, 100vh)',
            overflowX: 'hidden',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            bgcolor: 'background.paper',
            boxSizing: 'border-box',
            /* Respiro por baixo: borda do cartão + barra de gestos / safe area */
            paddingBottom: 'max(20px, calc(12px + env(safe-area-inset-bottom, 0px)))',
            '@media (orientation: landscape) and (max-height: 500px)': {
              maxHeight: '100dvh',
              paddingBottom: 'max(16px, calc(8px + env(safe-area-inset-bottom, 0px)))'
            }
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
        fullScreen
        scroll="paper"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: dialogMobileLayout ? 'none' : 'blur(8px)',
              WebkitBackdropFilter: dialogMobileLayout ? 'none' : 'blur(8px)'
            }
          }
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            maxHeight: '100dvh',
            margin: 0,
            borderRadius: 0,
            overflow: 'hidden',
            bgcolor: '#263238',
            pt: 'env(safe-area-inset-top, 0px)',
            pb: 'env(safe-area-inset-bottom, 0px)'
          }
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            flex: '1 1 auto',
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            bgcolor: modoRealidadeAumentada && dialogMobileLayout ? '#000' : '#263238'
          }}
        >
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              minHeight: 0,
              minWidth: 0,
              width: '100%'
            }}
          >
            {dialogMobileLayout && (
              <video
                ref={videoCameraRef}
                autoPlay
                muted
                playsInline
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                  display: modoRealidadeAumentada ? 'block' : 'none',
                  pointerEvents: 'none',
                  backgroundColor: '#000'
                }}
              />
            )}
            <Box sx={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              {dialogAberto && modeloQuantico && (
                <Atom3D
                  numeroAtomico={numeroAtomico}
                  neutroes={elemento?.neutroes}
                  mostrarEletrons={mostrarEletrons}
                  mostrarCoordenadas={mostrarCoordenadas}
                  rotacaoAutomatica={rotacaoAutomatica}
                  forcarNucleoDetalhado={forcarNucleoDetalhado}
                  subniveisVisiveis={subniveisVisiveis}
                  fundoTransparente={Boolean(dialogMobileLayout && modoRealidadeAumentada)}
                  zoomCamera={zoomCamera}
                  onZoomChange={setZoomCamera}
                />
              )}
              {dialogAberto && !modeloQuantico && (
                <AtomModeloHistorico
                  key={tipoModeloAtomico}
                  tipo={tipoModeloAtomico}
                  numeroAtomico={numeroAtomico}
                  corElemento={categoriaCor}
                  rotacaoAutomatica={rotacaoAutomatica}
                  mostrarCoordenadas={mostrarCoordenadas}
                  fundoTransparente={Boolean(dialogMobileLayout && modoRealidadeAumentada)}
                  zoomCamera={zoomCamera}
                  onZoomChange={setZoomCamera}
                />
              )}
            </Box>

            {elemento && (
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  top: { xs: 56, sm: 52 },
                  right: { xs: 42, sm: 44 },
                  zIndex: 4,
                  pointerEvents: 'none',
                  textAlign: 'right',
                  userSelect: 'none',
                  px: 1.25,
                  py: 0.75,
                  borderRadius: 1.5,
                  bgcolor: alpha('#000', 0.28),
                  backdropFilter: 'blur(4px)'
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '3.25rem', sm: '3.5rem' },
                    lineHeight: 1,
                    color: 'common.white',
                    letterSpacing: '-0.03em',
                    textShadow: '0 2px 16px rgba(0,0,0,0.6)'
                  }}
                >
                  {elemento.simbolo}
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    mt: 0.4,
                    fontWeight: 600,
                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                    color: alpha('#fff', 0.88),
                    textShadow: '0 1px 8px rgba(0,0,0,0.55)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {numeroAtomico} · {elemento.nome}
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    mt: 0.35,
                    fontWeight: 500,
                    fontSize: { xs: '0.72rem', sm: '0.8rem' },
                    color: alpha('#fff', 0.72),
                    textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                    maxWidth: 220,
                    lineHeight: 1.25
                  }}
                >
                  {tituloModeloVisualizador(tipoModeloAtomico)}
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                position: 'absolute',
                top: 'max(6px, env(safe-area-inset-top, 0px))',
                left: 6,
                right: 6,
                zIndex: 5,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                pointerEvents: 'none'
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                  gap: 0.4,
                  px: 0.75,
                  py: 0.4,
                  borderRadius: 1.5,
                  bgcolor: alpha('#000', 0.42),
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  WebkitOverflowScrolling: 'touch',
                  touchAction: 'pan-x',
                  overscrollBehaviorX: 'contain',
                  pointerEvents: 'auto',
                  scrollbarWidth: 'thin',
                  '&::-webkit-scrollbar': { height: 5 },
                  '&::-webkit-scrollbar-thumb': {
                    bgcolor: alpha('#fff', 0.25),
                    borderRadius: 4
                  }
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'grey.300',
                    fontWeight: 700,
                    fontSize: '0.68rem',
                    whiteSpace: 'nowrap',
                    mr: 0.25,
                    flexShrink: 0
                  }}
                >
                  {tituloModeloVisualizador(tipoModeloAtomico)}
                </Typography>
                {modeloQuantico ? (
                  <>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={mostrarEletrons ? <VisibilityOffIcon sx={{ fontSize: 14 }} /> : <VisibilityIcon sx={{ fontSize: 14 }} />}
                      onClick={() => setMostrarEletrons(!mostrarEletrons)}
                      sx={(theme) => sxBotaoOverlay3D(theme, { ativo: mostrarEletrons })}
                    >
                      {mostrarEletrons ? 'Ocultar elétrons' : 'Elétrons'}
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setForcarNucleoDetalhado(!forcarNucleoDetalhado)}
                      sx={(theme) => sxBotaoOverlay3D(theme, { ativo: forcarNucleoDetalhado })}
                    >
                      {forcarNucleoDetalhado ? 'Ocultar núcleo' : 'Núcleo'}
                    </Button>
                  </>
                ) : null}
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<ThreeDRotationIcon sx={{ fontSize: 14 }} />}
                  onClick={() => setRotacaoAutomatica((v) => !v)}
                  sx={(theme) => sxBotaoOverlay3D(theme, { ativo: rotacaoAutomatica })}
                >
                  {rotacaoAutomatica ? 'Parar' : 'Rotação'}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<GridOnIcon sx={{ fontSize: 14 }} />}
                  onClick={() => setMostrarCoordenadas(!mostrarCoordenadas)}
                  sx={(theme) => sxBotaoOverlay3D(theme, { ativo: mostrarCoordenadas })}
                >
                  {mostrarCoordenadas ? 'Ocultar eixos' : 'Eixos'}
                </Button>
                {modeloQuantico ? (
                  <>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={(e) => setSubniveisAnchor(e.currentTarget)}
                      sx={(theme) => sxBotaoOverlay3D(theme, { ativo: Boolean(subniveisAnchor) })}
                    >
                      Subníveis ▾
                    </Button>
                  </>
                ) : null}
                {dialogMobileLayout && (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<VideocamIcon sx={{ fontSize: 14 }} />}
                    onClick={() => setModoRealidadeAumentada((v) => !v)}
                    sx={(theme) => sxBotaoOverlay3D(theme, { ativo: modoRealidadeAumentada })}
                  >
                    {modoRealidadeAumentada ? 'RA' : 'Câmera'}
                  </Button>
                )}
              </Box>
              <IconButton
                aria-label="fechar"
                onClick={handleFecharDialog}
                size="small"
                sx={{
                  color: 'grey.200',
                  flexShrink: 0,
                  p: 0.5,
                  bgcolor: alpha('#000', 0.42),
                  backdropFilter: 'blur(10px)',
                  pointerEvents: 'auto',
                  '&:hover': { bgcolor: alpha('#000', 0.55), color: 'common.white' }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Menu
              anchorEl={subniveisAnchor}
              open={Boolean(modeloQuantico && subniveisAnchor)}
              onClose={(e, reason) => {
                if (reason === 'backdropClick' || reason === 'escapeKeyDown') setSubniveisAnchor(null);
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              MenuListProps={{ onClick: (e) => e.stopPropagation() }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 0.75,
                    borderRadius: 2,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    maxWidth: 'min(100vw - 24px, 320px)'
                  }
                }
              }}
            >
              {['s', 'p', 'd', 'f'].map((t) => (
                <MenuItem key={t} dense={!dialogMobileLayout} disableRipple>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size={dialogMobileLayout ? 'medium' : 'small'}
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

            <Box
              component="aside"
              aria-label="Controlo de zoom"
              sx={{
                position: 'absolute',
                top: '50%',
                right: 6,
                transform: 'translateY(-50%)',
                zIndex: 5,
                width: 32,
                height: 'min(55vh, 360px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                py: 0.75,
                borderRadius: 1.5,
                bgcolor: alpha('#000', 0.38),
                backdropFilter: 'blur(6px)'
              }}
            >
              <ZoomInIcon sx={{ fontSize: 16, color: 'grey.300' }} aria-hidden />
              <Slider
                orientation="vertical"
                value={cameraZParaSlider(zoomCamera)}
                onChange={(_, valor) => setZoomCamera(sliderParaCameraZ(valor))}
                min={0}
                max={100}
                step={1}
                aria-label="Zoom do modelo 3D"
                sx={{
                  flex: '1 1 auto',
                  minHeight: 80,
                  color: 'primary.main',
                  '& .MuiSlider-thumb': { width: 14, height: 14 },
                  '& .MuiSlider-rail': { opacity: 0.35, bgcolor: 'grey.500' }
                }}
              />
              <ZoomOutIcon sx={{ fontSize: 16, color: 'grey.300' }} aria-hidden />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default App;
