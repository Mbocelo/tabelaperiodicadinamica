import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GavelIcon from '@mui/icons-material/Gavel';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { INFO_PAGES } from '../content/appInfoPt';

const DRAWER_WIDTH = 280;

const MENU_ITEMS = [
  { id: 'manual', label: 'Manual de uso', Icon: MenuBookIcon },
  { id: 'terms', label: 'Termos de uso', Icon: GavelIcon },
  { id: 'privacy', label: 'Política de privacidade', Icon: PrivacyTipIcon },
  { id: 'about', label: 'Sobre', Icon: InfoOutlinedIcon }
];

/**
 * Barra superior + menu lateral (Drawer temporário) e diálogos de conteúdo informativo.
 * @see https://mui.com/material-ui/react-drawer/
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
        sx={{
          bgcolor: '#1e1e1e',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
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
          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>
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
            bgcolor: '#252525',
            color: 'rgba(255,255,255,0.95)',
            borderRight: '1px solid rgba(255,255,255,0.08)'
          }
        }}
      >
        <Box role="presentation" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Toolbar
            sx={{
              minHeight: 56,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              px: 2
            }}
          >
            <Typography variant="subtitle1" component="div" fontWeight={600}>
              Menu
            </Typography>
          </Toolbar>
          <List sx={{ py: 1, flex: 1 }} dense>
            {MENU_ITEMS.map(({ id, label, Icon }) => (
              <ListItemButton
                key={id}
                onClick={() => handleItem(id)}
                sx={{
                  '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.12)' }
                }}
              >
                <ListItemIcon sx={{ color: 'primary.light', minWidth: 40 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={label} primaryTypographyProps={{ variant: 'body2' }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Dialog
        open={Boolean(page)}
        onClose={onInfoClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
        aria-labelledby="info-dialog-title"
        PaperProps={{
          sx: { bgcolor: 'background.paper' }
        }}
      >
        {page && (
          <>
            <DialogTitle id="info-dialog-title">{page.title}</DialogTitle>
            <DialogContent dividers>
              <Typography
                component="div"
                variant="body2"
                sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.65, color: 'text.primary' }}
              >
                {page.body}
              </Typography>
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
