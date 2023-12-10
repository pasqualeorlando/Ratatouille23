import React from 'react'
import { Line } from 'react-chartjs-2'
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const GraficoEntrate = (props) => {
  const theme = useTheme();

  const {ordinazioniMeseScorso, ordinazioniMeseCorrente} = props;

  function calcolaEntrate(ordinazioni) {
    let risultati = new Array(31).fill(0);
    let totaleOrdinazione;
    const dataOrdinazione = new Date();

    if(!ordinazioni)
        return risultati;

    ordinazioni.forEach(ordinazione => {
        totaleOrdinazione = 0;
        dataOrdinazione.setTime(Date.parse(ordinazione.orarioOrdinazione));

        ordinazione.preparazioni.forEach(preparazione => {
            totaleOrdinazione += preparazione.piatto?.costo * preparazione.quantita;
        });
        risultati[dataOrdinazione.getDate()-1] += totaleOrdinazione;
    });

    return risultati;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    lineTension : 0.3,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Entrate',
            /*align: 'start',
            font: {
                size: 30,
            }*/
        },
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            min: 0,
        },
    },
  };
  
  //Giorni
  const labels = [];
  for(let i = 1; i < 32; i++)
    labels[i-1] = i.toString();

  const data = {
    labels,
    datasets: [
        {
            label: 'Mese corrente',
            data: calcolaEntrate(ordinazioniMeseCorrente),
            yAxisID: 'y',
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.semitransparent,
        },
        {
            label: 'Mese scorso',
            data: calcolaEntrate(ordinazioniMeseScorso),
            yAxisID: 'y',
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.semitransparent,
        },
    ],
};
  
  return (
    <Grid container height='50vh' justifyContent='center' sx={{borderRadius: '30px', backgroundColor: theme.palette.white.main, 
        boxShadow: '0px 3px 7px', '@media screen and (max-width: 900px)': {height: '30vh'}}}>
        <Grid item height='100%'
        xs={12} sm={12} md={11} lg={11}>
            <Line options={options} data={data} />
        </Grid>
    </Grid>
  )
}

export default GraficoEntrate