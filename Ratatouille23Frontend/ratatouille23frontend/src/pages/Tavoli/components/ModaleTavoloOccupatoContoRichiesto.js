import { Box, Dialog, DialogTitle, useTheme, List, ListItem, ListItemText, Button, DialogContent, DialogActions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import { v4 as uuid } from 'uuid';

const ModaleTavoloOccupatoContoRichiesto = (props) => {
  const theme = useTheme();
  const {auth} = useAuth();
    
  const {open, tavolo, handleClose, handleOpenNuovaOrdinazione, richiediConto, liberaTavolo, preparazioni} = props;

  const [preps, setPreps] = useState([]);

  useEffect(() => {
    setPreps(preparazioni);
  }, [preparazioni]);

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="riepilogoOrdinazione"
        aria-describedby="riepilogo-ordinazione"
        sx={{overflowY: 'scroll', height: '100%', '@media screen and (max-width: 800px)' : {height: '100%', width: '100%', overflow: 'hidden'}}}
    >
        <DialogTitle sx={{color: theme.palette.tertiary.main, fontWeight: 'bold'}}>Riepilogo ordinazione</DialogTitle>
        <DialogContent dividers={true}>
            <List>
                {preps?.map((preparazione) => (
                        <ListItem key={uuid()} alignItems="flex-start">
                            <ListItemText 
                                primary={preparazione.quantita + "x " + preparazione.piatto.nome}
                                secondary={preparazione.piatto.nota? <>• {preparazione.piatto.nota}</> : <></>}></ListItemText>
                        </ListItem>
                ))}
            </List>
        </DialogContent>
        <DialogActions>
            {
                (tavolo?.stato === 'Occupato') ? (
                    <Box sx={{width: '100%'}} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                        <Button
                            onClick={()=>{handleOpenNuovaOrdinazione(); handleClose()}}
                            color="tertiary"
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, width: '100%'}}
                        >
                            Nuova ordinazione
                        </Button>
                        <Button
                            onClick={() => {richiediConto(tavolo); handleClose()}}
                            color="primary"
                            type="submit"
                            variant="contained"
                            sx={{ mt: 1, width: '100%'}}
                        >
                            Richiedi conto
                        </Button>
                    </Box>
                ) : (
                    auth.dipendente.ruolo === 'Amministratore' ? (
                    <Box sx={{width: '100%'}} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                        <Button
                            onClick={()=>{liberaTavolo(tavolo); handleClose()}}
                            color="primary"
                            type="submit"
                            variant="contained"
                            sx={{ mt: 1, width: '100%'}}
                        >
                            Stampa conto
                        </Button>
                    </Box>
                    ) : <></>
                )
            }
        </DialogActions>
    </Dialog>
  )
}

export default ModaleTavoloOccupatoContoRichiesto