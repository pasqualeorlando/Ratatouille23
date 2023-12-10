import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

const TabellaPiattiPiuVenduti = (props) => {
  const theme = useTheme();
  const {ordinazioniMeseCorrente} = props;

  function calcolaPiattiPiuVenduti(ordinazioni) {
    const rows = [];
  
    ordinazioni?.forEach(ordinazione => {
      ordinazione.preparazioni?.forEach(preparazione => {
        if(!rows.some(el => el.piatto.idPiatto === preparazione.piatto.idPiatto)) {
          rows.push({piatto: preparazione.piatto, quantita: preparazione.quantita});
        } else {
          const index = rows.map(el => el.piatto.idPiatto).indexOf(preparazione.piatto.idPiatto);
          rows[index].quantita += preparazione.quantita;
        }
      })
    });
  
    //Sorting
    rows.sort((a,b) => (a.quantita < b.quantita) ? 1 : ((b.quantita < a.quantita) ? -1 : 0));
  
    return rows;
  }

  const rows = calcolaPiattiPiuVenduti(ordinazioniMeseCorrente);

  return (
    <TableContainer component={Paper} sx={{paddingTop: '25px', paddingBottom: '25px', borderRadius: '30px', backgroundColor: theme.palette.white.main, boxShadow: '0px 3px 7px'}}>
    <h2 style={{marginLeft: '10px'}}>Piatti più venduti</h2>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Piatti più venduti">
        <TableHead>
          <TableRow>
            <TableCell><b>Nome</b></TableCell>
            <TableCell align="left"><b>Prezzo</b></TableCell>
            <TableCell align="left"><b>Quantità</b></TableCell>
            <TableCell align="left"><b>Totale</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.piatto.idPiatto}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.piatto.nome}
              </TableCell>
              <TableCell align="left">{row.piatto.costo}</TableCell>
              <TableCell align="left">{row.quantita}</TableCell>
              <TableCell align="left">{row.piatto.costo * row.quantita}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TabellaPiattiPiuVenduti