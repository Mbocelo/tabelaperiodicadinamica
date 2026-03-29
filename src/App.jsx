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
import VideocamIcon from '@mui/icons-material/Videocam';
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
          {['s', 'p', 'd', 'f'].map((t) => (
            <Box
              key={t}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.45,
                px: layoutPaisagemDrawer ? 0.6 : 1,
                py: 0.25,
                borderRadius: 10,
                bgcolor: alpha(SUBLEVEL_COLORS_HEX[t], 0.14),
                border: `1px solid ${alpha(SUBLEVEL_COLORS_HEX[t], 0.35)}`
              }}
            >
              <Box
                component="span"
                sx={{
                  width: layoutPaisagemDrawer ? 6 : 8,
                  height: layoutPaisagemDrawer ? 6 : 8,
                  borderRadius: '50%',
                  bgcolor: SUBLEVEL_COLORS_HEX[t]
                }}
              />
              <Typography
                variant="caption"
                component="span"
                sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: layoutPaisagemDrawer ? '0.65rem' : undefined }}
              >
                {t}
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
        boxShadow: `0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px ${alpha(categoriaCor, 0.12)}`,
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
                fontWeight: 600,
                fontSize: layoutPaisagemDrawer ? '0.65rem' : '0.72rem',
                bgcolor: alpha(categoriaCor, 0.22),
                color: 'common.white',
                border: `1px solid ${alpha(categoriaCor, 0.45)}`,
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
          py: layoutPaisagemDrawer ? 1 : 1.5,
          pb: mostrarBotaoFechar && !layoutPaisagemDrawer ? 2 : layoutPaisagemDrawer ? 1.25 : 1.5,
          bgcolor: (t) => alpha(t.palette.action.hover, t.palette.mode === 'dark' ? 0.35 : 1),
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Stack
          direction={layoutPaisagemDrawer ? 'row' : { xs: 'column', sm: 'row' }}
          spacing={1}
          alignItems={layoutPaisagemDrawer ? 'center' : { xs: 'stretch', sm: 'center' }}
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
            sx={{
              width: layoutPaisagemDrawer ? 96 : { xs: '100%', sm: 108 },
              flexShrink: 0
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={layoutPaisagemDrawer ? undefined : <ScienceIcon />}
            onClick={onAbrir3D}
            size={layoutPaisagemDrawer ? 'small' : 'medium'}
            sx={{
              width: layoutPaisagemDrawer ? { xs: 'auto', sm: 'auto' } : { xs: '100%', sm: 'auto' },
              minHeight: layoutPaisagemDrawer ? 34 : 40,
              flex: layoutPaisagemDrawer ? '1 1 auto' : undefined,
              minWidth: 0
            }}
          >
            {layoutPaisagemDrawer ? '3D' : 'Modelo 3D'}
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
  /** Telefone e tablet: dialog 3D em ecrã completo e layout flexível */
  const dialogMobileLayout = useMediaQuery(theme.breakpoints.down('md'));
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
  /** Câmera ao fundo do átomo (estilo RA) — só em telas abaixo do breakpoint md */
  const [modoRealidadeAumentada, setModoRealidadeAumentada] = useState(false);
  const videoCameraRef = useRef(null);
  const streamCameraRef = useRef(null);

  useEffect(() => {
    if (layoutDesktop) setPainelElementoAberto(false);
  }, [layoutDesktop]);

  useEffect(() => {
    if (!dialogAberto) setModoRealidadeAumentada(false);
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

  const handleFecharDialog = () => {
    setModoRealidadeAumentada(false);
    setDialogAberto(false);
  };

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
        fullScreen={dialogMobileLayout}
        maxWidth="lg"
        fullWidth
        scroll="paper"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: dialogMobileLayout ? 'rgba(4, 6, 12, 0.92)' : 'rgba(4, 6, 12, 0.78)',
              backdropFilter: dialogMobileLayout ? 'none' : 'blur(14px)',
              WebkitBackdropFilter: dialogMobileLayout ? 'none' : 'blur(14px)'
            }
          }
        }}
        PaperProps={{
          elevation: 0,
          sx: (theme) =>
            dialogMobileLayout
              ? {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                maxHeight: '100dvh',
                margin: 0,
                borderRadius: 0,
                pt: 'env(safe-area-inset-top, 0px)',
                bgcolor: alpha(theme.palette.background.paper, 0.98),
                backgroundImage: `linear-gradient(165deg, ${alpha('#1e2228', 0.98)} 0%, ${alpha('#12151c', 1)} 45%, ${alpha('#0c0e12', 1)} 100%)`,
                border: 'none',
                boxShadow: 'none'
              }
              : {
                width: '100%',
                maxWidth: 'min(960px, calc(100vw - 24px))',
                borderRadius: 3,
                overflow: 'hidden',
                bgcolor: alpha(theme.palette.background.paper, 0.92),
                backgroundImage: `linear-gradient(165deg, ${alpha('#1e2228', 0.98)} 0%, ${alpha('#12151c', 1)} 45%, ${alpha('#0c0e12', 1)} 100%)`,
                border: `1px solid ${alpha('#fff', 0.08)}`,
                boxShadow: `0 32px 64px -16px rgba(0,0,0,0.75), 0 0 0 1px ${alpha(theme.palette.primary.main, 0.18)}, inset 0 1px 0 ${alpha('#fff', 0.04)}`
              }
        }}
      >
        <DialogTitle
          component="div"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.5, sm: 2 },
            py: { xs: 1.5, sm: 2 },
            px: { xs: 1.5, sm: 2.5 },
            pr: { xs: 1, sm: 1 },
            flexShrink: 0,
            borderBottom: `1px solid ${alpha('#fff', 0.06)}`,
            background: `linear-gradient(105deg, ${alpha(theme.palette.primary.main, 0.14)} 0%, transparent 55%)`
          })}
        >
          <Box
            sx={(theme) => ({
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              bgcolor: alpha(theme.palette.primary.main, 0.18),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
              boxShadow: `0 0 24px ${alpha(theme.palette.primary.main, 0.2)}`
            })}
          >
            <ScienceIcon sx={{ fontSize: { xs: 22, sm: 28 }, color: 'primary.light' }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                letterSpacing: { xs: 1.5, sm: 2 },
                fontSize: { xs: '0.6rem', sm: '0.65rem' },
                lineHeight: 1.2
              }}
            >
              Visualização interativa
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: 700, lineHeight: 1.25, mt: 0.25, fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              Modelo atômico 3D
            </Typography>
            {elemento && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5, fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
              >
                <Box component="span" sx={{ color: 'secondary.main', fontWeight: 700, mr: 0.75 }}>
                  {elemento.simbolo}
                </Box>
                {elemento.nome}
              </Typography>
            )}
          </Box>
          <IconButton
            aria-label="fechar"
            onClick={handleFecharDialog}
            size={dialogMobileLayout ? 'medium' : 'small'}
            sx={{
              color: 'grey.400',
              bgcolor: alpha('#fff', 0.06),
              flexShrink: 0,
              minWidth: dialogMobileLayout ? 44 : undefined,
              minHeight: dialogMobileLayout ? 44 : undefined,
              '&:hover': { bgcolor: alpha('#fff', 0.12), color: 'common.white' }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            p: 0,
            bgcolor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            ...(dialogMobileLayout
              ? { flex: '1 1 auto', minHeight: 0 }
              : { overflow: 'hidden' })
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: { xs: 'nowrap', sm: 'wrap' },
              flexDirection: 'row',
              gap: 1,
              py: { xs: 1.25, sm: 2 },
              px: { xs: 1.25, sm: 2 },
              alignItems: 'center',
              flexShrink: 0,
              overflowX: { xs: 'auto', sm: 'visible' },
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: { xs: 'thin', sm: 'auto' },
              bgcolor: alpha('#000', 0.28),
              borderBottom: `1px solid ${alpha('#fff', 0.05)}`
            }}
          >
            <Button
              size={dialogMobileLayout ? 'medium' : 'small'}
              variant="outlined"
              startIcon={mostrarEletrons ? <VisibilityOffIcon /> : <VisibilityIcon />}
              onClick={() => setMostrarEletrons(!mostrarEletrons)}
              sx={(theme) => ({
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                py: dialogMobileLayout ? 1 : 0.75,
                px: dialogMobileLayout ? 1.75 : 1.5,
                minHeight: dialogMobileLayout ? 44 : undefined,
                flexShrink: 0,
                borderColor: alpha('#fff', 0.14),
                color: 'grey.200',
                '&:hover': {
                  borderColor: alpha(theme.palette.primary.main, 0.55),
                  bgcolor: alpha(theme.palette.primary.main, 0.08)
                }
              })}
            >
              {mostrarEletrons ? 'Ocultar elétrons' : 'Mostrar elétrons'}
            </Button>
            <Button
              size={dialogMobileLayout ? 'medium' : 'small'}
              variant="outlined"
              onClick={() => setForcarNucleoDetalhado(!forcarNucleoDetalhado)}
              sx={(theme) => ({
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                py: dialogMobileLayout ? 1 : 0.75,
                px: dialogMobileLayout ? 1.75 : 1.5,
                minHeight: dialogMobileLayout ? 44 : undefined,
                flexShrink: 0,
                borderColor: alpha('#fff', 0.14),
                color: 'grey.200',
                '&:hover': {
                  borderColor: alpha(theme.palette.primary.main, 0.55),
                  bgcolor: alpha(theme.palette.primary.main, 0.08)
                }
              })}
            >
              {forcarNucleoDetalhado ? 'Esconder núcleo' : 'Mostrar núcleo'}
            </Button>
            <Button
              size={dialogMobileLayout ? 'medium' : 'small'}
              variant="outlined"
              onClick={(e) => setSubniveisAnchor(e.currentTarget)}
              sx={(theme) => ({
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                py: dialogMobileLayout ? 1 : 0.75,
                px: dialogMobileLayout ? 1.75 : 1.5,
                minHeight: dialogMobileLayout ? 44 : undefined,
                flexShrink: 0,
                borderColor: alpha('#fff', 0.14),
                color: 'grey.200',
                '&:hover': {
                  borderColor: alpha(theme.palette.primary.main, 0.55),
                  bgcolor: alpha(theme.palette.primary.main, 0.08)
                }
              })}
            >
              Subníveis ▾
            </Button>
            {dialogMobileLayout && (
              <Button
                size="medium"
                variant={modoRealidadeAumentada ? 'contained' : 'outlined'}
                color={modoRealidadeAumentada ? 'secondary' : 'inherit'}
                startIcon={<VideocamIcon />}
                onClick={() => setModoRealidadeAumentada((v) => !v)}
                sx={(theme) => ({
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1,
                  px: 1.75,
                  minHeight: 44,
                  flexShrink: 0,
                  borderColor: alpha('#fff', 0.14),
                  color: modoRealidadeAumentada ? undefined : 'grey.200',
                  '&:hover': {
                    borderColor: alpha(theme.palette.secondary.main, 0.55),
                    bgcolor: modoRealidadeAumentada ? undefined : alpha(theme.palette.secondary.main, 0.08)
                  }
                })}
              >
                {modoRealidadeAumentada ? 'RA ligado' : 'Câmera RA'}
              </Button>
            )}
            <Menu
              anchorEl={subniveisAnchor}
              open={Boolean(subniveisAnchor)}
              onClose={(e, reason) => {
                if (reason === 'backdropClick' || reason === 'escapeKeyDown') setSubniveisAnchor(null);
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              MenuListProps={{ onClick: (e) => e.stopPropagation() }}
              slotProps={{
                paper: {
                  sx: (theme) => ({
                    mt: 0.75,
                    borderRadius: 2,
                    border: `1px solid ${alpha('#fff', 0.08)}`,
                    bgcolor: alpha(theme.palette.background.paper, 0.98),
                    boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
                    maxWidth: 'min(100vw - 24px, 320px)'
                  })
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
          </Box>
          <Box
            sx={{
              width: '100%',
              flex: dialogMobileLayout ? '1 1 auto' : undefined,
              minHeight: dialogMobileLayout ? 0 : { xs: 420, sm: 500 },
              height: dialogMobileLayout ? undefined : { xs: 420, sm: 500 },
              bgcolor: modoRealidadeAumentada && dialogMobileLayout ? '#000' : '#050608',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 2,
                boxShadow: `inset 0 0 80px ${alpha('#000', modoRealidadeAumentada && dialogMobileLayout ? 0.25 : 0.45)}`,
                borderRadius: 0
              }
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
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                height: '100%'
              }}
            >
              {dialogAberto && (
                <Atom3D
                  numeroAtomico={numeroAtomico}
                  neutroes={elemento?.neutroes}
                  mostrarEletrons={mostrarEletrons}
                  forcarNucleoDetalhado={forcarNucleoDetalhado}
                  subniveisVisiveis={subniveisVisiveis}
                  fundoTransparente={Boolean(dialogMobileLayout && modoRealidadeAumentada)}
                />
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            px: { xs: 1.5, sm: 2.5 },
            py: { xs: 1.5, sm: 2 },
            flexShrink: 0,
            borderTop: `1px solid ${alpha('#fff', 0.06)}`,
            bgcolor: alpha('#000', 0.2),
            justifyContent: 'flex-end',
            pb: { xs: 'max(12px, env(safe-area-inset-bottom, 0px))', sm: 2 },
            gap: 1
          }}
        >
          <Button
            onClick={handleFecharDialog}
            variant="contained"
            color="primary"
            size={dialogMobileLayout ? 'large' : 'medium'}
            fullWidth={dialogMobileLayout}
            sx={(theme) => ({
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: dialogMobileLayout ? 2 : 2.5,
              py: dialogMobileLayout ? 1.25 : 1,
              minHeight: dialogMobileLayout ? 48 : undefined,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.35)}`
            })}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
