import React from 'react'
import { Typography, useTheme, Box, Grid, List, ListItem, ListItemText } from '@mui/material'

const OrdinazioneSingolaEvasa = (props) => {
  const theme = useTheme();
  const { ordinazione } = props;

  return (
    <Box sx={{backgroundColor: theme.palette.secondary.semitransparent, borderRadius: '10px', p: '5px'}}>
        <Grid container>
            <Grid item xs ={12} sm={12} md={6} lg={6}>
                <Typography variant="h6" component="h1"><b>ORDINAZIONE N° {ordinazione.idOrdinazione}</b></Typography>
            </Grid>
        </Grid>
        <Typography variant="h6" component="h1"><b>TAVOLO N° {ordinazione.tavolo.numeroTavolo}</b></Typography><br/>
        <hr color={theme.palette.black.main}/>
        <List>
            {
            ordinazione.preparazioni.map((preparazione) => (
                <ListItem key={preparazione.piatto.idPiatto} alignItems="flex-start">
                    <ListItemText
                        primaryTypographyProps={{fontSize: '20px'}}
                        secondaryTypographyProps={{fontSize: '16px'}}
                        primary={preparazione.quantita + "x " + preparazione.piatto.nome}
                        secondary={preparazione.nota? <>• {preparazione.nota}</> : <></>}>  
                    </ListItemText>
                </ListItem>
            ))
            }
        </List>
    </Box>
  )
}

export default OrdinazioneSingolaEvasa