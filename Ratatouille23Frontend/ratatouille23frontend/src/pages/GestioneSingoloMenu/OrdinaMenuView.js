import { TableBody, TableContainer, Table, Paper, Button, TableCell, TableRow, IconButton, Stack, Typography, Box, Collapse } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useTheme } from '@mui/material';
import { CustomSwitch } from '../Gestione menu/components/CustomSwitch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { modificaPiatto } from '../../services/PiattoService';
import { modificaCategoriaMenu } from '../../services/CategoriaMenuService';
import { ModaleConfermaAnnulla, ModaleSuccessoErrore } from '../../components/Modali';
import { TITOLO_MODIFICHE_EFFETTUATE, MESSAGGIO_MODIFICHE_EFFETTUATE, TESTO_BUTTON_OK, TIPO_SUCCESSO, TIPO_CONFERMA, TESTO_BUTTON_CONFERMA, TITOLO_CONFERMA_TORNA_INDIETRO, MESSAGGIO_TORNA_INDIETRO } from '../../components/CONSTANTS';

const Row = (props) => {
    const { row, categorie, setCategorie, innerRef, draggableProps, dragHandleProps } = props;
    const [open, setOpen] = useState(false);
    const [piattiList, setPiattiList] = useState(row?.categoria.piatti);
    const [abilitata, setAbilitata] = useState(row?.abilitato);

    const handleAbilita = (e) => {
        const index = categorie.map(cm => cm.idCategoria).indexOf(row.idCategoria);
        const newCat = categorie[index];
        newCat.abilitato = !abilitata;
        setCategorie([...categorie.slice(0, index), newCat, ...categorie.slice(index+1)]);
    }

    function handleOnDragEnd(result) {
      if (!result.destination) return;
  
      const items = Array.from(piattiList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      let i = 1;
      for(const item of items) {
        item.posizionePiatto = i;
        i++;
      }
      const index = categorie.map(cm => cm.idCategoria).indexOf(row.idCategoria);
      const newCat = categorie[index];

      newCat.categoria.piatti = items;

      setCategorie([...categorie.slice(0, index), newCat, ...categorie.slice(index+1)]);
      setPiattiList(items);
    }

    return (
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' }, width: '100%'}} hover
            key={row.nomeCategoria}
            tabIndex={-1}
            ref={innerRef}
            {...draggableProps}
        >
            <TableCell component="th" scope="row" padding="checkbox" {...dragHandleProps}>
                <DragIndicatorIcon />
            </TableCell>
            <TableCell component="th" scope="row">
                {row.nomeCategoria}
            </TableCell>
            <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                    <Typography>Disabilitato</Typography>
                    <CustomSwitch checked={abilitata} onClick={(e) => {setAbilitata(e.target.checked); handleAbilita()}} inputProps={{ 'aria-label': 'switch' }}></CustomSwitch>
                    <Typography>Abilitato</Typography>
                </Stack>
            </TableCell>
            <TableCell align="right">
                <IconButton
                    aria-label="espandi riga"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId={row.nomeCategoria} key={row.idCategoria}>
                        {(provided) => (
                            <TableContainer component={Paper}>
                                <Table aria-label="piatti" {...provided.droppableProps} ref={provided.innerRef}>
                                    <TableBody>
                                    {piattiList.map((piatto, index) => (
                                        <Draggable draggableId={piatto.nome} index={index} key={piatto.nome}>
                                            {(provided) => (
                                            <TableRow key={piatto.nome} ref={provided.innerRef} {...provided.droppableProps} {...provided.draggableProps} sx={{backgroundColor: '#E4E4E4', color: '#9D9D9D'}}>
                                                <TableCell component="th" scope="row" padding="checkbox" {...provided.dragHandleProps}>
                                                    <DragIndicatorIcon />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {piatto.nome}
                                                    {piatto.descrizione ? (
                                                        <>
                                                        <br></br>
                                                        <Typography sx={{color: '#656565', fontSize: '15px'}}><i>{piatto.descrizione}</i></Typography>
                                                        </>
                                                    ) : (<></>)}
                                                </TableCell>
                                            </TableRow>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        </Droppable>
                    </DragDropContext>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
}


const OrdinaMenuView = (props) => {
  const theme = useTheme();
  const {menu, categorieMenu, setMenu} = props;
  
  const [categorie, setCategorie] = useState([]);
  const [openModaleSuccesso, setOpenModaleSuccesso] = useState(false);
  const handleOpenModaleSuccesso = () => {
    setOpenModaleSuccesso(true);
  }
  const handleCloseModaleSuccesso = () => {
    setOpenModaleSuccesso(false);
  }

  const [openModaleConfermaIndietro, setOpenModaleConfermaIndietro] = useState(false);
  const handleOpenModaleConfermaIndietro = () => {
    setOpenModaleConfermaIndietro(true);
  }
  const handleCloseModaleConfermaIndietro = () => {
    setOpenModaleConfermaIndietro(false);
  }
 
  useEffect(() => {
    setCategorie(categorieMenu);
  }, [categorieMenu]);
  
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(categorie);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    let i = 1;
    for(const item of items) {
        item.posizioneCategoria = i;
        i++;
    }

    setCategorie(items);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    categorie.sort((a,b) => a.posizioneCategoria - b.posizioneCategoria);
    //Aggiorniamo prima la posizione dei piatti di ogni singola categoria e poi le categoriemenu
    for(const categoriamenu of categorie) {
        categoriamenu.categoria.piatti.sort((a,b) => a.posizionePiatto - b.posizionePiatto);
        for(const piatto of categoriamenu.categoria.piatti) {
            await modificaPiatto(piatto);
        }

        await modificaCategoriaMenu(categoriamenu);

    }
    handleOpenModaleSuccesso();
  }

  return (
    <>
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={menu.nome} key={menu.nome}>
        {(provided) => (
            <TableContainer component={Paper}>
              <Table aria-label="categorie e piatti" {...provided.droppableProps} ref={provided.innerRef}>
                <TableBody>
            {categorie ? categorie.map((categoriamenu, index) => {
                return (
                <Draggable key={categoriamenu.nomeCategoria} draggableId={categoriamenu.nomeCategoria} index={index}>
                    {(provided) => (
                        <Row sx={{width: '100%'}} row={categoriamenu} categorie={categorie} setCategorie={setCategorie} key={categoriamenu.nomeCategoria} innerRef={provided.innerRef} draggableProps={provided.draggableProps} dragHandleProps={provided.dragHandleProps}></Row>
                    )}
                </Draggable>
                );
            }) : <></>}
            {provided.placeholder}
                </TableBody>
            </Table>
            </TableContainer>
        )}
        </Droppable>
    </DragDropContext>
    <Box display="flex" sx={{marginTop: '20px'}}justifyContent="space-around" alignItems="center">
        <Button variant="text" sx={{color: theme.palette.black.main, textDecoration: 'underline'}} onClick={() => handleOpenModaleConfermaIndietro()}>Torna a selezione menù</Button>
        <Button variant="contained" onClick={(e) => handleSubmit(e)}>Salva modifiche</Button>
    </Box>
    <ModaleSuccessoErrore open={openModaleSuccesso} handleClose={handleCloseModaleSuccesso} titolo={TITOLO_MODIFICHE_EFFETTUATE} messaggio={MESSAGGIO_MODIFICHE_EFFETTUATE} testoButton={TESTO_BUTTON_OK} tipo={TIPO_SUCCESSO}/>
    <ModaleConfermaAnnulla action={() => setMenu(null)} open={openModaleConfermaIndietro} handleClose={handleCloseModaleConfermaIndietro} titolo={TITOLO_CONFERMA_TORNA_INDIETRO} messaggio={MESSAGGIO_TORNA_INDIETRO} testoButton={TESTO_BUTTON_CONFERMA} tipo={TIPO_CONFERMA}/>
    </>
  )
}

export default OrdinaMenuView