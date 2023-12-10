import React from 'react'
import { Grid } from '@mui/material';
import OrdinazioneSingolaDaEvadere from './OrdinazioneSingolaDaEvadere';

const OrdinazioniDaEvadere = (props) => {
  const { ordinazioni, modificaPreparazionePiatto } = props;
  return (
    <Grid container spacing={3}>
        {ordinazioni.map((ordinazione) => (
            <Grid item xs={12} sm={12} md={6} lg={6} key={ordinazione.idOrdinazione}><OrdinazioneSingolaDaEvadere ordinazione={ordinazione} modificaPreparazionePiatto={modificaPreparazionePiatto}/></Grid>
        ))}
    </Grid>
  )
}

export default OrdinazioniDaEvadere