import React from 'react'
import { Modal, Box, Typography, useTheme, Button } from '@mui/material'
import { TIPO_CONFERMA } from '../CONSTANTS';

const ModaleConfermaAnnulla = (props) => {
  const theme = useTheme();

  const {action, handleClose, open, messaggio, titolo, tipo, testoButton} = props;

  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4,
            '@media screen and (max-width: 600px)': {width: '85%'}, borderRadius: '10px'}}>
            <Typography variant="h6" component="h2" sx={{color: theme.palette.tertiary.main, fontWeight: 'bold'}}>
                {titolo}
            </Typography>
            <Typography>{messaggio}</Typography>
                <Box sx={{width: '100%'}} display="flex" justifyContent="center" alignItems="center" flexDirection="row">
                    <Button
                        onClick={handleClose}
                        color='black'
                        type="submit"
                        variant="outlined"
                        sx={{ m: 1, width: '70%'}}
                    >
                        Annulla
                    </Button>
                    {tipo === TIPO_CONFERMA ? 
                        <Button
                        onClick={() => {action(); handleClose()}}
                        color="tertiary"
                        type="submit"
                        variant="contained"
                        sx={{ m: 1, width: '70%', color: theme.palette.white.main}}
                        >
                            {testoButton}
                        </Button>
                        :
                        <Button
                        onClick={() => {action(); handleClose()}}
                        color="fourtiary"
                        type="submit"
                        variant="contained"
                        sx={{ m: 1, width: '70%'}}
                        >
                            {testoButton}
                        </Button>
                    }
                    
                </Box>
        </Box>
    </Modal>
  )
}

export default ModaleConfermaAnnulla