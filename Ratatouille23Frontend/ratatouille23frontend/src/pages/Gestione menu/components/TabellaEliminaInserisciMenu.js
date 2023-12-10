import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, useTheme, Tooltip, Button, Stack, Typography} from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomSwitch } from './CustomSwitch';
import { modificaMenu } from '../../../services/MenuService';

const Row = (props) => {
    const theme = useTheme();
    const { isSelected, row, handleClick, handleOpenModale, handleOpenModaleSuccesso, setMenu} = props;
    const [abilitato, setAbilitato] = useState(row?.abilitato);

    const handleChangeAbilitato = async (e) => {      
      const newValue = e.target.checked;
      
      const menuModificato = {
        idMenu: row.idMenu,
        nome: row.nome,
        abilitato: newValue,
      }

      const response = await modificaMenu(menuModificato);
      if(response != null) {
        handleOpenModaleSuccesso();
        setAbilitato(newValue);
      } else {
        setAbilitato(!newValue);
      }
    }

    return (
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover role="checkbox" 
            aria-checked={isSelected} 
            key={row.nome}
            selected={isSelected}
            tabIndex={-1}
        >
            <TableCell padding="checkbox" onClick={(event) => handleClick(event, row.idMenu)} >
                <Checkbox
                    color="primary"
                    checked={isSelected}
                    inputProps={{
                    'aria-labelledby': row.idMenu,
                    }}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                {row.nome}
            </TableCell>
            <TableCell>
                <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                    <Typography>Disabilitato</Typography>
                    <CustomSwitch checked={abilitato} onClick={(e) => handleChangeAbilitato(e)} inputProps={{ 'aria-label': 'switch' }}></CustomSwitch>
                    <Typography>Abilitato</Typography>
                    <Button variant="text" sx={{textDecoration: 'underline'}} onClick={() => handleOpenModale("Modifica", row)}>
                        Modifica
                    </Button>
                    <Button variant="text" sx={{textDecoration: 'underline', color: theme.palette.secondary.main}} onClick={() => setMenu(row)} >
                        Ordina elementi
                    </Button>
                </Stack>
            </TableCell>
        </TableRow>
        </>
    )
}

const TabellaEliminaInserisciMenu = (props) => {
  const theme = useTheme();
  const { rows, handleOpenModale, handleOpenModaleSuccesso, handleOpenModaleEliminazione, setMenu, selectionModel, setSelectionModel } = props;

  const handleClick = (event, idMenu) => {
    const selectedIndex = selectionModel.indexOf(idMenu);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectionModel, idMenu);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectionModel.slice(1));
    } else if (selectedIndex === selectionModel.length - 1) {
      newSelected = newSelected.concat(selectionModel.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectionModel.slice(0, selectedIndex),
        selectionModel.slice(selectedIndex + 1),
      );
    }

    setSelectionModel(newSelected);
  };

  const isSelected = (id) => selectionModel.indexOf(id) !== -1;

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
      <Table aria-label="menu">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{fontWeight: 'bold'}}>Nome menu</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.idMenu} isSelected={isSelected(row.idMenu)} row={row} handleOpenModale={handleOpenModale} handleOpenModaleSuccesso={handleOpenModaleSuccesso} handleClick={handleClick} setMenu={setMenu}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default TabellaEliminaInserisciMenu