import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography, Grid, TextField, useTheme, Button, IconButton, TextareaAutosize } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';

const ModaleAggiungiPiattoOrdinazione = (props) => {
  const theme = useTheme();

  const {piatto, open, handleClose, preparazioni, setPreparazioni} = props;

  const [quantita, setQuantita] = useState(1);
  const [note, setNote] = useState('');

  useEffect(() => {
    setQuantita(1);
    setNote('');
  }, [piatto]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const preparazioneDaAggiungere = {
        quantita: quantita,
        nota: note,
        statoPreparazione: "Da preparare",
        piatto: piatto
    }

    const index = preparazioni.map(p => p.piatto.idPiatto).indexOf(piatto.idPiatto);
    if(index !== -1 && preparazioni[index].nota === preparazioneDaAggiungere.nota) {
        const newPreparazioni = preparazioni;
        newPreparazioni[index].quantita += preparazioneDaAggiungere.quantita;
        setPreparazioni(newPreparazioni);
    } else {
        setPreparazioni([...preparazioni, preparazioneDaAggiungere]);
    }

    //TODO mostrare popup piatto inserito?
    handleClose();
  }

  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={{overflow: 'hidden', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, bgcolor: 'background.paper', boxShadow: 24, p: 4,
    '@media screen and (max-width: 800px)': {width: '100%'}, '@media screen and (max-height: 800px)': {height: '100%'}, borderRadius: '10px'}}>
            <Typography variant="h6" component="h2" sx={{fontWeight: 'bold', color: theme.palette.tertiary.main}}>
                    Aggiungi piatto a ordinazione
            </Typography>
            <IconButton onClick={()=>handleClose()} sx={{position: 'absolute', left: '92%', top: '2%', color: theme.palette.secondary.main}}>
                <CancelIcon></CancelIcon>
            </IconButton>
            <Grid component="form" elevation={0} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3}}
                justifyContent="center"
                direction="row"
                alignItems="center"
                marginTop={2}
                onSubmit={(e) => handleSubmit(e)}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography>Piatto : {piatto?.nome}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="quantita"
                        label="Quantità"
                        type="number"
                        id="quantita"
                        InputProps={{inputProps: {min: 1}}}
                        value={quantita}
                        onChange={(e) => setQuantita(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} mt={1}>
                <TextareaAutosize
                    minRows={10}
                    aria-label="note"
                    placeholder="Note"
                    value={note}
                    style={{ width: '100%', height: '50%', resize: 'none' }}
                    onChange={(e) => setNote(e.target.value)}
                />
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
                            Aggiungi piatto
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Modal>
  )
}

export default ModaleAggiungiPiattoOrdinazione