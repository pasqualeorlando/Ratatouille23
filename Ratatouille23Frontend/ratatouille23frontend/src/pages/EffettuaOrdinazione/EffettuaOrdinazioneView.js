import React, { useEffect } from 'react'
import { useState } from 'react';
import { FormControl, Select, InputLabel, MenuItem, useTheme, Box, Button, Grid, IconButton, Typography} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ModaleConfermaAnnulla, ModaleSuccessoErrore } from '../../components/Modali';
import { MESSAGGIO_ANNULLA_ORDINAZIONE, MESSAGGIO_ERRORE_INSERIMENTO_ORDINAZIONE, MESSAGGIO_ERRORE_ORDINAZIONE_VUOTA, MESSAGGIO_ORDINAZIONE_INVIATA, TESTO_BUTTON_CONFERMA, TESTO_BUTTON_OK, TIPO_CONFERMA, TIPO_ERRORE, TIPO_SUCCESSO, TITOLO_ANNULLA_ORDINAZIONE, TITOLO_ERRORE_INSERIMENTOO_ORDINAZIONE, TITOLO_ERRORE_ORDINAZIONE_VUOTA, TITOLO_ORDINAZIONE_INVIATA } from '../../components/CONSTANTS';
import ModaleAggiungiPiattoOrdinazione from './components/ModaleAggiungiPiattoOrdinazione';
import ModaleVisualizzaOrdinazione from './components/ModaleVisualizzaOrdinazione';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { aggiungiOrdinazione } from '../../services/OrdinazioneService';
import {v4 as uuid} from 'uuid';
import { aggiungiPreparazioniMultiple } from '../../services/PreparazionePiattiOrdinazioneService';

