import React from 'react'
import ClientiServiti from './components/ClientiServiti';
import OrdiniEntrateGiornaliere from './components/OrdiniEntrateGiornaliere';
import OrdiniEntrateTotali from './components/OrdiniEntrateTotali';
import { Box } from '@mui/material';

const StatisticheSalaView = (props) => {
  const { dipendenti } = props;
  return (
    <>
    <br/><br/><h1>Statistiche addetti alla sala</h1><br/>
    <OrdiniEntrateTotali dipendenti={dipendenti}/><br/>
    <OrdiniEntrateGiornaliere dipendenti={dipendenti}/><br/>
    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <ClientiServiti dipendenti={dipendenti}/>
    </Box><br/>
    </>
  )
}

export default StatisticheSalaView