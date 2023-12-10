import { Modal, Box, Typography, useTheme, Button } from '@mui/material'
import React from 'react'
import { TIPO_SUCCESSO } from '../CONSTANTS';

const ModaleSuccessoErrore = (props) => {
  const theme = useTheme();

  const {open, handleClose, tipo, titolo, messaggio, testoButton} = props;
  
  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4,
            '@media screen and (max-width: 600px)': {width: '85%'}, borderRadius: '10px'}}>
            {tipo === TIPO_SUCCESSO ? (
                <Typography variant="h6" component="h2" sx={{color: theme.palette.tertiary.main, fontWeight: 'bold'}}>
                    {titolo}
                </Typography>
                ) : (
                    <Typography variant="h6" component="h2" sx={{color: theme.palette.fourtiary.main, fontWeight: 'bold'}}>
                        {titolo}
                    </Typography>
                )
            }
            
            <Typography sx={{whiteSpace: 'pre-line'}}>{messaggio}</Typography>
                <Box sx={{width: '100%'}} display="flex" justifyContent="center" alignItems="center" flexDirection="row">
                    <Button
                    onClick={handleClose}
                    color="tertiary"
                    type="submit"
                    variant="contained"
                    sx={{ m: 1, width: '70%', color: theme.palette.white.main}}
                    >
                        {testoButton}
                    </Button>
                </Box>
        </Box>
    </Modal>
  )
}

export default ModaleSuccessoErrore