import { List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import Tavolo from './components/Tavolo';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import FormOccupaTavolo from './components/FormOccupaTavolo';
import ModaleTavoloOccupatoContoRichiesto from './components/ModaleTavoloOccupatoContoRichiesto';
import { ModaleConfermaAnnulla } from '../../components/Modali/';
import { TITOLO_STAMPA_CONTO, MESSAGGIO_STAMPA_CONTO, TIPO_CONFERMA, TESTO_BUTTON_STAMPA_CONTO } from '../../components/CONSTANTS';
import { v4 as uuid } from 'uuid';
import EffettuaOrdinazioneContainer from '../EffettuaOrdinazione/EffettuaOrdinazioneContainer';
import { ottieniOrdinazioniDaIdTavolo } from '../../services/OrdinazioneService';
import { ottieniPreparazioniOrdinazione } from '../../services/PreparazionePiattiOrdinazioneService';


const TavoliView = (props) => {
  const theme = useTheme();

  const {occupaTavolo, richiediConto, liberaTavolo, tavoli, preparazioni, setPreparazioni} = props;

  //Stato del modale di occupa tavolo
  const [open, setOpen] = useState({0: false, 1: null});
  const handleOpen = (tavolo) => {
    setOpen({0: true, 1: tavolo});
  };
  const handleClose = () => {
    setOpen({0: false, 1: null});
  };

  //Preparazioni da passare al modale dei dettagli tavolo
  //const [preparazioni, setPreparazioni] = useState([]);

  //Stato del tavolo di cui conoscere i dettagli
  const [tavoloDettagli, setTavoloDettagli] = useState(null);

  //Stato del modale di dettagli tavolo
  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetails = (tavolo) => {
    if(tavolo != null) {
      setOpenDetails(true);
      setTavoloDettagli(tavolo);
    }
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  //Appena l'utente clicca su un tavolo e cambia lo stato prende le ordinazioni e le sue preparazioni
  useEffect(() => {
    async function fetchData() {

      const ordinazioni = await ottieniOrdinazioniDaIdTavolo(tavoloDettagli?.tavolo?.idTavolo || -1) || [];
      const prepNuove = [];

      ordinazioni.forEach(async (ordinazione) => {
          const prep = await ottieniPreparazioniOrdinazione(ordinazione.idOrdinazione);
          prepNuove.push(...prep);
      });
      prepNuove.sort((p1, p2) => p1.idPreparazionePiattoOrdinazione - p2.idPreparazionePiattoOrdinazione);
      return prepNuove;
    }
  
    fetchData().then(p => setPreparazioni(p)).catch(console.error);
  }, [tavoloDettagli, setPreparazioni]);

  //Stato del modale di stampa conto
  const [openModaleStampa, setOpenModaleStampa] = useState(false);
  const handleOpenModale = () => {
    setOpenModaleStampa(true);
  }
  const handleCloseModale = () => {
    handleCloseDetails();
    setOpenModaleStampa(false);
  }

  //Stato della pagina di nuova ordinazione
  const [openNuovaOrdinazione, setOpenNuovaOrdinazione] = useState(false);
  const handleOpenNuovaOrdinazione = () => {
    setOpenNuovaOrdinazione(true);
  }
  const handleCloseNuovaOrdinazione = () => {
    setOpenNuovaOrdinazione(false);
    handleCloseDetails();
  }

  return (
    <>
        {openNuovaOrdinazione ? <EffettuaOrdinazioneContainer tavolo={tavoloDettagli} handleCloseNuovaOrdinazione={handleCloseNuovaOrdinazione}/> : (
          <>
          <FormOccupaTavolo open={open[0]} tavolo={open[1]} occupaTavolo={occupaTavolo} handleClose={handleClose}></FormOccupaTavolo>
          <ModaleTavoloOccupatoContoRichiesto open={openDetails} richiediConto={richiediConto} liberaTavolo={liberaTavolo} tavolo={tavoloDettagli} preparazioni={preparazioni} handleClose={handleCloseDetails} handleOpenModale={handleOpenModale} handleOpenNuovaOrdinazione={handleOpenNuovaOrdinazione}></ModaleTavoloOccupatoContoRichiesto>
          <ModaleConfermaAnnulla open={openModaleStampa} tavolo={tavoloDettagli} handleClose={handleCloseModale} titolo={TITOLO_STAMPA_CONTO} messaggio={MESSAGGIO_STAMPA_CONTO} testoButton={TESTO_BUTTON_STAMPA_CONTO} tipo={TIPO_CONFERMA}></ModaleConfermaAnnulla>
          <br/><br/><h1>Tavoli</h1><br/>
          <List>
            <ListItem key={uuid()}>
              <ListItemIcon sx={{color: theme.palette.tertiary.lighter}}>
                <CircleIcon></CircleIcon>
                <ListItemText primary="Libero" sx={{color: theme.palette.black.main, margin: '2px'}}></ListItemText>
              </ListItemIcon>
            </ListItem>
            <ListItem key={uuid()}>
              <ListItemIcon sx={{color: theme.palette.primary.main}}>
                <CircleIcon></CircleIcon>
                <ListItemText primary="Conto richiesto" sx={{color: theme.palette.black.main, margin: '2px'}}></ListItemText>
              </ListItemIcon>
            </ListItem>
            <ListItem key={uuid()}>
              <ListItemIcon sx={{color: theme.palette.fourtiary.main}}>
                <CircleIcon></CircleIcon>
                <ListItemText primary="Occupato" sx={{color: theme.palette.black.main, margin: '2px'}}></ListItemText>
              </ListItemIcon>
            </ListItem>
          </List>
          <Grid container component="main" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 5}}>
            {tavoli.map((tavolo) => (
              <Tavolo key={uuid()} tavolo={tavolo} handleOpenDetails={handleOpenDetails} setTavoloDettagli={setTavoloDettagli} handleOpen={handleOpen}></Tavolo>
            ))}
          </Grid>
          </>
        )}
    </>
  )
}

export default TavoliView