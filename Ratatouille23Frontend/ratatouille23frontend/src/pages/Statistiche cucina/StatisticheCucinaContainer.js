import React from 'react'
import { ottieniPreparazioniEvaseDipendente } from '../../services/PreparazionePiattiOrdinazioneService';
import StatisticheCucinaView from './StatisticheCucinaView';
import { useEffect, useState } from 'react';
import { ottieniDipendentiDaRuolo } from '../../services/DipendenteService';
import { ottieniOrdinazioneDaId } from '../../services/OrdinazioneService';
import { ottieniCategorie } from '../../services/CategoriaService';

const StatisticheCucinaContainer = () => {
  const [dipendenti, setDipendenti] = useState([]);
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dip = await ottieniDipendentiDaRuolo('Addetto alla cucina');
        const cat = await ottieniCategorie();

        //Aggiungo le preparazioni ad ogni dipendente
        for(const dipendente of dip){
          dipendente.preparazioni = [];

          const preparazioni = await ottieniPreparazioniEvaseDipendente(dipendente.idDipendente);

          //Aggiungo l'ordinazione corrispondente ad ogni preparazione
          for(const preparazione of preparazioni){
            preparazione.ordinazione = {};
            const ordinazione = await ottieniOrdinazioneDaId(preparazione.idOrdinazione);
            preparazione.ordinazione = ordinazione;
          }

          dipendente.preparazioni = preparazioni;
        }

        return {dip, cat};
      } catch (error) {
        console.log(error);
      }
    }

    fetchData().then(({dip, cat}) => {
      setDipendenti(dip);
      setCategorie(cat);
    }).catch(error => console.log(error));
  }, []);

  return (
    <StatisticheCucinaView dipendenti={dipendenti} categorie={categorie}/>
  )
}

export default StatisticheCucinaContainer