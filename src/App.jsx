import { useState } from 'react';
import {
  Box,
  Button,
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
import CloseIcon from '@mui/icons-material/Close';
import ScienceIcon from '@mui/icons-material/Science';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Atom3D from './components/Atom3D';
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

function App() {
  const [numeroAtomico, setNumeroAtomico] = useState(6);
  const [elementoSelecionado, setElementoSelecionado] = useState(6);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [mostrarEletrons, setMostrarEletrons] = useState(true);
  const [forcarNucleoDetalhado, setForcarNucleoDetalhado] = useState(false);
  const [subniveisVisiveis, setSubniveisVisiveis] = useState(SUBNIVEIS_INITIAL);
  const [subniveisAnchor, setSubniveisAnchor] = useState(null);

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
  };

  const handleFecharDialog = () => setDialogAberto(false);

  const elemento = elementosQuimicos[numeroAtomico];

  return (
    <Box sx={{ height: '100vh', width: '100vw', overflow: 'auto', position: 'relative' }}>
      <TabelaPeriodica
        numeroAtomico={numeroAtomico}
        onSelecionarElemento={handleSelecionarElemento}
        elementoSelecionado={elementoSelecionado}
        elementoInfo={
          elemento ? (
            <Paper
              elevation={4}
              sx={{
                zIndex: 1000,
                marginLeft: 50,
                p: 2,
                maxWidth: 320,
                borderLeft: 4,
                borderColor: CATEGORIAS[elemento.categoria]?.cor ?? 'primary.main',
                bgcolor: 'background.paper',
                '& .MuiTypography-root': { color: 'text.primary' }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' }}>
                <Typography color="primary" gutterBottom>
                  Elemento Químico
                </Typography>
                <Typography

                  sx={{
                    color: 'secondary.main',
                    fontWeight: 'bold',
                    my: 1,
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                  }}
                >
                  {elemento.simbolo}
                </Typography>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  {elemento.nome}
                </Typography>
              </Box>

              <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider', fontSize: '0.875rem' }}>
                <Typography variant="caption" display="block">
                  <strong>Nº atômico:</strong> {numeroAtomico} · <strong>Nêutrons:</strong> {elemento.neutroes}
                </Typography>
                <Typography variant="caption" display="block">
                  <strong>Massa:</strong> {elemento.massaAtomica} u · <strong>Raio:</strong> {elemento.raioAtomico} pm
                </Typography>
                <Typography variant="caption" display="block">
                  <strong>Tipo:</strong> {CATEGORIAS[elemento.categoria]?.nome ?? '-'}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1, fontFamily: 'Consolas, monospace' }}>
                  <strong>Config. eletrônica:</strong> {configParaTexto(obterConfiguracaoEletronica(numeroAtomico))}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {['s', 'p', 'd', 'f'].map((t) => (
                    <Typography key={t} variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: SUBLEVEL_COLORS_HEX[t] }} />
                      {t}
                    </Typography>
                  ))}
                </Box>
              </Box>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <TextField
                  label="Nº atômico"
                  type="number"
                  value={numeroAtomico}
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10);
                    if (!isNaN(n) && n >= 1 && n <= 118) {
                      setNumeroAtomico(n);
                      setElementoSelecionado(n);
                    }
                  }}
                  inputProps={{ min: 1, max: 118 }}
                  size="small"
                  sx={{ width: 90 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ScienceIcon />}
                  onClick={handleDesenharAtomo}
                  size="medium"
                >
                  3D
                </Button>
              </Stack>
            </Paper>
          ) : null
        }
      />
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
