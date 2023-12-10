import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button, useTheme, Box, Paper } from '@mui/material'
import PiattoOrdinazione from './PiattoOrdinazione';
import { v4 as uuid } from 'uuid';

const ModaleVisualizzaOrdinazione = (props) => {
  const theme = useTheme();

  const {open, preparazioni, setPreparazioni, handleClose} = props;

  const eliminaPiattoDaOrdinazione = (index) => {
    setPreparazioni([...preparazioni.slice(0, index), ...preparazioni.slice(index+1)]);
  }

  const incrementaQuantita = (index) => {
    const newPreparazione = preparazioni[index];
    newPreparazione.quantita = Number(newPreparazione.quantita) + 1;

    setPreparazioni([...preparazioni.slice(0, index), newPreparazione, ...preparazioni.slice(index+1)]);
  }

  const decrementaQuantita = (index) => {
    const newPreparazione = preparazioni[index];

    if(newPreparazione.quantita === 1)
        return;
    
    newPreparazione.quantita -= 1;

    setPreparazioni([...preparazioni.slice(0, index), newPreparazione, ...preparazioni.slice(index+1)]);
  }

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="riepilogoOrdinazione"
        aria-describedby="riepilogo-ordinazione"
        sx={{overflowY: 'scroll', height: '70%', '@media screen and (max-width: 800px)' : {height: '100%', width: '100%', overflow: 'hidden'}}}
    >
        <DialogTitle sx={{color: theme.palette.tertiary.main, fontWeight: 'bold'}}>Riepilogo ordinazione</DialogTitle>
        <DialogContent dividers={true}>
            <Grid component={Paper} elevation={0} square container rowSpacing={0}
                justifyContent="center"
                direction="row"
                alignItems="center"
                marginTop={2}>

                {
                    preparazioni.map((preparazione, index) => (
                        <Grid item xs={12} sm={12} md={12} lg={12} key={uuid()} alignItems="center">
                            <PiattoOrdinazione preparazione={preparazione} 
                                eliminaPiattoDaOrdinazione={() => eliminaPiattoDaOrdinazione(index)} 
                                incrementaQuantita={() => incrementaQuantita(index)}
                                decrementaQuantita={() => decrementaQuantita(index)}/>
                        </Grid>
                    ))
                }
                
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box 
                        sx={{width: 1/2}}
                        m="auto">
                        
                    </Box>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
        <Button
            onClick={handleClose}
            color="primary"
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            OK
        </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ModaleVisualizzaOrdinazione