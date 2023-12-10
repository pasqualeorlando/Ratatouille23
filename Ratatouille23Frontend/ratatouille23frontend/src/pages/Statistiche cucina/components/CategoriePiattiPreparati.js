import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, TextField, Stack, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

function calcolaCategorie(dipendenteSelezionato, dataInizio, dataFine, dipendenti, categorie) {
  let piattiTotali = 0;
  let piattiCategoriaTmp;
  const dataOrd = new Date();
  const dataI = new Date(dataInizio);
  const dataF = new Date(dataFine);
  const risultati = [];

  const dataFinale = new Date();
  dataFinale.setDate(dataF.getDate() + 1);
  dataFinale.setHours(0,0,0,0);

  if(!dipendenteSelezionato)
        return [].fill(0);

  if(dipendenteSelezionato === dipendenti) {
    dipendenteSelezionato.forEach(dip => {
      dip.preparazioni.forEach(prep => {
        piattiTotali += prep.quantita;
      })
    })
  } else {
    dipendenteSelezionato?.preparazioni?.forEach(prep => {
      piattiTotali += prep.quantita;
    })
  }

  if(dipendenteSelezionato === dipendenti) {
    categorie.forEach(categoria => {
      piattiCategoriaTmp = 0;
      dipendenteSelezionato.forEach(dipendente => {
        dipendente.preparazioni.forEach(preparazione => {
          dataOrd.setTime(new Date(preparazione.ordinazione.orarioOrdinazione));
          if(dataOrd.getTime() >= dataI.getTime() && dataOrd.getTime() <= dataFinale.getTime()) {
            if(preparazione.piatto.idCategoria === categoria.idCategoria)
              piattiCategoriaTmp += preparazione.quantita;
          }
        })
      })
      risultati.push(piattiCategoriaTmp * 100 / piattiTotali);
    })
  } else {
    categorie.forEach(categoria => {
      piattiCategoriaTmp = 0;
      dipendenteSelezionato?.preparazioni?.forEach(preparazione => {
        dataOrd.setTime(new Date(preparazione.ordinazione.orarioOrdinazione));
        if(dataOrd.getTime() >= dataI.getTime() && dataOrd.getTime() <= dataFinale.getTime()) {
          if(preparazione.piatto.idCategoria === categoria.idCategoria)
            piattiCategoriaTmp += preparazione.quantita;
        }
      })
      risultati.push(piattiCategoriaTmp * 100 / piattiTotali);
    })
  }

  return risultati;
}

function getRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

const CategoriePiattiPreparati = (props) => {
  const { dipendenti, categorie } = props ;
  const [dipendenteSelezionato, setDipendenteSelezionato] = useState([]);

  /*useEffect(() => {
    setDipendenteSelezionato(dipendenti || []);
  }, [dipendenti])*/
  
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

  const risultati = calcolaCategorie(dipendenteSelezionato, dataInizio, dataFine, dipendenti, categorie);
  const labels = [];
  const colors = [];
  categorie.forEach(categoria => {
    labels.push(categoria.nome);
    colors.push(getRandomColor());
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: '% piatti preparati',
        data: risultati,
        backgroundColor: [...colors],
        borderColor: [...colors],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <Box sx={{bgcolor: 'background.paper', boxShadow: '0px 3px 7px', p: 4, borderRadius: '30px'}}>
        <Typography variant="h5" component="h5"><b>Categorie dei piatti preparati</b></Typography>
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
            {risultati.every(item => item === 0) ? <p>Nessun piatto preparato</p>: <Pie data={data}/>}
          </Grid>
        </Grid>
    </Box>
  )
}

export default CategoriePiattiPreparati