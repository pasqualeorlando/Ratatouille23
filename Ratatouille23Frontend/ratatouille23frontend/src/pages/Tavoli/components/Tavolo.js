import { Typography, Card, CardContent, Grid, useTheme, ButtonBase } from '@mui/material'
import React from 'react'

const Tavolo = (props) => {
  const theme = useTheme();

  const {handleOpen, handleOpenDetails, tavolo} = props;
  
  let colore;
  if(tavolo.stato === 'Occupato')
    colore = theme.palette.fourtiary.main;
  else if(tavolo.stato === 'Conto richiesto')
    colore = theme.palette.primary.main;
  else
    colore = theme.palette.tertiary.main;

  return (
    <Grid item xs={6} sm={6} md={2} lg={2}>
      <Card sx={{backgroundColor: colore, textAlign: 'center', justifyContent: 'center', align: 'center', color: theme.palette.white.main, minHeight: 122}}>
        <ButtonBase disableRipple onClick={() => tavolo.stato === 'Libero' ? handleOpen(tavolo) : handleOpenDetails(tavolo)} sx={{width: '100%', minHeight: 122}}>
          <CardContent sx={{color: theme.palette.white.main}}>
            <Typography sx={{ fontSize: 30 }} gutterBottom>
              {tavolo.numeroTavolo}
            </Typography>
            <Typography>
            {
              (tavolo.tavolo?.numeroOspiti > 0 && tavolo.stato !== 'Libero') ? `Ospiti: ${tavolo.tavolo?.numeroOspiti}`: <></>
            }
            </Typography>
          </CardContent>
        </ButtonBase>
      </Card>
    </Grid>
  )
}

export default Tavolo