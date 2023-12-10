import React, { useState } from 'react'
import { useTheme } from '@mui/system';
import { Modal, Box, Grid, Paper, TextField, Button, Typography, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const FormOccupaTavolo = (props) => {
  const theme = useTheme();

  const {tavolo, open, handleClose, occupaTavolo} = props;

  const [ospiti, setOspiti] = useState(1);

  const formHandler = async (e) => {
    e.preventDefault();

    //Tavolo è TAVOLOLOCALE
    tavolo.tavolo = {numeroTavolo: tavolo.numeroTavolo, numeroOspiti: ospiti};
    
    await occupaTavolo(tavolo);
    setOspiti(1);
  }


  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4,
            '@media screen and (max-width: 600px)': {width: '85%'}, borderRadius: '10px'}}>
            <Typography variant="h6" component="h2" sx={{color: theme.palette.tertiary.main, fontWeight: 'bold'}}>
                    Nuovi ospiti
            </Typography>
            <IconButton onClick={()=>handleClose()} sx={{position: 'absolute', left: '85%', top: '5%', color: theme.palette.secondary.main}}>
                <CancelIcon></CancelIcon>
            </IconButton>
            <Typography>Hai selezionato il tavolo: {tavolo?.numeroTavolo}</Typography><br/>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} component={Paper} elevation={0} square>
                    <Box component="form" sx={{ mt: 1 }} onSubmit={(e)=>{formHandler(e); handleClose()}}>
                        <TextField
                            inputProps={{ step: 1, min: 1 }}
                            margin="normal"
                            required
                            fullWidth
                            id="numeroOspiti"
                            label="Ospiti"
                            name="numeroOspiti"
                            type="number"
                            autoFocus
                            value={ospiti}
                            onChange={(e) => setOspiti(e.target.value)}
                        />
                        <Box 
                            sx={{width: '100%'}}
                            m="auto"
                            display="flex"
                            justifyContent="flex-end"
                            alignitem="flex-end">
                            <Button
                                color="tertiary"
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, color: theme.palette.white.main }}
                            >
                                Occupa tavolo
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Modal>
  )
}

export default FormOccupaTavolo