import React from 'react';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, TextField, Stack, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PiattiPreparati = (props) => {
  const theme = useTheme();

  const { dipendenti } = props ;
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

  const handleChange = (event) => {
    setDipendenteSelezionato(event.target.value);
  };

  function calcolaPiattiPreparati(dipendenteSelezionato, dataInizio, dataFine, dipendenti) {
    let piattiPreparati = 0;
    let piattiPreparatiTotali = 0;
    const dataI = new Date(dataInizio);
    const dataF = new Date(dataFine);
  
    const dataFinale = new Date();
    dataFinale.setDate(dataF.getDate() + 1);
    dataFinale.setHours(0, 0, 0, 0);
  
    if(!dipendenteSelezionato)
        return [];
  
    if(Array.isArray(dipendenteSelezionato))
      return [1,1];
  
    //Calcolo clienti totali di tutti i dipendenti
    const dataOrdinazione = new Date();
    dipendenti.forEach(dipendente => {
      dipendente.preparazioni?.forEach(preparazione => {
        dataOrdinazione.setTime(new Date(preparazione.ordinazione.orarioOrdinazione));
        if(dataOrdinazione.getTime() >= dataI.getTime() && dataOrdinazione.getTime() <= dataFinale.getTime()) {
          if(dipendente.idDipendente === dipendenteSelezionato.idDipendente)
            piattiPreparati += preparazione.quantita;
          piattiPreparatiTotali += preparazione.quantita;
        }
      })
    })
    return [piattiPreparatiTotali, piattiPreparati];
    
  }

  const [piattiPreparatiTotali, piattiPreparati] = calcolaPiattiPreparati(dipendenteSelezionato, dataInizio, dataFine, dipendenti);

  const data = {
    labels: dipendenteSelezionato.length === 0 ? [] : dipendenteSelezionato !== dipendenti ? [dipendenteSelezionato.nome + " " + dipendenteSelezionato.cognome, 'Altri']  : ['Tutti', 'Altri'],
    datasets: [
      {
        label: '% piatti preparati',
        data: dipendenteSelezionato.length === 0 ? [] : [(piattiPreparati * 100 / piattiPreparatiTotali) || 0, 100 - ((piattiPreparati * 100 / piattiPreparatiTotali) || 0)],
        backgroundColor: [theme.palette.primary.main, theme.palette.secondary.main],
        borderColor: theme.palette.secondary.main,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{bgcolor: 'background.paper', boxShadow: '0px 3px 7px', p: 4, borderRadius: '30px'}}>
        <Typography variant="h5" component="h5"><b>Percentuale piatti preparati</b></Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ alignContent: 'space-between', display: 'flex', justifyContent: 'space-between', '@media screen and (max-width: 900px)': {display: 'block', justifyContent: 'normal'}, '@media screen and (min-width: 900px)': {display: 'flex', justifyContent: 'space-between'}}}>
            <FormControl sx={{marginBottom: '15px', width: '70%'}}>
                <InputLabel>Dipendente</InputLabel>
                <Select
                    required
                    labelId="selectDipendente"
                    id="selectDipendente"
                    label="Dipendente"
                    defaultValue=''
                    onChange={handleChange}
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
        <Grid container direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Doughnut data={data}/>
          </Grid>
        </Grid>
    </Box>
  )
}

export default PiattiPreparati;