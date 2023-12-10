import React, { useState } from 'react'
import {Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, useTheme, Tooltip, Button} from '@mui/material/';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

const Row = (props) => {
    const [open, setOpen] = useState(false);
    const { isSelected, row, handleClick, handleOpenModale } = props;

    let menuList = 'Presente nei menu: ';
    row.menu?.forEach((m) => {
      menuList += m.nomeMenu + ",";
    });
    menuList = menuList.slice(0, menuList.length - 1);


    return (
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover role="checkbox" 
            aria-checked={isSelected} 
            key={row.idCategoria}
            selected={isSelected}
            tabIndex={-1}
        >
            <TableCell padding="checkbox" onClick={(event) => handleClick(event, row.idCategoria)} >
                <Checkbox
                    color="primary"
                    checked={isSelected}
                    inputProps={{
                    'aria-labelledby': row.idCategoria,
                    }}
                />
            </TableCell>
            <TableCell component="th" scope="row" onClick={() => setOpen(!open)}>
                {row.nome}
            </TableCell>
            <TableCell align='right'>
              <Tooltip 
                title={
                  <div style={{ whiteSpace: 'pre-line' }}>{menuList}</div>
                }>
                 <IconButton><InfoIcon/></IconButton>
                </Tooltip>
              <Button variant="text" sx={{textDecoration: 'underline'}} onClick={() => handleOpenModale("Modifica", row)}>
                  Modifica
              </Button>
            </TableCell>
            <TableCell sx={{width: '5%'}}>
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
                <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="piatti">
                    <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: 'bold'}}>Piatti</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {row.piatti?.map((piatto) => (
                        <TableRow key={piatto.idPiatto}>
                            <TableCell component="th" scope="row">
                                {piatto.nome}
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
}

const TabellaEliminaInserisciCategoria = (props) => {
  const theme = useTheme();
  
  const {rows, selectionModel, setSelectionModel, handleOpenModale, handleOpenModaleEliminazione} = props;

  const modificaSelezioneCategoria = (vecchiaSelezione, idCategoria) => {
    let nuovaSelezione = [];

    if(!vecchiaSelezione)
      return nuovaSelezione;

    if(idCategoria <= 0)
      return vecchiaSelezione;

    const indiceSelezionato = vecchiaSelezione.indexOf(idCategoria);

    if (indiceSelezionato === -1) {
      nuovaSelezione = nuovaSelezione.concat(vecchiaSelezione, idCategoria);
    } else if (indiceSelezionato === 0) {
      nuovaSelezione = nuovaSelezione.concat(vecchiaSelezione.slice(1));
    } else if (indiceSelezionato === vecchiaSelezione.length - 1) {
      nuovaSelezione = nuovaSelezione.concat(vecchiaSelezione.slice(0, -1));
    } else if (indiceSelezionato > 0) {
      nuovaSelezione = nuovaSelezione.concat(
        vecchiaSelezione.slice(0, indiceSelezionato),
        vecchiaSelezione.slice(indiceSelezionato + 1),
      );
    }

    return nuovaSelezione;
  }

  const handleClick = (event, idCategoria) => {
    const nuovaSelezione = modificaSelezioneCategoria(selectionModel, idCategoria);
    setSelectionModel(nuovaSelezione);
  };

  const isSelected = (idCategoria) => selectionModel.indexOf(idCategoria) !== -1;

  return (
    <>
    {selectionModel.length > 0 ? (
        <Tooltip title="Elimina selezionato/i">
          <Button
          sx={{ borderRadius: 3, color:theme.palette.white.main, backgroundColor:theme.palette.fourtiary.main }}
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleOpenModaleEliminazione}
        >
          Elimina selezionato/i
        </Button>
        </Tooltip>
    ) : (
      <></>
    )}
    <TableContainer component={Paper}>
      <Table aria-label="categorie">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{fontWeight: 'bold'}}>Nome categoria</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.idCategoria} isSelected={isSelected(row.idCategoria)} row={row} handleClick={handleClick} handleOpenModale={handleOpenModale}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default TabellaEliminaInserisciCategoria