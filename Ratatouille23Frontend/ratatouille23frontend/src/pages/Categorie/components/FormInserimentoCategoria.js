import { Checkbox, FormControl, FormGroup, FormLabel, useTheme } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { Modal, Box, Grid, Paper, TextField, Button, Typography, FormControlLabel, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { aggiungiCategoria, eliminaCategoria, modificaCategoria } from '../../../services/CategoriaService';
import { aggiungiCategoriaMenu, eliminaCategoriaMenu, ottieniCategorieMenuDaIdCategoria, ottieniCategorieMenuDaIdMenu } from '../../../services/CategoriaMenuService';

const FormInserimentoCategoria = (props) => {
  const theme = useTheme();

  const {open, modalita, categoria, categorie, setCategorie, handleClose, handleOpenModaleSuccesso, handleOpenModaleSuccesso2, handleOpenModaleErrore, handleOpenModaleErrore2, menus} = props;
  const [nome, setNome] = useState('');
  const [menuSelezionati, setMenuSelezionati] = useState([]);

  useEffect(() => {
    setNome(categoria?.nome || '');
    
    categoria?.menu ? setMenuSelezionati(categoria.menu) : setMenuSelezionati([]);
  }, [categoria, open]);

  const handleChangeCheckbox = (e) => {
    const idMenu = Number.parseInt(e.target.value);
    const index = menuSelezionati?.map(m => m.idMenu).indexOf(idMenu);
    if(index === -1) {
      const indice = menus.map(m => m.idMenu).indexOf(idMenu);
      const menuDaInserire = menus[indice];
      setMenuSelezionati([...menuSelezionati, menuDaInserire]);
    }
    else {
      setMenuSelezionati([...menuSelezionati.slice(0, index), ...menuSelezionati.slice(index+1)]);
    }
  }

  const formHandler = async (event) => {
      event.preventDefault();

      if(modalita === 'Inserimento') {
        if(menuSelezionati.length === 0) {
          handleOpenModaleErrore2();
          return;
        }
        const categoria = {nome: nome, menu: []};
        
        let response =  await aggiungiCategoria(categoria);
        if(response != null) {
          response.menu = [];

          let categoriaMenu = {};

          for(const menu of menuSelezionati) {
            const categoriemenu = await ottieniCategorieMenuDaIdMenu(menu.idMenu);

            categoriaMenu = {
              idMenu: menu.idMenu,
              idCategoria: response.idCategoria,
              nomeCategoria: categoria.nome,
              nomeMenu: menu.nome,
              abilitato: true,
              posizioneCategoria: categoriemenu.length + 1,
            };

            //console.log(categoriemenu);
            
            if(categoriemenu && categoriemenu.map(cm => cm.nomeCategoria)?.indexOf(categoriaMenu.nomeCategoria) !== -1) {
              const res = await eliminaCategoria(response.idCategoria);
              if(res.status === 200) {
                response = null;
                handleOpenModaleErrore();
              }
            } else {
              const res = await aggiungiCategoriaMenu(categoriaMenu);
              if(res !== null)
                response.menu.push(res);
              else {
                const res = await eliminaCategoria(response.idCategoria);
                if(res.status === 200) {
                  response = null;
                }
              }
            }
          }
        }
        if(response != null) {
          setCategorie([...categorie, response]);
          handleOpenModaleSuccesso2();
        } else {
          setCategorie([...categorie]);
        }
      } else { //MODALITA MODIFICA

        if(menuSelezionati.length === 0) {
          handleOpenModaleErrore2();
          return;
        }
        let newCatMenu = [];
        let categoriaMenu = {};
        let errore = false;
        const categoriemenu = await ottieniCategorieMenuDaIdCategoria(categoria?.idCategoria);

        const cat = {idCategoria: categoria.idCategoria, nome: nome, menu: []}

        for(const menu of menuSelezionati) {
          const catMenuSingolo = await ottieniCategorieMenuDaIdMenu(menu.idMenu);
          
          if(catMenuSingolo === undefined) {
            const index = catMenuSingolo.map(cm => cm.idCategoria).indexOf(cat.idCategoria)
            if(index !== -1 && catMenuSingolo[index].nomeCategoria === cat.nome)
              continue;

            if(catMenuSingolo.map(cm => cm.nomeCategoria).indexOf(cat.nome) !== -1) {
              errore = true;
            }
          }
        }

        
        if(!errore) {
          //Aggiorno il nome
          const response = await modificaCategoria(cat);
          if(response === null)
            return;

          //Elimino i menu non selezionati
          for(const cm of categoriemenu) {
            if(menuSelezionati.map(menu => menu.idMenu).indexOf(cm.idMenu) === -1) {
              const response = await eliminaCategoriaMenu(cm.idCategoriaMenu);
              if(response.status !== 200) {
                await aggiungiCategoriaMenu(cm);
              }
            }
          }

          //Aggiungo i menu selezionati
          for(const menu of menuSelezionati) {
              const catMenuSingolo = await ottieniCategorieMenuDaIdMenu(menu.idMenu);

              const index = categoriemenu.map(cm => cm.idMenu).indexOf(menu.idMenu);
              if(index === -1) {

                categoriaMenu = {
                  idMenu: menu.idMenu,
                  idCategoria: categoria.idCategoria,
                  nomeCategoria: categoria.nome,
                  nomeMenu: menu.nomeMenu,
                  abilitato: true,
                  posizioneCategoria: catMenuSingolo === null ? 1 : catMenuSingolo.length + 1,
                }

                const response = await aggiungiCategoriaMenu(categoriaMenu);
                if(response !== null) {
                  newCatMenu.push(response);
                } else {
                  break;
                }
              } else {
                newCatMenu.push(categoriemenu[index]);
              }
          }
          response.menu = newCatMenu;
          const index = categorie.map(c => c.idCategoria).indexOf(categoria.idCategoria);
          setCategorie([...categorie.slice(0, index), response, ...categorie.slice(index+1)]);
          handleOpenModaleSuccesso();
        } else {
          handleOpenModaleErrore();
        }
      };
    }

  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4,
    '@media screen and (max-width: 900px)': {width: '85%'}, borderRadius: '10px'}}>
            <Typography variant="h6" component="h2" sx={{fontWeight: 'bold'}}>
                    {modalita === 'Inserimento' ? 'Inserisci categoria' : 'Modifica categoria'}
            </Typography>
            <IconButton onClick={()=>handleClose()} sx={{position: 'absolute', left: '85%', top: '5%', color: theme.palette.secondary.main}}>
                <CancelIcon></CancelIcon>
            </IconButton>
            <Grid item xs={12} sm={12} md={12} lg={12} component={Paper} elevation={0} square container
            justifyContent="center"
            direction="row"
            alignItems="center">
                <Box component="form" sx={{ mt: 1 }} onSubmit={(e) => formHandler(e)}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nome"
                        label="Nome"
                        name="nome"
                        type="text"
                        autoFocus
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                    />
                    <FormControl component="fieldset" variant="standard" required>
                      <FormLabel>Menu</FormLabel>
                      <FormGroup required>
                        {
                          menus?.map((menu) => (
                            <FormControlLabel 
                              key={menu.idMenu} 
                              control={<Checkbox key={menu.idMenu} value={menu.idMenu} checked={menuSelezionati.some((m) => m.idMenu === menu.idMenu)} onChange={(e) => handleChangeCheckbox(e)} name="menu"/>}
                              label={menu.nome}
                              value={menu.idMenu}
                              labelPlacement="end"
                            />
                          ))
                        }
                      </FormGroup>
                    </FormControl>
                    <Box
                        sx={{width: 1/2}}
                        m="auto">
                        <Button
                            color="primary"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {modalita === 'Inserimento' ? 'Inserisci categoria' : 'Modifica categoria'}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Box>
    </Modal>
  )
}

export default FormInserimentoCategoria