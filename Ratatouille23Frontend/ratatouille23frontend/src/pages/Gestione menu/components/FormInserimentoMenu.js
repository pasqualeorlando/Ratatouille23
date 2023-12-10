import { useTheme } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { Modal, Box, Grid, Paper, TextField, Button, Typography, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { aggiungiMenu, modificaMenu } from '../../../services/MenuService';

const FormInserimentoMenu = (props) => {
  const theme = useTheme();

  const {open, modalita, row, setMenus, handleClose, handleOpenModaleSuccesso, handleOpenModaleSuccesso2, handleOpenModaleErrore, menus} = props;
  const [nome, setNome] = useState('');

  useEffect(() => {
    setNome(row?.nome || '');
  }, [row]);

  const formHandler = async (event) => {
    event.preventDefault();

    if(modalita === 'Inserimento') {
      if(menus.map(m => m.nome).indexOf(nome) !== -1) {
        handleOpenModaleErrore();
      } else {
        const menuDaInserire = {
          nome: nome,
          abilitato: true,
        };

        const response = await aggiungiMenu(menuDaInserire);
        if(response != null) {
          handleOpenModaleSuccesso2();
          setMenus([...menus, response]);
        }
      }
    } else {          
      const index = menus.map(m => m.idMenu).indexOf(row?.idMenu);
      if(index !== -1 && menus[index].nome === nome)
        return;

      if(menus.map(m => m.nome).indexOf(nome) !== -1) {
        handleOpenModaleErrore();
      } else {
        const menuAggiornato = {
          idMenu: row?.idMenu,
          nome: nome,
          abilitato: row?.abilitato,
        }

        const response = await modificaMenu(menuAggiornato);
        if(response != null) {
          handleOpenModaleSuccesso();
          const index = menus.map(m => m.idMenu).indexOf(response.idMenu);
          setMenus([...menus.slice(0, index), response, ...menus.slice(index+1)]);
        }
      }

    }
  };

  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4,
    '@media screen and (max-width: 900px)': {width: '85%'}, borderRadius: '10px'}}>
            <Typography variant="h6" component="h2" sx={{fontWeight: 'bold'}}>
                    {modalita === 'Inserimento' ? 'Inserisci menù' : 'Modifica menù'}
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
                            {modalita === 'Inserimento' ? 'Inserisci menù' : 'Modifica menù'}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Box>
    </Modal>
  )
}

export default FormInserimentoMenu