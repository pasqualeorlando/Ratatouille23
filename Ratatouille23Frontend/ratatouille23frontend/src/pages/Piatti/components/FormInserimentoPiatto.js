import React, { useEffect, useState } from 'react';
import { Modal, Box, Grid, TextField, Select, MenuItem, Button, Typography, FormControl, FormControlLabel, FormLabel, FormGroup, Checkbox, InputLabel, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { useTheme } from '@mui/system';
import { aggiungiPiatto, modificaPiatto, ottieniPiattiAttiviDaIdCategoria, ottieniPiattiDaIdCategoria } from '../../../services/PiattoService';

const FormInserimentoPiatto = (props) => {
  const theme = useTheme();

  const {open, modalita, piatto, rows, setPiatti, handleClose, handleOpenModaleSuccesso, handleOpenModaleSuccesso2, handleOpenModaleErrore, allergeni, categorie, ottieniPossibiliNomiPiatti} = props;
  
  const [nomePiatto, setNomePiatto] = useState('');
  const [costo, setCosto] = useState(0.01);
  const [descrizione, setDescrizione] = useState('');
  const [categoria, setCategoria] = useState({});
  const [allergeniPiatto, setAllergeniPiatto] = useState([]);
  const [idPiatto, setIdPiatto] = useState(0);

  useEffect(() => {
    setNomePiatto(piatto?.nome || '');
    setCosto(piatto?.costo || 0.01);
    setDescrizione(piatto?.descrizione || '');
    setIdPiatto(piatto?.id || 0);
    setCategoria('');

    categorie.forEach(cat => {
        if(cat.idCategoria === piatto?.idCategoria)
            setCategoria(cat);
    });

    setAllergeniPiatto(piatto?.allergeni || []);

  }, [piatto, categorie]);

  const handleChangeCheckbox = (e) => {
    const index = allergeniPiatto?.indexOf(e.target.value);
    if(index === -1)
        setAllergeniPiatto([...allergeniPiatto, e.target.value]);
    else {
        setAllergeniPiatto([...allergeniPiatto.slice(0, index), ...allergeniPiatto.slice(index+1)])
    }
  }

  const formHandler = async (e) => {
      e.preventDefault();

      const piattiAttiviCategoria = await ottieniPiattiAttiviDaIdCategoria(categoria.idCategoria);
      const piattiCategoria = await ottieniPiattiDaIdCategoria(categoria.idCategoria);

      if(modalita === 'Inserimento') {
        const allergeni = [];
        allergeniPiatto?.forEach(allergene => {
            allergeni.push(allergene);
        });
        const piatto = {
            nome: nomePiatto,
            costo: costo,
            descrizione: descrizione,
            posizionePiatto: piattiCategoria.length>0 ? piattiCategoria[piattiCategoria.length - 1].posizionePiatto + 1 : 1,
            attivo: true,
            idCategoria: categoria.idCategoria,
            allergeni: allergeni,
            categoria: categoria.nome,
        };
        if(piattiAttiviCategoria.some((piattoCategoria) => piattoCategoria.nome === piatto.nome))
            handleOpenModaleErrore();
        else {
            //Chiamata api per inserire
            const data = await aggiungiPiatto(piatto);
            if(data !== null) {
                handleOpenModaleSuccesso();
                
                data['id'] = data['idPiatto'];
                delete data['idPiatto'];
                
                setPiatti([...rows, data]);
                handleClose();
            }

        }
      } else {
        piatto.idPiatto = idPiatto;
        piatto.nome = nomePiatto;
        piatto.costo = costo;
        piatto.descrizione = descrizione;
        piatto.categoria = categoria.nome;
        piatto.idCategoria = categoria.idCategoria;

        piatto.allergeni = allergeniPiatto;

        //Chiamata api per modificare
        const data = await modificaPiatto(piatto);
        if(data !== null) {
            handleOpenModaleSuccesso2();

            data['id'] = data['idPiatto'];
            delete data['idPiatto'];

            const index = rows.map(r => r.id).indexOf(data.id);
            if(index !== -1)
                setPiatti([...rows.slice(0, index), data, ...rows.slice(index+1)]);
            handleClose();
        }
      }

  };

  const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(ottieniPossibiliNomiPiatti(inputValue));
    }, 1);
  });

  return (
    <Modal
        open={open}
        onClose={()=>{setAllergeniPiatto([]); handleClose()}}
    >
        <Box sx={{overflow: 'auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', boxShadow: 24, p: 4,
    '@media screen and (max-width: 800px)': {width: '100%'}, '@media screen and (max-height: 800px)': {height: '100%'}, borderRadius: '10px'}}>
            <Typography variant="h6" component="h2" sx={{fontWeight: 'bold'}}>
                    {modalita === 'Inserimento' ? 'Inserisci piatto' : 'Modifica piatto'}
            </Typography>
            <IconButton onClick={handleClose} sx={{position: 'absolute', left: '92%', top: '2%', color: theme.palette.secondary.main}}>
                <CancelIcon></CancelIcon>
            </IconButton>
            <Grid component="form" elevation={0} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3}}
                justifyContent="center"
                direction="row"
                alignItems="center"
                onSubmit={(e) => formHandler(e)}>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    {
                    /*<TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nomePiatto"
                        label="Nome piatto"
                        name="nomePiatto"
                        type="text"
                        autoFocus
                        onChange={(e) => setNomePiatto(e.target.value)}
                        value={nomePiatto}
                    />*/
                    }
                    <AsyncCreatableSelect
                        //cacheOptions 
                        loadOptions={promiseOptions} 
                        margin="normal" 
                        fullWidth 
                        id="nomePiatto" 
                        name="nomePiatto" 
                        autoFocus 
                        onChange={(nuovoNome) => setNomePiatto(nuovoNome?.value || undefined)} 
                        required 
                        placeholder="Nome piatto"
                        isClearable
                        value={nomePiatto ? {value: nomePiatto, label: nomePiatto} : undefined}
                        formatCreateLabel={userInput => `Crea "${userInput}"`}
                        styles={{ 
                            menu: base => ({ ...base, zIndex: 9999 }),
                            control: (provided, state) => ({
                                ...provided,
                                background: '#fff',
                                borderColor: state.isFocused ? theme.palette.primary.main : theme.palette.grey.dark,
                                minHeight: '56px',
                                height: '56px',
                                boxShadow: state.isFocused ? '0 0 0 1px ' + theme.palette.primary.main : null,
                                marginTop: '8px',
                                "&:hover": {
                                    borderColor: !state.isFocused ? '#000000' : null,
                                },
                            }),
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <TextField
                        type="number"
                        margin="normal"
                        required
                        fullWidth
                        name="costo"
                        label="Costo"
                        id="costo"
                        onChange={(e) => setCosto(e.target.value)}
                        value={costo}
                        inputProps={{step: 0.01, min: 0.01}}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} mt={1}>
                    <FormControl fullWidth>
                        <InputLabel>Categoria *</InputLabel>
                        <Select
                            required
                            labelId="selectCategoria"
                            id="selectCategoria"
                            label="Categoria"
                            fullWidth
                            onChange={(e) => setCategoria(e.target.value)}
                            value={categoria || ''}
                        >
                            {
                                categorie.map((categoria) => (
                                        <MenuItem key={categoria.idCategoria} value={categoria}>{categoria.nome}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="descrizione"
                        label="Descrizione"
                        type="text"
                        id="descrizione"
                        onChange={(e) => {e.target.value==='' ? setDescrizione(null) : setDescrizione(e.target.value)}}
                        value={descrizione}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControl fullWidth component="fieldset" variant="standard">
                        <FormLabel>Allergeni</FormLabel>
                        <FormGroup>
                            <Grid container>
                            {
                                allergeni.map((allergene) => (
                                    <Grid item key={allergene.id}>
                                        <FormControlLabel
                                        value={allergene.nome}
                                        control={<Checkbox key={allergene.id} value={allergene.nome} checked={allergeniPiatto?.includes(allergene.nome) || false} onChange={(e) => handleChangeCheckbox(e)} name="allergeni"></Checkbox>}
                                        label={allergene.nomeVisualizzato}
                                        labelPlacement="end"
                                        />
                                    </Grid>
                                ))
                            }
                            </Grid>
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box 
                        sx={{width: 1/2}}
                        m="auto">
                        <Button
                            color="primary"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {modalita === 'Inserimento' ? 'Inserisci piatto' : 'Modifica piatto'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Modal>
  )
}

export default FormInserimentoPiatto