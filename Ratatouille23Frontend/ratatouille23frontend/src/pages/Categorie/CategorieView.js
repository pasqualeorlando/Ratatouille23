import React from 'react'
import TabellaEliminaInserisciCategoria from './components/TabellaEliminaInserisciCategoria';
import FormInserimentoCategoria from './components/FormInserimentoCategoria';
import { ModaleSuccessoErrore, ModaleConfermaAnnulla } from '../../components/Modali';
import { useState } from 'react';
import { Tooltip, IconButton, Typography, useTheme } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { TITOLO_SELEZIONE_MENU, MESSAGGIO_SELEZIONE_MENU, TITOLO_CATEGORIA_ESISTENTE, MESSAGGIO_CATEGORIA_ESISTENTE, MESSAGGIO_ELIMINA_CATEGORIE, TITOLO_MODIFICHE_EFFETTUATE, MESSAGGIO_MODIFICHE_EFFETTUATE, TITOLO_INSERIMENTO_RIUSCITO, MESSAGGIO_INSERIMENTO_RIUSCITO, TESTO_BUTTON_OK, TIPO_SUCCESSO, TIPO_ERRORE, TITOLO_CONFERMA_ELIMINAZIONE, TESTO_BUTTON_CONFERMA, TIPO_ELIMINAZIONE} from '../../components/CONSTANTS';

const CategorieView = (props) => {
  const theme = useTheme();

  const {rows, menus, selectionModel, setSelectionModel, setCategorie, eliminaCategorieSelezionate} = props;

  //Stato del modale di inserimento/modifica
  const [modale, setModale] = useState({0: false, 1: null, 2: null});
  const handleOpenModale = (modalita, row) => {
    setModale({0: true, 1: modalita, 2: row})
  }
  const handleCloseModale = () => {
    setModale({0: false, 1: null, 2: null});
  }
  
  //Stato del modale di eliminazione
  const [openModaleEliminazione, setOpenModaleEliminazione] = useState(false);
  const handleOpenModaleEliminazione = () => {
    setOpenModaleEliminazione(true);
  };
  const handleCloseModaleEliminazione = () => {
    setOpenModaleEliminazione(false);
  };
  
  //Stato del modale di errore
  const [openModaleErrore, setOpenModaleErrore] = useState(false);
  const handleOpenModaleErrore = () => {
    setOpenModaleErrore(true);
  };
  const handleCloseModaleErrore = () => {
    setOpenModaleErrore(false);
  };

  //Stato del modale di errore seleziona menu
  const [openModaleErrore2, setOpenModaleErrore2] = useState(false);
  const handleOpenModaleErrore2 = () => {
    setOpenModaleErrore2(true);
  };
  const handleCloseModaleErrore2 = () => {
    setOpenModaleErrore2(false);
  };
  
  //Stato del modale di successo inserimento
  const [openModaleSuccesso, setOpenModaleSuccesso] = useState(false);
  const handleOpenModaleSuccesso = () => {
    setOpenModaleSuccesso(true);
  };
  const handleCloseModaleSuccesso = () => {
    setOpenModaleSuccesso(false);
    handleCloseModale();
  };

  //Stato del modale di successo modifica
  const [openModaleSuccesso2, setOpenModaleSuccesso2] = useState(false);
  const handleOpenModaleSuccesso2 = () => {
    setOpenModaleSuccesso2(true);
  };
  const handleCloseModaleSuccesso2 = () => {
    setOpenModaleSuccesso2(false);
    handleCloseModale();
  };

  return (
    <>
    <br/><br/><h1>Categorie</h1><br/>
    <Tooltip title="Aggiungi">
      <IconButton onClick={() => handleOpenModale("Inserimento", null)}>
        <AddBoxIcon color="primary" fontSize="large"/>
        <Typography component="h2" color={theme.palette.black.main}><b>Aggiungi</b></Typography>
      </IconButton>
    </Tooltip>
    <FormInserimentoCategoria open={modale[0]} modalita={modale[1]} categoria={modale[2]} categorie={rows} setCategorie={setCategorie} handleClose={handleCloseModale} handleOpenModaleSuccesso={handleOpenModaleSuccesso} 
        handleOpenModaleSuccesso2={handleOpenModaleSuccesso2} handleOpenModaleErrore={handleOpenModaleErrore} handleOpenModaleErrore2={handleOpenModaleErrore2} 
        menus={menus}>
    </FormInserimentoCategoria>

    <TabellaEliminaInserisciCategoria rows={rows} selectionModel={selectionModel} setSelectionModel={setSelectionModel} handleOpenModale={handleOpenModale} handleOpenModaleEliminazione={handleOpenModaleEliminazione}></TabellaEliminaInserisciCategoria>
    <ModaleConfermaAnnulla action={eliminaCategorieSelezionate} open={openModaleEliminazione} handleClose={handleCloseModaleEliminazione} titolo={TITOLO_CONFERMA_ELIMINAZIONE} messaggio={MESSAGGIO_ELIMINA_CATEGORIE} testoButton={TESTO_BUTTON_CONFERMA} tipo={TIPO_ELIMINAZIONE}/>
    <ModaleSuccessoErrore open={openModaleSuccesso} handleClose={handleCloseModaleSuccesso} titolo={TITOLO_MODIFICHE_EFFETTUATE} messaggio={MESSAGGIO_MODIFICHE_EFFETTUATE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
    <ModaleSuccessoErrore open={openModaleSuccesso2} handleClose={handleCloseModaleSuccesso2} titolo={TITOLO_INSERIMENTO_RIUSCITO} messaggio={MESSAGGIO_INSERIMENTO_RIUSCITO} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
    <ModaleSuccessoErrore open={openModaleErrore} handleClose={handleCloseModaleErrore} titolo={TITOLO_CATEGORIA_ESISTENTE} messaggio={MESSAGGIO_CATEGORIA_ESISTENTE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_ERRORE}/>
    <ModaleSuccessoErrore open={openModaleErrore2} handleClose={handleCloseModaleErrore2} titolo={TITOLO_SELEZIONE_MENU} messaggio={MESSAGGIO_SELEZIONE_MENU} testoButton={TESTO_BUTTON_OK} tipo={TIPO_ERRORE}/>
    </>
  )
}

export default CategorieView