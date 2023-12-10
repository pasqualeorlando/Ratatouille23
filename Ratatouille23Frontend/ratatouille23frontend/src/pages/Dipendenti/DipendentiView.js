import React from 'react'
import TabellaEliminaInserisci from '../../components/TabellaEliminaInserisci/TabellaEliminaInserisci';
import FormInserimentoDipendente from './components/FormInserimentoDipendente';
import { Tooltip, IconButton, Typography, useTheme } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useState } from 'react';
import { MESSAGGIO_ELIMINA_DIPENDENTI, MESSAGGIO_INSERIMENTO_RIUSCITO, MESSAGGIO_MAIL_ESISTENTE, TESTO_BUTTON_CONFERMA, TESTO_BUTTON_OK, TIPO_ELIMINAZIONE, TIPO_ERRORE, TIPO_SUCCESSO, TITOLO_CONFERMA_ELIMINAZIONE, TITOLO_INSERIMENTO_RIUSCITO, TITOLO_MAIL_ESISTENTE } from '../../components/CONSTANTS';
import { ModaleConfermaAnnulla, ModaleSuccessoErrore } from '../../components/Modali/';

const DipendentiView = (props) => {
  const theme = useTheme();

  const {headCells, rows, setRows, eliminaDipendentiSelezionati, selectionModel, setSelectionModel} = props;

  //Stato del modale di inserimento
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  //Stato del modale di successo
  const [openModaleSuccesso, setOpenModaleSuccesso] = useState(false);
  const handleOpenModaleSuccesso = () => {
    setOpenModaleSuccesso(true);
    setOpen(false);
  };
  const handleCloseModaleSuccesso = () => {
    setOpenModaleSuccesso(false);
  };

  return (
    <>
    <br/><br/><h1>Dipendenti</h1><br/>
    <Tooltip title="Aggiungi">
      <IconButton onClick={() => handleOpen()}>
        <AddBoxIcon color="primary" fontSize="large"/>
        <Typography component="h2" color={theme.palette.black.main}><b>Aggiungi</b></Typography>
      </IconButton>
    </Tooltip>
    <FormInserimentoDipendente open={open} rows={rows} setRows={setRows} handleOpen={handleOpen} handleClose={handleClose} handleOpenModaleSuccesso={handleOpenModaleSuccesso} handleOpenModaleErrore={handleOpenModaleErrore}></FormInserimentoDipendente>
    <TabellaEliminaInserisci handleOpenModaleEliminazione={handleOpenModaleEliminazione} headCells={headCells} rows={rows} selectionModel={selectionModel} setSelectionModel={setSelectionModel}></TabellaEliminaInserisci>
    <ModaleConfermaAnnulla action={eliminaDipendentiSelezionati} open={openModaleEliminazione} handleClose={handleCloseModaleEliminazione} titolo={TITOLO_CONFERMA_ELIMINAZIONE} messaggio={MESSAGGIO_ELIMINA_DIPENDENTI} testoButton={TESTO_BUTTON_CONFERMA} tipo={TIPO_ELIMINAZIONE}/>
    <ModaleSuccessoErrore open={openModaleSuccesso} handleClose={handleCloseModaleSuccesso} titolo={TITOLO_INSERIMENTO_RIUSCITO} messaggio={MESSAGGIO_INSERIMENTO_RIUSCITO} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
    <ModaleSuccessoErrore open={openModaleErrore} handleClose={handleCloseModaleErrore} titolo={TITOLO_MAIL_ESISTENTE} messaggio={MESSAGGIO_MAIL_ESISTENTE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_ERRORE}/>
    </>
  )
}

export default DipendentiView