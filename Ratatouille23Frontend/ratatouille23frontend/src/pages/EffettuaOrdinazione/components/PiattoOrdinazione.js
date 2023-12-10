import { IconButton, useTheme } from '@mui/material'
import { Box, Grid, Typography, Stack } from '@mui/material'
import React, { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const PiattoOrdinazione = (props) => {
  const theme = useTheme();

  const {preparazione, eliminaPiattoDaOrdinazione, incrementaQuantita, decrementaQuantita} = props;

  const [quantita, setQuantita] = useState(preparazione.quantita);
  const handleModificaQuantita = (newQuantita) => {
    if(newQuantita < 1)
        return;
    setQuantita(newQuantita);
  }

  return (
    <Box sx={{border: '1px solid', borderColor: theme.palette.grey.dark, width: '100%', padding: '5px'}}>
        <Grid container direction="row" alignItems="center">
            <Grid item xs={6} sm={6} md={6} lg={6}>
                <Typography>{preparazione.piatto.nome}</Typography>
            </Grid>
            <Grid container item xs={6} sm={6} md={6} lg={6} direction="row" alignItems="center" display="flex" justifyContent="flex-end">
                <Box alignItems="center">
                    <Stack direction="row" alignItems="center">
                        <IconButton onClick={()=>{incrementaQuantita(); handleModificaQuantita(quantita+1)}}><AddCircleOutlineIcon/></IconButton>
                        <Typography>{quantita}</Typography>
                        <IconButton onClick={()=>{decrementaQuantita(); handleModificaQuantita(quantita-1)}}><RemoveCircleOutlineIcon/></IconButton>
                        <IconButton onClick={eliminaPiattoDaOrdinazione}><DeleteIcon/></IconButton>
                    </Stack> 
                </Box>
            </Grid>
            {preparazione.nota ? (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography sx={{color: theme.palette.grey.darker, fontSize: '15px'}}><i>{preparazione.nota}</i></Typography>
                </Grid>
            ): <></>}
        </Grid>
    </Box>
  )
}

export default PiattoOrdinazione