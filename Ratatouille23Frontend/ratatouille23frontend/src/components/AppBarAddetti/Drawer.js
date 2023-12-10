import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon, IconButton, Divider, Toolbar, Box, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { items } from "./ItemAppBar";
import { LogoOrizzontaleBianco } from "../../assets";
import useAuth from "../../hooks/useAuth";
import { LOGOUT } from "../../navigation/CONSTANTS";
import { logout } from "../../services/AuthService";

function DrawerComponent() {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const {auth} = useAuth();

  return (
    <>
      <Drawer
        anchor="top"
        sx={{ width: 250, color: theme.palette.white.main }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Toolbar sx={{ backgroundColor: theme.palette.tertiary.main, color: theme.palette.white.main}}>
          <div style={{flexGrow: 1}}><img src={LogoOrizzontaleBianco} width="30%" alt="Logo" sx={{cursor: 'pointer'}}></img></div>
          <IconButton sx={{color: theme.palette.white.main}} onClick={() => setOpenDrawer(!openDrawer)}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Box sx={{ backgroundColor: theme.palette.tertiary.main }} height="100%">
          <List height="100vh">
            <Divider />
            {
                items?.map(item => (
                    <Box key={item.id}>
                      <ListItem key={item.id} component={Link} to={auth?.dipendente?.primoAccesso ? item.link === LOGOUT ? item.link : "/primoaccesso" : item.link} disablePadding sx={{width: '100%', color: theme.palette.white.main, margin: 'auto'}}>
                        <ListItemButton disabled={auth?.dipendente?.primoAccesso && item.link !== LOGOUT} onClick={() => item.link === LOGOUT ? logout() : {}} sx={{
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
                              {<item.icona/>}
                          </ListItemIcon>
                          <ListItemText primary={item.nome} />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </Box>
                ))
            }
          </List>
        </Box>
      </Drawer>
      <IconButton
        sx={{color: theme.palette.white.main}}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}

export default DrawerComponent;