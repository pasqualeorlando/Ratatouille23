import React from 'react';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, TextField, Stack, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Line } from 'react-chartjs-2';
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

const OrdiniEntrateGiornaliere = (props) => {
  const theme = useTheme();

  const { dipendenti } = props;
  const [dipendenteSelezionato, setDipendenteSelezionato] = useState([]);

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
            display: false,
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


  function fillLabelsArray(dataInizio, dataFine) {
    const dataI = new Date(dataInizio);
    const dataF = new Date(dataFine);
    const labels = [];

    const dataFinale = new Date();
    dataFinale.setDate(dataF.getDate() + 1);
    dataFinale.setHours(0, 0, 0, 0);

    while(dataI.getTime() < dataFinale.getTime()){
        labels.push(dataI.toISOString().substring(0, 10));
        dataI.setDate(dataI.getDate() + 1);
    }
    return labels;
  }
  const labels = fillLabelsArray(dataInizio, dataFine);

  const handleChange = (event) => {
    setDipendenteSelezionato(event.target.value);
  };

  function calcolaEntrateDipendente(dipendente, dataInizio, dataFine) {
    const dataI = new Date(dataInizio);
    const dataF = new Date(dataFine);
    const risultati = [];

    const dataFinale = new Date();
    dataFinale.setDate(dataF.getDate() + 1);
    dataFinale.setHours(0, 0, 0, 0);

    if(!dipendente)
        return [].fill(0);

    if(Array.isArray(dipendente)) {
        let dataOrdinazione = new Date();
        let totale;
        while(dataI.getTime() < dataFinale.getTime()) {
            totale = 0;
            for(const dip of dipendente) {
                for(const ordinazione of dip.ordinazioni) {
                    dataOrdinazione.setTime(new Date(ordinazione.orarioOrdinazione));
                    if(dataOrdinazione.getDate() === dataI.getDate() && dataOrdinazione.getMonth() === dataI.getMonth() && dataOrdinazione.getFullYear() === dataI.getFullYear()) {
                        for(const preparazione of ordinazione.preparazioni) {
                            totale += preparazione.quantita * preparazione.piatto.costo;
                        }
                    }
                }
            }
            risultati.push(totale);
            dataI.setTime(dataI.getTime() + 24 * 60 * 60 * 1000);
        }
    } else {
        let trovato;
        let totale;
        let dataOrdinazione = new Date();
        while(dataI.getTime() < dataFinale.getTime()){
            trovato = false;
            totale = 0;

            for(const ordinazione of dipendente?.ordinazioni) {
                dataOrdinazione.setTime(new Date(ordinazione.orarioOrdinazione));
                if(dataOrdinazione.getDate() === dataI.getDate() && dataOrdinazione.getMonth() === dataI.getMonth() && dataOrdinazione.getFullYear() === dataI.getFullYear()) {
                    trovato = true;
                    for(const preparazione of ordinazione.preparazioni){
                        totale += preparazione.quantita * preparazione.piatto.costo;
                    }
                }
            }
            if(!trovato)
                risultati.push(0);
            else
                risultati.push(totale);
            dataI.setTime(dataI.getTime() + 24 * 60 * 60 * 1000);
        }
    }
    return risultati;
}

function calcolaOrdiniDipendente(dipendente, dataInizio, dataFine) {
    const dataI = new Date(dataInizio);
    const dataF = new Date(dataFine);
    const ordini = [];

    const dataFinale = new Date();
    dataFinale.setDate(dataF.getDate() + 1);
    dataFinale.setHours(0, 0, 0, 0);

    if(!dipendente)
        return [].fill(0);

    if(Array.isArray(dipendente)) {
        let dataOrdinazione = new Date();
        let totale;
        while(dataI.getTime() < dataFinale.getTime()) {
            totale = 0;

            for(const dip of dipendente) {
                for(const ordinazione of dip?.ordinazioni) {
                    dataOrdinazione.setTime(new Date(ordinazione.orarioOrdinazione));
                    if(dataOrdinazione.getDate() === dataI.getDate() && dataOrdinazione.getMonth() === dataI.getMonth() && dataOrdinazione.getFullYear() === dataI.getFullYear()) {
                        totale++;
                    }
                }
            }
            ordini.push(totale);
            dataI.setTime(dataI.getTime() + 24 * 60 * 60 * 1000);
        }
    } else {
        let trovato;
        let totale;
        let dataOrdinazione = new Date();
        while(dataI.getTime() < dataFinale.getTime()){
            trovato = false;
            totale = 0;

            for(const ordinazione of dipendente?.ordinazioni) {
                dataOrdinazione.setTime(new Date(ordinazione.orarioOrdinazione));
                if(dataOrdinazione.getDate() === dataI.getDate() && dataOrdinazione.getMonth() === dataI.getMonth() && dataOrdinazione.getFullYear() === dataI.getFullYear()) {
                    trovato = true;
                    totale++;
                }
            }
            if(!trovato)
                ordini.push(0);
            else
                ordini.push(totale);
            dataI.setTime(dataI.getTime() + 24 * 60 * 60 * 1000);
        }
    }
    return ordini;
}

  const data = {
    labels,
    datasets: [
        {
            label: 'Entrate',
            data: calcolaEntrateDipendente(dipendenteSelezionato, dataInizio, dataFine),
            yAxisID: 'y',
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.semitransparent,
        },
        {
            label: 'Ordini',
            data: calcolaOrdiniDipendente(dipendenteSelezionato, dataInizio, dataFine),
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.semitransparent,
            yAxisID: 'y',
        },
    ],
  };

  return (
    <Box sx={{bgcolor: 'background.paper', boxShadow: '0px 3px 7px', p: 4,
    '@media screen and (max-width: 800px)': {width: '100%'}, borderRadius: '30px'}}>
        <Typography variant="h5" component="h5"><b>Ordini ed entrate giornaliere</b></Typography>
        {dipendenti.length > 0 ? (
            <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ alignContent: 'space-between', display: 'flex', justifyContent: 'space-between', '@media screen and (max-width: 900px)': {display: 'block', justifyContent: 'normal'}, '@media screen and (min-width: 900px)': {display: 'flex', justifyContent: 'space-between'}}}>
            <FormControl sx={{marginBottom: '15px', width: '100%'}}>
                <InputLabel>Dipendente</InputLabel>
                <Select
                    required
                    labelId="selectDipendente"
                    id="selectDipendente"
                    label="Dipendente"
                    defaultValue=''
                    onChange={(e) => handleChange(e)}
                >
                    <MenuItem value={dipendenti}>
                        <em>Tutti</em>
                    </MenuItem>
                    {dipendenti.map((dipendente) => <MenuItem key={dipendente.idDipendente} value={dipendente}>{dipendente.nome + " " + dipendente.cognome}</MenuItem>)}
                </Select>
            </FormControl>
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
          </Box>
        </LocalizationProvider>
        <Grid item xs={12} sm={12} md={12} lg={12} height="100%">
          <Line options={options} data={data}/>
        </Grid>
            </>
        ) : <></>}
    </Box>
  )
}

export default OrdiniEntrateGiornaliere