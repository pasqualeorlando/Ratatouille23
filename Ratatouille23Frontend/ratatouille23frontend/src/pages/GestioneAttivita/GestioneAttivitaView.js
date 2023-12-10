import { Button, TextField, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TITOLO_MODIFICHE_EFFETTUATE, MESSAGGIO_MODIFICHE_EFFETTUATE, TIPO_SUCCESSO, TESTO_BUTTON_OK } from '../../components/CONSTANTS';
import { ModaleSuccessoErrore } from '../../components/Modali';

const GestioneAttivitaView = (props) => {
  const {attivita, tavoli, aggiornaTavoli} = props;
  const [numeroTavoli, setNumeroTavoli] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }

  useEffect(() => {
    setNumeroTavoli(tavoli.length > 0 ? tavoli[tavoli.length - 1].numeroTavolo : 0);
  }, [tavoli]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await aggiornaTavoli(numeroTavoli);

      handleOpen();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <br/><br/><h1>Gestione attività</h1><br/>
    <Box component="form" sx={{ width: 1/4, mt: 1, '@media screen and (max-width: 900px)': {width: '100%'} }} onSubmit={(e) => handleSubmit(e)}>
        <h4>Nome Attività</h4>
        <TextField id="nomeAttivita" fullWidth variant="filled" disabled defaultValue={attivita.nome}></TextField>
        <h4 style={{marginTop: '15px'}}>Partita IVA</h4>
        <TextField id="pIva" variant="filled" disabled defaultValue={attivita.pIva} fullWidth></TextField>
        <h4 style={{marginTop: '15px'}}>Indirizzo</h4>
        <TextField id="indirizzo" variant="filled" disabled defaultValue={attivita.indirizzo} fullWidth></TextField>
        <h4 style={{marginTop: '15px'}}>Numero tavoli</h4>
        <TextField type="number" inputProps={{step: 1, min: 1}} required variant="filled" id="numeroTavoli" value={numeroTavoli} sx={{width: '80px'}} onChange={(e) => setNumeroTavoli(e.target.value)}></TextField><br/>
        <Box display="flex" alignItems="center" justifyContent="center">
            <Button variant="contained" sx={{marginTop: '15px'}} type="submit"><b>Salva Modifiche</b></Button>
        </Box>
    </Box>
    <ModaleSuccessoErrore open={open} handleClose={handleClose} titolo={TITOLO_MODIFICHE_EFFETTUATE} messaggio={MESSAGGIO_MODIFICHE_EFFETTUATE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
    </>
  )
}

export default GestioneAttivitaView