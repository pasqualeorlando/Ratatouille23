import { useTheme, Typography, Tooltip, IconButton } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { TITOLO_MENU_ESISTENTE, MESSAGGIO_MENU_ESISTENTE, TITOLO_MODIFICHE_EFFETTUATE, MESSAGGIO_MODIFICHE_EFFETTUATE, TITOLO_INSERIMENTO_RIUSCITO, MESSAGGIO_INSERIMENTO_RIUSCITO, TESTO_BUTTON_OK, TIPO_SUCCESSO, TIPO_ERRORE, TITOLO_CONFERMA_ELIMINAZIONE, TESTO_BUTTON_CONFERMA, TIPO_ELIMINAZIONE, MESSAGGIO_ELIMINA_MENU} from '../../components/CONSTANTS';
import { ModaleSuccessoErrore, ModaleConfermaAnnulla } from '../../components/Modali';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TabellaEliminaInserisciMenu from './components/TabellaEliminaInserisciMenu';
import FormInserimentoMenu from './components/FormInserimentoMenu';
import { OrdinaMenuContainer } from '../GestioneSingoloMenu/';
import { Link } from 'react-router-dom';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const GestioneMenuView = (props) => {
  const theme = useTheme();

  const {rows, setMenus, selectionModel, setSelectionModel, eliminaMenuSelezionati} = props;

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

  //Stato del menu da modificare scelto (ordinare categorie e piatti)
  const [menu, setMenu] = useState(null);
  
  return (
    <>
    <br/><br/><h1>Gestione menu</h1><br/>
    {menu == null ? (
        <>
        <Tooltip title="Aggiungi">
        <IconButton onClick={() => handleOpenModale("Inserimento", null)}>
            <AddBoxIcon color="primary" fontSize="large"/>
            <Typography component="h2" color={theme.palette.black.main}><b>Aggiungi</b></Typography>
        </IconButton>
        </Tooltip>
        <FormInserimentoMenu key={modale[2]} open={modale[0]} modalita={modale[1]} row={modale[2]} handleClose={handleCloseModale} handleOpenModaleSuccesso={handleOpenModaleSuccesso} 
            handleOpenModaleSuccesso2={handleOpenModaleSuccesso2} handleOpenModaleErrore={handleOpenModaleErrore}
            menus={rows} setMenus={setMenus}>
        </FormInserimentoMenu>

        <TabellaEliminaInserisciMenu rows={rows} handleOpenModale={handleOpenModale} handleOpenModaleSuccesso={handleOpenModaleSuccesso} handleOpenModaleEliminazione={handleOpenModaleEliminazione} setMenu={setMenu} selectionModel={selectionModel} setSelectionModel={setSelectionModel}></TabellaEliminaInserisciMenu>
        <ModaleConfermaAnnulla action={eliminaMenuSelezionati} open={openModaleEliminazione} handleClose={handleCloseModaleEliminazione} titolo={TITOLO_CONFERMA_ELIMINAZIONE} messaggio={MESSAGGIO_ELIMINA_MENU} testoButton={TESTO_BUTTON_CONFERMA} tipo={TIPO_ELIMINAZIONE}/>
        <ModaleSuccessoErrore open={openModaleSuccesso} handleClose={handleCloseModaleSuccesso} titolo={TITOLO_MODIFICHE_EFFETTUATE} messaggio={MESSAGGIO_MODIFICHE_EFFETTUATE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
        <ModaleSuccessoErrore open={openModaleSuccesso2} handleClose={handleCloseModaleSuccesso2} titolo={TITOLO_INSERIMENTO_RIUSCITO} messaggio={MESSAGGIO_INSERIMENTO_RIUSCITO} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
        <ModaleSuccessoErrore open={openModaleErrore} handleClose={handleCloseModaleErrore} titolo={TITOLO_MENU_ESISTENTE} messaggio={MESSAGGIO_MENU_ESISTENTE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_ERRORE}/>
        </>
    ) : (
        <>
        <h1><b>Hai selezionato: {menu.nome}</b></h1>
        <Typography fontSize={20}>Per aggiungere, eliminare o modificare una categoria clicca <Link to="/categorie" style={{color: theme.palette.primary.main}}>QUI</Link></Typography>
        <Typography fontSize={20}>Per ordinare gli elementi trascinali attraverso l'icona <DragIndicatorIcon/> e rilascia</Typography><br/>
        <OrdinaMenuContainer menu={menu} setMenu={setMenu}></OrdinaMenuContainer>
        </>
    )}
    </>
  )
}

export default GestioneMenuView