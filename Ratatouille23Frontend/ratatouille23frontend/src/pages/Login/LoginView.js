import React from 'react';
import {LogoBianco} from '../../assets/';
import { useTheme } from '@mui/material/styles';
import { Button, CssBaseline, TextField, Paper, Box, Grid, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { signin } from '../../services/AuthService';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginView = () => {
  const theme = useTheme();

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signin(email, password);
      const token = response?.data?.token;
      const dipendente = response?.data?.dipendente;

      //console.log(JSON.stringify(response?.data));
      setAuth({dipendente, token});

      localStorage.setItem('token', token);
      localStorage.setItem('dipendente', JSON.stringify(dipendente));

      setEmail('');
      setPassword('');

      navigate(from, {replace: true});
    } catch(err) {
      console.log(err);
      if(!err?.response)
        setErrMsg('Nessuna risposta dal server');
      else if(err?.response.status === 403 || err?.response.status ===  401)
        setErrMsg('Credenziali errate');
      else
        setErrMsg('Login fallito');

      errRef.current.focus();
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token') && JSON.parse(localStorage.getItem('dipendente'))) {
      setAuth({dipendente: JSON.parse(localStorage.getItem('dipendente')), token: localStorage.getItem('token')});
      navigate("/");
    }
  }, [setAuth, navigate]);

  return (
    <Grid container component="main" sx={{ height: '100vh', backgroundColor: theme.palette.white.main }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        lg={6}
        sx={{
          backgroundRepeat: 'no-repeat',
          background: "linear-gradient(90deg, " + theme.palette.secondary.main + " 0%, " + theme.palette.primary.main + " 100%)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          justifyContent: 'center',
          borderBottomRightRadius: 9000,
          borderTopRightRadius: 9000,
          '@media screen and (max-width: 900px)': {
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          },
        }}
        display="flex" justifyContent="center" alignItems="center">
          <img width="75%" src={LogoBianco} title="Logo" alt="Logo"></img>
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={6} component={Paper} elevation={0} square container
      justifyContent="center"
      direction="row"
      alignItems="center">
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Typography align="center" component="h1" variant="h3">
          Benvenuto/a!
          </Typography>
          {
            errMsg ? <p ref={errRef} style={{color: theme.palette.fourtiary.main}}>{errMsg}</p> : <p ref={errRef}></p>
          }
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="off"
            autoFocus
            ref={emailRef}
            onChange={(e) => {setEmail(e.target.value)}}
            value={email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => {setPassword(e.target.value)}}
            value={password}
          />
          <Box 
            sx={{width: 1/4}}
            m="auto">
            <Button
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entra
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginView;