import React from 'react'
import { useState } from 'react';
import { Box, TextField, Button, useTheme } from '@mui/material';
import ModaleSuccessoErrore from '../../components/Modali/ModaleSuccessoErrore';
import { MESSAGGIO_ERRORE_PASSWORD_NON_COINCIDONO, MESSAGGIO_MODIFICHE_EFFETTUATE, TESTO_BUTTON_OK, TIPO_ERRORE, TIPO_SUCCESSO, TITOLO_ERRORE_PASSWORD_NON_COINCIDONO, TITOLO_MODIFICHE_EFFETTUATE } from '../../components/CONSTANTS';
import { useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { modificaCredenziali } from '../../services/AuthService';

const PrimoAccesso = () => {
  const theme = useTheme();

  const {auth, setAuth} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const passwordRef = useRef();
  const confermaPasswordRef = useRef();
  const errRef = useRef();

  const [password, setPassword] = useState('');
  const [confermaPassword, setConfermaPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [openModaleErrore2, setOpenModaleErrore2] = useState(false);
  const handleOpenModaleErrore2 = () => {
    setOpenModaleErrore2(true);
  }
  const handleCloseModaleErrore2 = () => {
    setOpenModaleErrore2(false);
  }

  const [openModaleSuccesso, setOpenModaleSuccesso] = useState(false);
  const handleOpenModaleSuccesso = () => {
    setOpenModaleSuccesso(true);
  }
  const handleCloseModaleSuccesso = () => {
    setOpenModaleSuccesso(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.target.value !== confermaPassword.target.value)
        handleOpenModaleErrore2()
    else {
        try{
            const dipendente = auth?.dipendente;
            const dipendenteDaInviare = {vecchiaEmail: dipendente.email, nuovaEmail: dipendente.email, vecchiaPassword: password.target.value, nuovaPassword: password.target.value};

            const response = await modificaCredenziali(dipendenteDaInviare);

            const token = response?.data?.token;
            const newDipendente = response?.data?.dipendente;


            setAuth({dipendente: newDipendente, token: token});
            localStorage.setItem('token', token);
            localStorage.setItem('dipendente', JSON.stringify(newDipendente));

            handleOpenModaleSuccesso();

            navigate(from, {replace: true});
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
  }
  
  return (
    <>
    <br/><br/><h1>Reimposta password</h1><br/>
    {
        errMsg ? <p ref={errRef} style={{color: theme.palette.fourtiary.main}}>{errMsg}</p> : <p ref={errRef}></p>
    }
    <Box component="form" sx={{ width: 1/2, mt: 1, '@media screen and (max-width: 900px)': {width: '100%'} }} onSubmit={(e) => handleSubmit(e)}>
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
            ref={passwordRef}
            onChange={setPassword}
            //inputProps={{pattern: "/((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{8,64})/g"}}
            //helperText="Inserire una password di almeno 8 caratteri, contentente almeno una lettera maiuscola, una minuscola e un numero. Può contenere simboli."
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="confermaPassword"
            label="Conferma password"
            type="password"
            id="confermaPassword"
            color="secondary"
            sx={{backgroundColor: theme.palette.white.main}}
            ref={confermaPasswordRef}
            onChange={setConfermaPassword}
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
    <ModaleSuccessoErrore open={openModaleErrore2} handleClose={handleCloseModaleErrore2} titolo={TITOLO_ERRORE_PASSWORD_NON_COINCIDONO} messaggio={MESSAGGIO_ERRORE_PASSWORD_NON_COINCIDONO} testoButton={TESTO_BUTTON_OK} tipo={TIPO_ERRORE}/>
    <ModaleSuccessoErrore open={openModaleSuccesso} handleClose={handleCloseModaleSuccesso} titolo={TITOLO_MODIFICHE_EFFETTUATE} messaggio={MESSAGGIO_MODIFICHE_EFFETTUATE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
    </>
  )
}

export default PrimoAccesso