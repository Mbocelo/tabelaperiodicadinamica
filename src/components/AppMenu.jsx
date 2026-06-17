import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GridOnIcon from '@mui/icons-material/GridOn';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SpeedIcon from '@mui/icons-material/Speed';
import GavelIcon from '@mui/icons-material/Gavel';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { INFO_PAGES } from '../content/appInfoPt';

const DRAWER_WIDTH = 300;

const MENU_SECTIONS = [
  {
    title: 'Como utilizar',
    items: [
      { id: 'manual', label: 'Início rápido', description: 'Primeiros passos na aplicação', Icon: MenuBookIcon },
      { id: 'tabela', label: 'Tabela periódica', description: 'Seleccionar elementos e legenda', Icon: GridOnIcon },
      { id: 'modelo3d', label: 'Modelo 3D', description: 'Controlos e gestos do visualizador', Icon: ThreeDRotationIcon },
      { id: 'mobile', label: 'Telemóvel e tablet', description: 'Layouts em ecrãs pequenos', Icon: PhoneAndroidIcon },
      { id: 'dicas', label: 'Dicas de desempenho', description: 'Melhor fluidez no 3D', Icon: SpeedIcon }
    ]
  },
  {
    title: 'Informação',
    items: [
      { id: 'terms', label: 'Termos de uso', description: 'Condições de utilização', Icon: GavelIcon },
      { id: 'privacy', label: 'Política de privacidade', description: 'Dados e câmara (RA)', Icon: PrivacyTipIcon },
      { id: 'about', label: 'Sobre', description: 'Modelos atómicos, projecto e docs', Icon: InfoOutlinedIcon }
    ]
  }
];

function InfoPageContent({ page }) {
  if (!page) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {page.intro && (
        <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.65 }}>
          {page.intro}
        </Typography>
      )}

      {page.sections?.map((section, index) => (
        <Box key={section.heading ?? index}>
          {section.heading && (
            <Typography
              variant="subtitle2"
              component="h3"
              fontWeight={700}
              color="primary.main"
              sx={{ mb: 0.75 }}
            >
              {section.heading}
            </Typography>
          )}
          {section.text && (
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, mb: section.bullets ? 0.75 : 0 }}>
              {section.text}
            </Typography>
          )}
          {section.bullets?.length > 0 && (
            <Box component="ul" sx={{ m: 0, pl: 2.25 }}>
              {section.bullets.map((item) => (
                <Typography
                  key={item.slice(0, 48)}
                  component="li"
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.65, mb: 0.5 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      ))}

      {/* Compatibilidade: páginas antigas só com body em texto */
      !page.sections && page.body && (
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.65, color: 'text.secondary' }}>
          {page.body}
        </Typography>
      )}
    </Box>
  );
}

/**
 * Barra superior + menu lateral (Drawer temporário) e diálogos de conteúdo informativo.
 */
export function AppMenuBar({ drawerOpen, onOpenDrawer, onDrawerClose, infoPage, onInfoPage, onInfoClose }) {
  const handleItem = (id) => {
    onInfoPage(id);
    onDrawerClose();
  };

  const page = infoPage ? INFO_PAGES[infoPage] : null;

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="primary"
        sx={{
          borderBottom: 1,
          borderColor: 'primary.dark'
        }}
      >
        <Toolbar variant="dense" sx={{ minHeight: 48, gap: 1 }}>
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={onOpenDrawer}
            size="medium"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Tabela Periódica Dinâmica
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={onDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            maxWidth: '88vw',
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderRight: 1,
            borderColor: 'divider'
          }
        }}
      >
        <Box role="presentation" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Toolbar
            sx={{
              minHeight: 56,
              borderBottom: 1,
              borderColor: 'divider',
              px: 2,
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              py: 1.5
            }}
          >
            <Typography variant="subtitle1" component="div" fontWeight={700}>
              Menu
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
              Ajuda, utilização e informação legal
            </Typography>
          </Toolbar>

          <List sx={{ py: 0.5, flex: 1, overflowY: 'auto' }} dense disablePadding>
            {MENU_SECTIONS.map((section, sectionIndex) => (
              <Box key={section.title}>
                {sectionIndex > 0 && <Divider sx={{ my: 0.5 }} />}
                <ListSubheader
                  sx={{
                    bgcolor: 'background.paper',
                    color: 'text.secondary',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    lineHeight: 2.2
                  }}
                >
                  {section.title}
                </ListSubheader>
                {section.items.map(({ id, label, description, Icon }) => (
                  <ListItemButton
                    key={id}
                    onClick={() => handleItem(id)}
                    selected={infoPage === id}
                    sx={{
                      py: 1,
                      '&.Mui-selected': {
                        bgcolor: 'action.selected',
                        borderLeft: 3,
                        borderColor: 'primary.main',
                        pl: 'calc(16px - 3px)'
                      },
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                      <Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      secondary={description}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                      secondaryTypographyProps={{ variant: 'caption', sx: { lineHeight: 1.35 } }}
                    />
                  </ListItemButton>
                ))}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>

      <Dialog
        open={Boolean(page)}
        onClose={onInfoClose}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        aria-labelledby="info-dialog-title"
        PaperProps={{
          sx: { bgcolor: 'background.paper' }
        }}
      >
        {page && (
          <>
            <DialogTitle id="info-dialog-title" sx={{ pb: 1 }}>
              {page.title}
            </DialogTitle>
            <DialogContent dividers>
              <InfoPageContent page={page} />
            </DialogContent>
            <DialogActions sx={{ px: 2, py: 1.5 }}>
              <Button onClick={onInfoClose} variant="contained" color="primary" size="small">
                Fechar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
