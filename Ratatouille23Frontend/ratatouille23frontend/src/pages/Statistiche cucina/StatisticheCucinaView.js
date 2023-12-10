import { Grid } from '@mui/material';
import React from 'react'
import CategoriePiattiPreparati from './components/CategoriePiattiPreparati';
import PiattiEvasi from './components/PiattiEvasi'
import PiattiPreparati from './components/PiattiPreparati';

const StatisticheCucinaView = (props) => {
  const { dipendenti, categorie } = props;
  return (
    <>
    <br/><br/><h1>Statistiche addetti alla cucina</h1><br/>
    <PiattiEvasi dipendenti={dipendenti}/><br/>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <PiattiPreparati dipendenti={dipendenti}/>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <CategoriePiattiPreparati dipendenti={dipendenti} categorie={categorie}/>
      </Grid>
    </Grid><br/>
    </>
  )
}

export default StatisticheCucinaView