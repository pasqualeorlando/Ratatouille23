import { Grid } from '@mui/material'
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GraficoEntrate from './components/GraficoEntrate';
import { useTheme } from '@mui/material/styles';
import TabellaPiattiPiuVenduti from './components/TabellaPiattiPiuVenduti';

const DashboardView = (props) => {
  const theme = useTheme();
  const {migliorAddettoSala, migliorAddettoCucina, ordinazioniMeseCorrente, ordinazioniMeseScorso, clienti} = props;

  return (
    <div>
    <br/><br/><h1>Dashboard</h1><br/>
    <p>Periodo di riferimento: mese corrente</p><br/>

    <Grid container component="main" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 5}} >
        <Grid item md={3} lg={3} sm={12} xs={12}>
            <Card sx={{background: "linear-gradient(0deg, " + theme.palette.secondary.main + " 0%, " + theme.palette.primary.main + " 100%)"}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color={theme.palette.black.main}>
                    Miglior addetto alla sala
                    </Typography>
                    <Typography sx={{ fontSize: 20 }} color={theme.palette.black.main}>
                    {migliorAddettoSala ? migliorAddettoSala.nome + " " + migliorAddettoSala.cognome : "N/A"}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item md={3} lg={3} sm={12} xs={12}>
            <Card sx={{background: "linear-gradient(0deg, " + theme.palette.secondary.main + " 0%, " + theme.palette.primary.main + " 100%)",}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color={theme.palette.black.main}>
                    Miglior addetto alla cucina
                    </Typography>
                    <Typography sx={{ fontSize: 20 }} color={theme.palette.black.main}>
                    {migliorAddettoCucina ? migliorAddettoCucina.nome + " " + migliorAddettoCucina.cognome : 'N/A'}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item md={3} lg={3} sm={12} xs={12}>
            <Card sx={{background: "linear-gradient(180deg, " + theme.palette.tertiary.main + " 0%, " + theme.palette.primary.main + " 100%)",}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color={theme.palette.black.main}>
                    Ordinazioni evase
                    </Typography>
                    <Typography sx={{ fontSize: 20 }} color={theme.palette.black.main}>
                    {ordinazioniMeseCorrente?.length || '0'}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item md={3} lg={3} sm={12} xs={12}>
            <Card sx={{background: "linear-gradient(180deg, " + theme.palette.tertiary.main + " 0%, " + theme.palette.primary.main + " 100%)",}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color={theme.palette.black.main}>
                    Clienti
                    </Typography>
                    <Typography sx={{ fontSize: 20 }} color={theme.palette.black.main}>
                    {clienti}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    </Grid><br/><br/>

    <GraficoEntrate ordinazioniMeseScorso={ordinazioniMeseScorso} ordinazioniMeseCorrente={ordinazioniMeseCorrente}></GraficoEntrate><br/><br/>
    <TabellaPiattiPiuVenduti ordinazioniMeseCorrente={ordinazioniMeseCorrente}></TabellaPiattiPiuVenduti><br/>
    </div>
  )
}

export default DashboardView