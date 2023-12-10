import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Grid, TextField, Stack, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrdiniEntrateTotali = (props) => {
  const theme = useTheme();
  const { dipendenti } = props;

  const curr = new Date();
  const mesePrec = new Date(curr - 30 * 24 * 60 * 60 * 1000);
  const [dataInizio, setDataInizio] = useState(mesePrec.toISOString().substring(0,10));
  const [dataFine, setDataFine] = useState(curr.toISOString().substring(0,10));

  const handleChangeDataInizio = (newDataInizio) => {
    const data = new Date(newDataInizio);
    setDataInizio(data.toISOString().substring(0,10));
  }
  const handleChangeDataFine = (newDataFine) => {
    const data = new Date(newDataFine);
    setDataFine(data.toISOString().substring(0,10));
  }

  let labels = [];
  dipendenti.forEach(dipendente => {
    labels.push(dipendente.nome + " " + dipendente.cognome);
  });

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Ordini ed entrate totali',
      },
    },
  };

  const calcolaEntrateDipendente = (ordinazioni, dataInizio, dataFine) => {
    let entrate = 0;
    const dataI = new Date(dataInizio);
    const dataF = new Date(dataFine);

    if (!dataInizio || dataInizio === "" || !dataFine || dataFine === "")
        return 0;

    try {
        let tmp = dataInizio === new Date(dataInizio).toISOString().substring(0, 10) && dataFine === new Date(dataFine).toISOString().substring(0, 10);
        if (!tmp) return 0;
    } catch (error) {
        return 0;
    }

    const dataFinale = new Date();
    dataFinale.setDate(dataF.getDate() + 1);
    dataFinale.setHours(0, 0, 0, 0);
    dataI.setHours(0,0,0,0);
    
    let dataOrd = null;
    if(ordinazioni) {
      for(let i = 0; i < ordinazioni.length; i++) {
        dataOrd = new Date(ordinazioni[i].orarioOrdinazione);
        if(dataOrd.getTime() >= dataI.getTime() && dataOrd.getTime() <= dataFinale.getTime())
          for(let j = 0; j < ordinazioni[i].preparazioni.length; j++)
            entrate += ordinazioni[i].preparazioni[j].quantita * ordinazioni[i].preparazioni[j].piatto.costo;
      }
    }
    return entrate;
  }

  const calcolaOrdiniDipendente = (ordinazioni, dataInizio, dataFine) => {
    let ordini = 0;
    const dataI = new Date(dataInizio);
    const dataF = new Date(dataFine);

    if (!dataInizio || dataInizio === "" || !dataFine || dataFine === "")
        return 0;

    try {
        let tmp = dataInizio === new Date(dataInizio).toISOString().substring(0, 10) && dataFine === new Date(dataFine).toISOString().substring(0, 10);
        if (!tmp) return 0;
    } catch (error) {
        return 0;
    }

    const dataFinale = new Date();
    dataFinale.setDate(dataF.getDate() + 1);
    dataFinale.setHours(0, 0, 0, 0);
    dataI.setHours(0,0,0,0);

    let dataOrd = null;
    if(ordinazioni) {
      for(let i = 0; i < ordinazioni.length; i++) {
        dataOrd = new Date(ordinazioni[i].orarioOrdinazione);
        if(dataOrd.getTime() >= dataI.getTime() && dataOrd.getTime() <= dataFinale.getTime())
          ordini++;
      }
    }
    return ordini;
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Entrate totali',
        data: dipendenti.map((dipendente) => calcolaEntrateDipendente(dipendente.ordinazioni, dataInizio, dataFine)),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.semitransparent,
      },
      {
        label: 'Ordini totali',
        data: dipendenti.map((dipendente) => calcolaOrdiniDipendente(dipendente.ordinazioni, dataInizio, dataFine)),
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.semitransparent,
      },
    ],
  };

  return (
    <Box sx={{bgcolor: 'background.paper', boxShadow: '0px 3px 7px', p: 4,
    '@media screen and (max-width: 800px)': {width: '100%'}, borderRadius: '30px'}}>
        <Typography variant="h5" component="h5"><b>Ordini ed entrate totali</b></Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="right" mb={2}>
            <DatePicker
              label="Data inizio"
              value={dataInizio}
              inputFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                handleChangeDataInizio(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <Typography>al</Typography>
            <DatePicker
              label="Data fine"
              value={dataFine}
              inputFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                handleChangeDataFine(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <Grid item xs={12} sm={12} md={12} lg={12} height="100%">
          <Bar options={options} data={data} redraw/>
        </Grid>
    </Box>
  )
}

export default OrdiniEntrateTotali