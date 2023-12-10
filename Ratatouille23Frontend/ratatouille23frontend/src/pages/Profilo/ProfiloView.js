import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { Box, TextField, Button, useTheme } from '@mui/material';
import ModaleSuccessoErrore from '../../components/Modali/ModaleSuccessoErrore';
import { MESSAGGIO_MAIL_ESISTENTE, MESSAGGIO_MODIFICHE_EFFETTUATE, TESTO_BUTTON_OK, TIPO_ERRORE, TIPO_SUCCESSO, TITOLO_MAIL_ESISTENTE, TITOLO_MODIFICHE_EFFETTUATE } from '../../components/CONSTANTS';
import useAuth from '../../hooks/useAuth';
import { modificaCredenziali } from '../../services/AuthService';
import { ottieniDipendenti } from '../../services/DipendenteService';

const ProfiloView = () => {
  const theme = useTheme();

  const [openModaleErrore, setOpenModaleErrore] = useState(false);
  const handleOpenModaleErrore = () => {
    setOpenModaleErrore(true);
  }
  const handleCloseModaleErrore = () => {
    setOpenModaleErrore(false);
  }

  const [openModaleSuccesso, setOpenModaleSuccesso] = useState(false);
  const handleOpenModaleSuccesso = () => {
    setOpenModaleSuccesso(true);
  }
  const handleCloseModaleSuccesso = () => {
    setOpenModaleSuccesso(false);
  }

  const {auth, setAuth} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const errRef = useRef();

  useEffect(() => {
    setEmail(auth?.dipendente?.email || '');
    setPassword('');
  }, [auth?.dipendente?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const dipendente = auth?.dipendente;
      const dipendenteDaInviare = {vecchiaEmail: dipendente?.email, nuovaEmail: email, vecchiaPassword: dipendente?.password, nuovaPassword: password};

      const dipendenti = await ottieniDipendenti();
      if(dipendenti?.map(dip => dip.email).includes(email) && email !== dipendente?.email) {
        handleOpenModaleErrore();
        return;
      }
      
      const response = await modificaCredenziali(dipendenteDaInviare);

      const token = response?.data?.token;
      const newDipendente = response?.data?.dipendente;

      setAuth({dipendente: newDipendente, token: token});

      setEmail(newDipendente?.email);
      setPassword('');

      handleOpenModaleSuccesso();

  } catch(err) {
      console.log(err);
      if(!err?.response)
          setErrMsg('Nessuna risposta dal server');
      else if(err?.response.status === 403 || err?.response.status ===  401)
          setErrMsg('Autenticazione fallita');
      else
          setErrMsg('Autenticazione fallita');

      errRef.current.focus();
    }
  } 
  
  return (
    <>
    <br/><br/><h1>Modifica profilo</h1><br/>
    {
        errMsg ? <p ref={errRef} style={{color: theme.palette.fourtiary.main}}>{errMsg}</p> : <p ref={errRef}></p>
    }
    <Box component="form" sx={{ width: 1/2, mt: 1, '@media screen and (max-width: 900px)': {width: '100%'} }} onSubmit={(e) => handleSubmit(e)}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoFocus
            sx={{backgroundColor: theme.palette.white.main}}
            color="secondary"
            value={email}
            onChange = {(e) => setEmail(e.target.value)}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Nuova password"
            name="password"
            type="password"
            autoFocus
            sx={{backgroundColor: theme.palette.white.main}}
            color="secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <Box sx={{width: 1/2}} m="auto">
            <Button
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Salva modifiche
            </Button>
        </Box>
    </Box>
    <ModaleSuccessoErrore open={openModaleErrore} handleClose={handleCloseModaleErrore} titolo={TITOLO_MAIL_ESISTENTE} messaggio={MESSAGGIO_MAIL_ESISTENTE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_ERRORE}/>
    <ModaleSuccessoErrore open={openModaleSuccesso} handleClose={handleCloseModaleSuccesso} titolo={TITOLO_MODIFICHE_EFFETTUATE} messaggio={MESSAGGIO_MODIFICHE_EFFETTUATE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
    </>
  )
}

export default ProfiloView