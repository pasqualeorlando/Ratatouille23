import React, { useState } from 'react';
import { Modal, Box, Grid, Paper, TextField, Select, MenuItem, Button, Typography, FormControl, InputLabel, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme } from '@mui/system';
import { aggiungiDipendente } from '../../../services/DipendenteService';

const FormInserimentoDipendente = (props) => {
  const theme = useTheme();
  
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ruolo, setRuolo] = useState("");

  const {handleOpenModaleSuccesso, handleOpenModaleErrore, setRows, rows, open, handleClose} = props;

  const formHandler = async (e) => {
      e.preventDefault();

      const dipendente = {
        nome, cognome, email, password, ruolo
      };

      const response = await aggiungiDipendente(dipendente);
      if(response.status === 201) {

        const dati = response.data;
        dati['id'] = dati['idDipendente'];
        delete dati['idDipendente'];
        
        setRows([...rows, dati]);
        handleOpenModaleSuccesso();

        setNome("");
        setCognome("");
        setEmail("");
        setPassword("");
        setRuolo("");
      }
      else if(response.status === 409)
        handleOpenModaleErrore();
  };

  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4,
    '@media screen and (max-width: 900px)': {width: '85%'}, borderRadius: '10px'}}>
            <Typography variant="h6" component="h2" sx={{fontWeight: 'bold'}}>
                    Inserisci dipendente
            </Typography>
            <IconButton onClick={()=>handleClose()} sx={{position: 'absolute', left: '85%', top: '5%', color: theme.palette.secondary.main}}>
                <CancelIcon></CancelIcon>
            </IconButton>
            <Grid item xs={12} sm={12} md={12} lg={12} component={Paper} elevation={0} square container
            justifyContent="center"
            direction="row"
            alignItems="center">
                <Box component="form" sx={{ mt: 1 }} onSubmit={formHandler}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nome"
                        label="Nome"
                        type="text"
                        autoFocus
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Cognome"
                        type="text"
                        id="cognome"
                        onChange={(e) => setCognome(e.target.value)}
                        value={cognome}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Ruolo *</InputLabel>
                        <Select
                            required
                            labelId="selectRuolo"
                            id="selectRuolo"
                            label="Ruolo"
                            onChange={(e) => setRuolo(e.target.value)}
                            fullWidth
                            defaultValue=""
                            value={ruolo}
                        >
                            <MenuItem value="Supervisore">Supervisore</MenuItem>
                            <MenuItem value="Addetto alla sala">Addetto alla sala</MenuItem>
                            <MenuItem value="Addetto alla cucina">Addetto alla cucina</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        id="email"
                        value={email}
                        
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                            Inserisci dipendente
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Box>
    </Modal>
  )
}

export default FormInserimentoDipendente