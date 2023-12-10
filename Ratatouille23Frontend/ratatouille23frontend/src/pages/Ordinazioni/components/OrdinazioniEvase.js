import { Grid } from '@mui/material';
import React from 'react'
import OrdinazioneSingolaEvasa from './OrdinazioneSingolaEvasa';

const OrdinazioniEvase = (props) => {
  const { ordinazioni } = props;
  return (
    <Grid container spacing={3}>
        {ordinazioni.map((ordinazione) => (
            <Grid item xs={12} sm={12} md={6} lg={6} key={ordinazione.idOrdinazione}><OrdinazioneSingolaEvasa ordinazione={ordinazione}/></Grid>
        ))}
    </Grid>
  )
}

export default OrdinazioniEvase