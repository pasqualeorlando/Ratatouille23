import { useTheme } from '@mui/material'
import React from 'react'
import { MESSAGGIO_ELIMINA_PIATTI, MESSAGGIO_PIATTO_ESISTENTE, TITOLO_PIATTO_ESISTENTE, TITOLO_INSERIMENTO_RIUSCITO, MESSAGGIO_INSERIMENTO_RIUSCITO, TESTO_BUTTON_OK, TIPO_SUCCESSO, TIPO_ERRORE, TITOLO_CONFERMA_ELIMINAZIONE, TESTO_BUTTON_CONFERMA, TIPO_ELIMINAZIONE, TITOLO_MODIFICHE_EFFETTUATE, MESSAGGIO_MODIFICHE_EFFETTUATE} from '../../components/CONSTANTS';
import { useState } from 'react';
import { Tooltip, IconButton, Typography }from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormInserimentoPiatto from './components/FormInserimentoPiatto';
import { ModaleSuccessoErrore, ModaleConfermaAnnulla } from '../../components/Modali';
import TabellaEliminaInserisci from '../../components/TabellaEliminaInserisci/TabellaEliminaInserisci';

const PiattiView = (props) => {
  const theme = useTheme();

  const {headCells, rows, setPiatti, allergeni, categorie, selectionModel, setSelectionModel, eliminaPiattiSelezionati, ottieniPossibiliNomiPiatti} = props;

  //Stato del modale di inserimento
  const [open, setOpen] = useState({0: false, 1: null, 2: 'Inserimento'});
  const handleOpen = (piatto, modalita) => {
    setOpen({0: true, 1: piatto, 2: modalita});
  };
  const handleClose = () => {
    setOpen({0: false, 1: null, 2: 'Inserimento'});
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

  //Stato del modale di successo inserimento
  const [openModaleSuccesso, setOpenModaleSuccesso] = useState(false);
  const handleOpenModaleSuccesso = () => {
    setOpenModaleSuccesso(true);
  };
  const handleCloseModaleSuccesso = () => {
    setOpenModaleSuccesso(false);
  };

  //Stato del modale di successo modifica
  const [openModaleSuccesso2, setOpenModaleSuccesso2] = useState(false);
  const handleOpenModaleSuccesso2 = () => {
    setOpenModaleSuccesso2(true);
  };
  const handleCloseModaleSuccesso2 = () => {
    setOpenModaleSuccesso2(false);
  };

  headCells[5] = { field: 'allergeni', headerName: '', flex: 1, sortable: false,
    renderCell: (params) => {
      const allergeni = params.value;
      const piatto = params.row;
      let allergeniList;

      if(!allergeni || allergeni.length === 0)
          allergeniList = 'Nessuno'
      else
          allergeniList = allergeni.join('\n');

      return <>
        <Typography sx={{textDecoration: 'underline', '&:hover': {cursor: 'pointer'}}} onClick={()=>handleOpen(piatto, 'Modifica')}>Modifica</Typography>
          <Tooltip title={
              <div style={{ whiteSpace: 'pre-line' }}>{allergeniList}</div>
          }>
              <IconButton><InfoIcon/></IconButton>
          </Tooltip>
      </>;
    }
  };

  return (
    <>
    <br/><br/><h1>Piatti</h1><br/>
    <Tooltip title="Aggiungi">
      <IconButton onClick={() => handleOpen(null, 'Inserimento')}>
        <AddBoxIcon color="primary" fontSize="large"/>
        <Typography component="h2" color={theme.palette.black.main}><b>Aggiungi</b></Typography>
      </IconButton>
    </Tooltip>
    <FormInserimentoPiatto open={open[0]} modalita={open[2]} piatto={open[1]} setPiatti={setPiatti} rows={rows} handleClose={handleClose} handleOpenModaleSuccesso={handleOpenModaleSuccesso} handleOpenModaleSuccesso2={handleOpenModaleSuccesso2} handleOpenModaleErrore={handleOpenModaleErrore} allergeni={allergeni} categorie={categorie} ottieniPossibiliNomiPiatti={ottieniPossibiliNomiPiatti}></FormInserimentoPiatto>
    <TabellaEliminaInserisci rows={rows} headCells={headCells} handleOpenModaleEliminazione={handleOpenModaleEliminazione} selectionModel={selectionModel} setSelectionModel={setSelectionModel}></TabellaEliminaInserisci>
    <ModaleConfermaAnnulla action={eliminaPiattiSelezionati} open={openModaleEliminazione} handleClose={handleCloseModaleEliminazione} titolo={TITOLO_CONFERMA_ELIMINAZIONE} messaggio={MESSAGGIO_ELIMINA_PIATTI} testoButton={TESTO_BUTTON_CONFERMA} tipo={TIPO_ELIMINAZIONE}/>
    <ModaleSuccessoErrore open={openModaleSuccesso2} handleClose={handleCloseModaleSuccesso2} titolo={TITOLO_MODIFICHE_EFFETTUATE} messaggio={MESSAGGIO_MODIFICHE_EFFETTUATE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
    <ModaleSuccessoErrore open={openModaleSuccesso} handleClose={handleCloseModaleSuccesso} titolo={TITOLO_INSERIMENTO_RIUSCITO} messaggio={MESSAGGIO_INSERIMENTO_RIUSCITO} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
    <ModaleSuccessoErrore open={openModaleErrore} handleClose={handleCloseModaleErrore} titolo={TITOLO_PIATTO_ESISTENTE} messaggio={MESSAGGIO_PIATTO_ESISTENTE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_ERRORE}/>
    </>
  )
}

export default PiattiView