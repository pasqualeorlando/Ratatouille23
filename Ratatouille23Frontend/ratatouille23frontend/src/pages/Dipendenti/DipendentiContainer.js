import React, { useEffect, useState } from 'react'
import { ottieniDipendenti } from '../../services/DipendenteService'
import DipendentiView from './DipendentiView'
import { eliminaDipendente } from '../../services/DipendenteService'

const DipendentiContainer = () => {
  const [dipendenti, setDipendenti] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  const headCells = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'cognome', headerName: 'Cognome', flex: 1 },
    { field: 'ruolo', headerName: 'Ruolo', flex: 1 }
  ]

  const eliminaDipendentiSelezionati = () => {
    selectionModel.forEach(async (id) => {
      let response = await eliminaDipendente(id);
      if(response.status === 200)
        setDipendenti((dipendenti) => dipendenti.filter((dipendente) => dipendente.id !== id));
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dipendenti = await ottieniDipendenti();

        if(dipendenti) {
          dipendenti?.forEach(dip => {
            dip['id'] = dip['idDipendente'];
            delete dip['idDipendente'];
          });
          return dipendenti
        } else
          return [];
      } catch (error) {
        console.log(error);
      }
    }

    fetchData().then(dip => {
      setDipendenti(dip);
    }).catch(error => console.log(error));
  }, []);

  return (
    <DipendentiView headCells={headCells} 
      rows={dipendenti}
      setRows={setDipendenti}
      selectionModel={selectionModel}
      setSelectionModel={setSelectionModel}
      eliminaDipendentiSelezionati={eliminaDipendentiSelezionati}>
    </DipendentiView>
  )
}

export default DipendentiContainer