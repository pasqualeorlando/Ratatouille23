import React from "react";
import { AppBar, Toolbar, CssBaseline, useTheme, useMediaQuery, Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import { items } from "./ItemAppBar";
import { LogoOrizzontaleBianco } from "../../assets";
import useAuth from "../../hooks/useAuth";
import { LOGOUT } from "../../navigation/CONSTANTS";
import { logout } from "../../services/AuthService";

function AppBarAddetti() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {auth} = useAuth();
   
  return (
    <AppBar position="fixed" sx={{backgroundColor: theme.palette.tertiary.main, color: theme.palette.white.main}}>
      <CssBaseline />
      <Toolbar sx={{color: theme.palette.white.main}}>
        <Box sx={{flexGrow: 1}}><Link to="/"><img src={LogoOrizzontaleBianco} alt="Logo" style={{cursor: 'pointer', height: '64px'}}></img></Link></Box>
        {isMobile ? (
          <DrawerComponent />
        ) : (
            <List sx={{display: 'flex', flexDirection: 'row'}}>
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
                          <ListItemText primary={item.nome} />
                        </ListItemButton>
                      </ListItem>
                    </Box>
                ))
              }
            </List>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default AppBarAddetti;