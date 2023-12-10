import React, { useEffect, useState } from 'react'
import { ottieniDipendentiDaRuolo } from '../../services/DipendenteService';
import { ottieniOrdinazioniDipendente } from '../../services/OrdinazioneService';
import { ottieniPreparazioniOrdinazione } from '../../services/PreparazionePiattiOrdinazioneService';
import { ottieniTavoloDaId } from '../../services/TavoloService';
import StatisticheSalaView from './StatisticheSalaView'

const StatisticheSalaContainer = () => {
  const [dipendenti, setDipendenti] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dipendenti = await ottieniDipendentiDaRuolo('Addetto alla sala');

        //Aggiungo le ordinazioni ad ogni dipendente
        for(const dipendente of dipendenti){
          dipendente.ordinazioni = [];

          const ordinazioni = await ottieniOrdinazioniDipendente(dipendente.idDipendente);

          //Aggiungo le preparazioni e il tavolo corrispondente ad ogni ordinazione (per prendere il costo di ogni singolo piatto e i clienti serviti)
          for(const ordinazione of ordinazioni){
            ordinazione.preparazioni = [];
            ordinazione.tavolo = {};

            const preparazioni = await ottieniPreparazioniOrdinazione(ordinazione.idOrdinazione);
            const tavolo = await ottieniTavoloDaId(ordinazione.idTavolo);

            ordinazione.preparazioni = preparazioni;
            ordinazione.tavolo = tavolo;
          }

          dipendente.ordinazioni = ordinazioni;
        }


        return dipendenti;
      } catch (error) {
        console.log(error);
      }
    }

    fetchData().then(dip => {
      setDipendenti(dip);
    }).catch(error => console.log(error));
  }, []);

  return (
    <StatisticheSalaView dipendenti={dipendenti}></StatisticheSalaView>
  )
}

export default StatisticheSalaContainer