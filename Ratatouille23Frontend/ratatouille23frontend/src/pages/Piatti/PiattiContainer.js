import React from 'react'
import PiattiView from './PiattiView'
import { useEffect, useState } from 'react';
import { ottieniCategorie } from '../../services/CategoriaService';
import { ottieniPiattiAttivi, eliminaPiatto, ottieniNomiPiattiOpenFoodFacts } from '../../services/PiattoService';

const PiattiContainer = () => {
  const [piatti, setPiatti] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  const allergeni = [
    {id: 1, nome: "Arachidi", nomeVisualizzato: 'Arachidi'}, {id: 2, nome: "Frutta a guscio", nomeVisualizzato: 'Frutta a guscio'}, {id: 3, nome: "Latte", nomeVisualizzato: 'Latte'}, 
    {id: 4, nome: "Molluschi", nomeVisualizzato: 'Molluschi'}, {id: 5, nome: "Pesce", nomeVisualizzato: 'Pesce'}, {id: 6, nome: "Sesamo", nomeVisualizzato: 'Sesamo'},
    {id: 7, nome: "Soia", nomeVisualizzato: 'Soia'}, {id: 8, nome: "Crostacei", nomeVisualizzato: 'Crostacei'}, {id: 9, nome: "Glutine", nomeVisualizzato: 'Glutine'},
    {id: 10, nome: "Lupini", nomeVisualizzato: 'Lupini'}, {id: 11, nome: "Senape", nomeVisualizzato: 'Senape'}, {id: 12, nome: "Sedano", nomeVisualizzato: 'Sedano'},
    {id: 13, nome: "Anidride solforosa e solfiti", nomeVisualizzato: 'Anidride solforosa e solfiti'}, {id: 14, nome: "Uova", nomeVisualizzato: 'Uova'}
  ];

  const headCells = [
    { field: 'id', headerName: 'ID', flex: 0.1, sortable: false},
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'costo', headerName: 'Costo', flex: 0.3,
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }
        return `€${params.value}`;
      },
    },
    { field: 'descrizione', headerName: 'Descrizione', flex: 1 },
    { field: 'categoria', headerName: 'Categoria', flex: 1 },
  ];

  const eliminaPiattiSelezionati = () => {
    selectionModel.forEach(async (id) => {
      let response = await eliminaPiatto(id);
      if(response.status === 200)
        setPiatti((piatti) => piatti.filter((piatto) => piatto.id !== id));
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const piatti = await ottieniPiattiAttivi() || [];
        const categorie = await ottieniCategorie() || [];

        piatti.forEach(piatto => {
          piatto['id'] = piatto['idPiatto'];
          delete piatto['idPiatto'];
        });

        piatti.sort((p1, p2) => p1.id - p2.id);

        return {piatti, categorie};
      } catch (error) {
        console.log(error);
      }
    }

    fetchData().then(({piatti, categorie}) => {
      setPiatti(piatti);
      setCategorie(categorie);
    }).catch(error => console.log(error));
  }, []);

  const ottieniPossibiliNomiPiatti = async (nomeScritto) => {
    const nomi = [];

    const nomiTrovati = await ottieniNomiPiattiOpenFoodFacts(nomeScritto);

    for(const nome of nomiTrovati)
      nomi.push({value: nome, label: nome});
    return nomi;
  }

  return (
    <PiattiView allergeni={allergeni}
        categorie={categorie}
        rows={piatti}
        setPiatti={setPiatti}
        headCells={headCells}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
        eliminaPiattiSelezionati={eliminaPiattiSelezionati}
        ottieniPossibiliNomiPiatti={ottieniPossibiliNomiPiatti}
    ></PiattiView>
  )
}

export default PiattiContainer