const Piatto = (props) => {
    const {piatto, handleOpenModaleInfoPiatto, handleOpenModaleAggiungiPiatto} = props;
    const theme = useTheme();

    const ottieniInfoPiatto = (descrizione, allergeni) => {
      let messaggio = "";
      let allergeniList = '';

      if(!allergeni || allergeni.length === 0)
        allergeniList = 'Nessuno';
      else
        allergeniList = allergeni.join(', ');

      messaggio = descrizione ? descrizione : "Nessuna descrizione specificata";
      messaggio = messaggio.concat("\nAllergeni: ", allergeniList);
      
      return messaggio;
    }

    /*let allergeniList;
    if(!piatto.allergeni || piatto.allergeni.length === 0)
        allergeniList = 'Nessuno'
    else
        allergeniList = piatto.allergeni.join(',');

    let messaggio = "";
    piatto.descrizione ? messaggio = piatto.descrizione : messaggio = "Nessuna descrizione specificata";
    messaggio = messaggio.concat("\nAllergeni: ", allergeniList);*/

    const messaggio = ottieniInfoPiatto(piatto?.descrizione, piatto?.allergeni);

    return(
        <Box boxShadow={3} sx={{padding: '2px', width: '100%', height: '100%', borderRadius: '15px', display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', backgroundColor: theme.palette.grey.main,'&:hover' : {backgroundColor: theme.palette.grey.dark}}}>
            <Button sx={{height: '100%', width: '100%', color: theme.palette.black.main, fontWeight: 'bold'}} onClick={handleOpenModaleAggiungiPiatto}>
                    {piatto.nome}
            </Button>
            <IconButton onClick={() => handleOpenModaleInfoPiatto(piatto.nome, messaggio)}><InfoIcon/></IconButton>
        </Box>
    );
}

const EffettuaOrdinazioneView = (props) => {
  const theme = useTheme();
  const {tavolo, menu, preparazioni, setPreparazioni, idDipendente, handleCloseNuovaOrdinazione} = props;

  const [categoriaSelezionata, setCategoriaSelezionata] = useState('');

  const [menuSelezionato, setMenuSelezionato] = useState();
  const handleChange = (newMenu) => {
    setMenuSelezionato(newMenu ? newMenu : '');
    setCategoriaSelezionata(newMenu.categorie.length > 0 ? newMenu.categorie[0] : '');
  }

  useEffect(() => {
    setMenuSelezionato(menu.length > 0 ? menu[0] : '');
    setCategoriaSelezionata(menu.length > 0 ? menu[0].categorie.length > 0 ? menu[0].categorie[0] : {} : {});
  }, [menu]);

  //Modale info piatto
  const [openModaleInfoPiatto, setOpenModaleInfoPiatto] = useState({0: false, 1: null, 2: null});
  const handleOpenModaleInfoPiatto = (titolo, messaggio) => {
    setOpenModaleInfoPiatto({0: true, 1: titolo, 2: messaggio});
  }
  const handleCloseModaleInfoPiatto = () => {
    setOpenModaleInfoPiatto({0: false, 1: null, 2: null});
  }

  //Modale conferma ordinazione
  const [openModaleConfermaOrdinazione, setOpenModaleConfermaOrdinazione] = useState(false);
  const handleCloseModaleConfermaOrdinazione = () => {
    setOpenModaleConfermaOrdinazione(false);
  }
  const handleOpenModaleConfermaOrdinazione = () => {
    setOpenModaleConfermaOrdinazione(true);
  }

  //Modale errore ordinazione vuota
  const [openModaleOrdinazioneVuota, setOpenModaleOrdinazioneVuota] = useState(false);
  const handleCloseModaleOrdinazioneVuota = () => {
    setOpenModaleOrdinazioneVuota(false);
  }
  const handleOpenModaleOrdinazioneVuota = () => {
    setOpenModaleOrdinazioneVuota(true);
  }

  //Modale aggiungi piatto ordinazione
  const [openModaleAggiungiPiatto, setOpenModaleAggiungiPiatto] = useState({0: false, 1: null});
  const handleCloseModaleAggiungiPiatto = () => {
    setOpenModaleAggiungiPiatto({0: false, 1: null});
  }
  const handleOpenModaleAggiungiPiatto = (piatto) => {
    setOpenModaleAggiungiPiatto({0: true, 1: piatto});
  }

  //Modale visualizza ordinazione
  const [openModaleVisualizzaOrdinazione, setOpenModaleVisualizzaOrdinazione] = useState(false);
  const handleCloseModaleVisualizzaOrdinazione = () => {
    setOpenModaleVisualizzaOrdinazione(false);
  }
  const handleOpenModaleVisualizzaOrdinazione = () => {
    setOpenModaleVisualizzaOrdinazione(true);
  }

  //Modale errore inserimento ordinazione
  const [openModaleErroreInserimentoOrdinazione, setOpenModaleErroreInserimentoOrdinazione] = useState(false);
  const handleCloseModaleErroreInserimentoOrdinazione = () => {
    setOpenModaleErroreInserimentoOrdinazione(false);
  }
  const handleOpenModaleErroreInserimentoOrdinazione = () => {
    setOpenModaleErroreInserimentoOrdinazione(true);
  }

  //Modale torna ai tavoli
  const [openModaleTornaTavoli, setOpenModaleTornaTavoli] = useState(false);
  const handleCloseModaleTornaTavoli = () => {
    setOpenModaleTornaTavoli(false);
  }
  const handleOpenModaleTornaTavoli = () => {
    setOpenModaleTornaTavoli(true);
  }

  const handleConfermaOrdinazione = async () => {
    if(preparazioni.length === 0)
      handleOpenModaleOrdinazioneVuota();
    else {
      const data = new Date();
      let orarioOrdinazione = data.getFullYear()+'-';
  
      if((data.getMonth() + 1) < 10)
          orarioOrdinazione += '0'
      orarioOrdinazione += (data.getMonth() + 1) + '-';
  
      if(data.getDate() < 10)
          orarioOrdinazione += '0';
      orarioOrdinazione += data.getDate() + 'T';
  
      if(data.getHours() < 10)
          orarioOrdinazione += '0';
      orarioOrdinazione += data.getHours() + ':';
  
      if(data.getMinutes() < 10)
          orarioOrdinazione += '0';
      orarioOrdinazione += data.getMinutes() + ':';
  
      if(data.getSeconds() < 10)
          orarioOrdinazione += '0';
      orarioOrdinazione += data.getSeconds();
  
      const nuovaOrdinazione = {
          orarioOrdinazione: orarioOrdinazione,
          idDipendente: idDipendente,
          idTavolo: tavolo.tavolo.idTavolo,
      }
  
      const ordinazioneCreata = await aggiungiOrdinazione(nuovaOrdinazione);
      if(ordinazioneCreata !== null) {
        for(const prep of preparazioni)
          prep.idOrdinazione = ordinazioneCreata.idOrdinazione;

        const preparazioniAggiunte = await aggiungiPreparazioniMultiple(preparazioni);
        if(preparazioniAggiunte != null)
          handleOpenModaleConfermaOrdinazione();
        else
          handleOpenModaleErroreInserimentoOrdinazione();
      } else
        handleOpenModaleErroreInserimentoOrdinazione();
    }
  }

  return (
    <>
    <ModaleVisualizzaOrdinazione open={openModaleVisualizzaOrdinazione} preparazioni={preparazioni} setPreparazioni={setPreparazioni} handleClose={handleCloseModaleVisualizzaOrdinazione}></ModaleVisualizzaOrdinazione>
    <ModaleAggiungiPiattoOrdinazione open={openModaleAggiungiPiatto[0]} piatto={openModaleAggiungiPiatto[1]} preparazioni={preparazioni} setPreparazioni={setPreparazioni} handleClose={handleCloseModaleAggiungiPiatto}></ModaleAggiungiPiattoOrdinazione>
    <ModaleSuccessoErrore open={openModaleOrdinazioneVuota} handleClose={handleCloseModaleOrdinazioneVuota} titolo={TITOLO_ERRORE_ORDINAZIONE_VUOTA} messaggio={MESSAGGIO_ERRORE_ORDINAZIONE_VUOTA} testoButton={TESTO_BUTTON_OK} tipo={TIPO_ERRORE}/>
    <ModaleSuccessoErrore open={openModaleConfermaOrdinazione} handleClose={()=>{handleCloseModaleConfermaOrdinazione(); handleCloseNuovaOrdinazione()}} titolo={TITOLO_ORDINAZIONE_INVIATA} messaggio={MESSAGGIO_ORDINAZIONE_INVIATA} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
    <ModaleSuccessoErrore open={openModaleInfoPiatto[0]} handleClose={handleCloseModaleInfoPiatto} titolo={openModaleInfoPiatto[1]} messaggio={openModaleInfoPiatto[2]} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
    <ModaleSuccessoErrore open={openModaleErroreInserimentoOrdinazione} handleClose={handleCloseModaleErroreInserimentoOrdinazione} titolo={TITOLO_ERRORE_INSERIMENTOO_ORDINAZIONE} messaggio={MESSAGGIO_ERRORE_INSERIMENTO_ORDINAZIONE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_ERRORE}/>
    <ModaleConfermaAnnulla action={handleCloseNuovaOrdinazione} open={openModaleTornaTavoli} handleClose={handleCloseModaleTornaTavoli} titolo={TITOLO_ANNULLA_ORDINAZIONE} messaggio={MESSAGGIO_ANNULLA_ORDINAZIONE} testoButton={TESTO_BUTTON_CONFERMA} tipo={TIPO_CONFERMA} />

    <br/><br/><IconButton onClick={handleOpenModaleTornaTavoli} sx={{color: theme.palette.black.main,}}>
        <ArrowBackIcon/><Typography component="h1" variant="h6" align="left" sx={{width: '100%', textDecoration: 'underline', fontWeight:'bold'}}>Torna ai Tavoli</Typography>
    </IconButton>

    <br/><br/><h1>Nuova ordinazione per tavolo: {tavolo.numeroTavolo}</h1><br/>
    {menu?.length > 0 ? (
        <>
        <FormControl sx={{width: 1/3, '@media screen and (max-width: 900px)': {width: '100%'}}}>
        <InputLabel>Menù</InputLabel>
        <Select
            required
            labelId="selectMenu"
            id="selectMenu"
            label="Menù"
            fullWidth
            value={menuSelezionato || ''}
            variant="outlined"
            sx={{backgroundColor: theme.palette.white.main}}
            onChange={(e) => handleChange(e.target.value)}
        >
            {menu?.map(m => <MenuItem value={m} key={m.idMenu}>{m.nome}</MenuItem>)}
        </Select>
    </FormControl>

    <Box component="section" sx={{display: 'flex', overflowX: 'scroll', marginTop: '10px', '@media screen and (max-width: 400px)': {overflowX: 'hidden'}}}>
        {menuSelezionato ? menuSelezionato.categorie ? menuSelezionato.categorie.map((categoria) => {
            const colore = categoria.idCategoria === categoriaSelezionata.idCategoria ? theme.palette.secondary.main : theme.palette.primary.main
            return(
                <Box component="div" sx={{flexBasis: '10%', flexShrink: '0', backgroundColor: colore, borderRadius: '15px', margin: '5px'}} key={categoria.idCategoria}>
                    <Button sx={{height: '100%', width: '100%', color: theme.palette.black.main, fontWeight: 'bold'}} 
                        onClick={() => setCategoriaSelezionata(categoria)} value={categoria}>
                            {categoria.nomeCategoria}
                    </Button>
                </Box>
            )
        }) : <></> : <></>}
    </Box>

    <Grid container spacing={3} alignItems="stretch" sx={{marginTop: '10px', marginBottom: '70px'}}>
        {categoriaSelezionata.piatti?.map((piatto) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={piatto.idPiatto}>
                <Piatto piatto={piatto} handleOpenModaleInfoPiatto={handleOpenModaleInfoPiatto} handleOpenModaleAggiungiPiatto={() => handleOpenModaleAggiungiPiatto(piatto)}/>
            </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={3} key={uuid()}><br/></Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} key={uuid()}><br/></Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} key={uuid()}><br/></Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} key={uuid()}><br/></Grid>
    </Grid>

    <Box sx={{ position: 'fixed', bottom: 0, right: 0, width: '100%', padding: '20px', boxShadow: `0 -5px 20px -5px ${theme.palette.black.main}`, backgroundColor: theme.palette.grey.main, '@media screen and (max-width: 600px)': {left: 0}}}>
            <Grid container spacing={2} direction="row" alignItems="center" justifyContent="right">
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Button variant="contained" onClick={handleOpenModaleVisualizzaOrdinazione} sx={{width: '100%', height: '50px', color: theme.palette.black.main, fontWeight: 'bold'}}>Visualizza ordinazione</Button>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Button variant="contained" onClick={handleConfermaOrdinazione} sx={{backgroundColor: theme.palette.tertiary.main, width: '100%', height: '50px', color: theme.palette.black.main, fontWeight: 'bold'}}>Conferma ordinazione</Button>
                </Grid>
            </Grid>
    </Box>
        </>
    ) : <></>}
    </>
  )
}

export default EffettuaOrdinazioneView