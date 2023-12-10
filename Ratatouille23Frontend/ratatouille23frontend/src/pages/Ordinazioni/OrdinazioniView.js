import { Button, Grid, useTheme } from '@mui/material'
import React, { useState } from 'react'
import OrdinazioniDaEvadere from './components/OrdinazioniDaEvadere';
import OrdinazioniEvase from './components/OrdinazioniEvase';

const OrdinazioniView = (props) => {
  const theme = useTheme();
  const { ordinazioniDaEvadere, ordinazioniEvase, modificaPreparazionePiatto } = props;

  const [visualizzazione, setVisualizzazione] = useState('evadere');
  return (
    <>
    <br/><br/><h1>Ordinazioni</h1><br/>
    <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button variant="contained" fullWidth onClick={()=>setVisualizzazione('evadere')} 
            sx={{backgroundColor: visualizzazione==='evase' ? theme.palette.grey.main : theme.palette.primary.main, height: '60px', fontSize: '20px'}}>
              <b>Ordinazioni da evadere</b>
            </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button variant="contained" fullWidth onClick={()=>setVisualizzazione('evase')} 
            sx={{backgroundColor: visualizzazione==='evadere' ? theme.palette.grey.main : theme.palette.secondary.main, height: '60px', fontSize: '20px'}}>
              <b>Ordinazioni evase</b>
            </Button>
        </Grid>
    </Grid><br/><br/>
    {visualizzazione === 'evadere' ? <OrdinazioniDaEvadere ordinazioni={ordinazioniDaEvadere} modificaPreparazionePiatto={modificaPreparazionePiatto}/> : <OrdinazioniEvase ordinazioni={ordinazioniEvase}/>}
    {/*console.log(new Date().toISOString().substring(0, 10))*/}
    </>
  )
}

export default OrdinazioniView