import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { Collapse, useTheme } from '@mui/material';
import {LogoBianco} from '../../assets/';
import { itemMenu } from './ItemMenu';
import { Link } from 'react-router-dom';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import useAuth from '../../hooks/useAuth';
import { LOGOUT } from '../../navigation/CONSTANTS';
import { logout } from '../../services/AuthService';

const drawerWidth = 240;

function Sidebar(props) {
    const theme = useTheme();
    const {auth} = useAuth();

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [selectedIndex, setSelectedIndex] = useState({0: 0, 1: null});
    const handleListItemClick = (index, subindex) => {
        setSelectedIndex({0: index, 1: subindex});
    };

    const [openedMenus, setOpenedMenus] = useState({});
    const handleOpenedMenu = (index) => {
        setOpenedMenus((prevState) => ({ ...prevState, [index]: !prevState[index] }));
    }

    //Corregge tutti i problemi relativi al refresh e al back del browser

    /*const location = window.location;
    const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
    const lastActiveSubIndexString = localStorage.getItem("lastActiveSubIndex");
    const lastActiveIndex = Number(lastActiveIndexString);
    const lastActiveSubIndex = Number(lastActiveSubIndexString);

    function changeActiveIndex(newIndex, newSubIndex) {
      localStorage.setItem("lastActiveIndex", newIndex);
      localStorage.setItem("lastActiveSubIndex", newSubIndex);
      handleListItemClick(newIndex, newSubIndex);
  }

  function getPath(path) {
      if (path[0] !== "/") {
          return  "/" + path;
      }
      return path;
  }

  useEffect(()=> {
      //Get an item with the same 'route' as the one provided by react router (the current route)
      const activeItem = itemMenu.findIndex(item=> getPath(item.link) === getPath(location.pathname));
      if(itemMenu[activeItem].subItem === undefined)
        changeActiveIndex(activeItem, null);
      else {
        const activeSubItem = itemMenu[activeItem].findIndex(subItem => getPath(subItem.link) === getPath(location.pathname));
        changeActiveIndex(activeItem, activeSubItem);
      }
  }, [location]);*/
  
    const drawer = (
      <div>
        <Toolbar sx={{justifyContent: "center"}}>
            <img src={LogoBianco} width="100%" alt="Logo bianco"></img>
        </Toolbar>
        <Divider />
        <List>
          {itemMenu.map((pagina, index) => (
            pagina.link ? (
              <ListItem key={pagina.id} component={Link} to={auth?.dipendente?.primoAccesso ? pagina.link === LOGOUT ? pagina.link : "/primoaccesso" : pagina.link} disablePadding sx={{width: '95%', color: theme.palette.white.main, margin: 'auto'}}>
                <ListItemButton selected={selectedIndex[0] === index} disabled={auth?.dipendente?.primoAccesso && pagina.link !== LOGOUT} onClick={() => pagina.link === LOGOUT ? logout() : handleListItemClick(index, null)} sx={{
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.tertiary.lighter,
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: theme.palette.tertiary.lighter,
                  },
                  ":hover": {
                    backgroundColor: theme.palette.tertiary.lighter,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: theme.palette.tertiary.lighter,
                  },
                  borderRadius: '10px',
                  margin: '2px',
                }}>
                  <ListItemIcon sx={{color:theme.palette.white.main}}>
                      {<pagina.icona/>}
                  </ListItemIcon>
                  <ListItemText primary={pagina.nome} />
                </ListItemButton>
              </ListItem>
            ) : (
              <div key={pagina.id+1000}>
              <ListItem key={pagina.id} disablePadding sx={{width: '95%', color: theme.palette.white.main, margin: 'auto'}}>
                  <ListItemButton onClick={() => handleOpenedMenu(index)} disabled={auth?.dipendente?.primoAccesso}>
                    <ListItemIcon sx={{color: theme.palette.white.main}}>
                      {<pagina.icona/>}
                    </ListItemIcon>
                    <ListItemText primary={pagina.nome} />
                    {openedMenus[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
              </ListItem>
              <Collapse in={openedMenus[index]} timeout="auto">
                <List disablePadding>
                  {
                    pagina.subItem.map((sottopagina, subindex) => (
                      <ListItem key={sottopagina.id} component={Link} to={auth?.dipendente?.primoAccesso ? sottopagina.link === LOGOUT ? sottopagina.link : "/primoaccesso" : sottopagina.link} disablePadding sx={{width: '95%', color: theme.palette.white.main, margin: 'auto'}}>
                        <ListItemButton selected={selectedIndex[0] === index && selectedIndex[1] === subindex} disabled={auth?.dipendente?.primoAccesso} onClick={() => handleListItemClick(index, subindex)} sx={{
                          "&.Mui-selected": {
                            backgroundColor: theme.palette.tertiary.lighter,
                          },
                          "&.Mui-focusVisible": {
                            backgroundColor: theme.palette.tertiary.lighter,
                          },
                          ":hover": {
                            backgroundColor: theme.palette.tertiary.lighter,
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: theme.palette.tertiary.lighter,
                          },
                          borderRadius: '10px',
                          margin: '2px',
                        }}>
                          <ListItemText primary={sottopagina.nome} />
                        </ListItemButton>
                      </ListItem>
                    ))
                  }
                </List>
              </Collapse>
              </div>
            )
          ))}
        </List>
      </div>
    );
  
    const container = window !== undefined ? () => window.document.body : undefined;
  
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
          aria-label="sidebar"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: theme.palette.sidebar.main, borderTopRightRadius: '30px', borderBottomRightRadius: '30px' },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: theme.palette.sidebar.main, borderTopRightRadius: '30px', borderBottomRightRadius: '30px' },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    );
}

export default Sidebar