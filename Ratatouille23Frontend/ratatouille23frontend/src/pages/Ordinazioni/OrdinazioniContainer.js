import React, { useState, useEffect } from 'react'
import { ottieniOrdinazioniDaTerminare, ottieniOrdinazioniTerminateDate } from '../../services/OrdinazioneService';
import { modificaPreparazione, ottieniPreparazioniOrdinazione } from '../../services/PreparazionePiattiOrdinazioneService';
import { ottieniTavoloDaId } from '../../services/TavoloService';
import useAuth from '../../hooks/useAuth';
import OrdinazioniView from './OrdinazioniView'

const OrdinazioniContainer = () => {
  const [ordinazioniDaEvadere, setOrdinazioniDaEvadere] = useState([]);
  const [ordinazioniEvase, setOrdinazioniEvase] = useState([]);
  const { auth } = useAuth();

  const isOrdinazioneEvasa = (ordinazione) => {
    let isEvasa = true;

    for(const p of ordinazione.preparazioni) {
        if(p.statoPreparazione !== 'Evaso')
            isEvasa = false;
    }

    return isEvasa;
  }

  const modificaPreparazionePiatto = async (preparazione, nuovoStato) => {

    if(nuovoStato === 'In preparazione')
        preparazione.idDipendente = auth?.dipendente?.idDipendente;

    preparazione.statoPreparazione = nuovoStato;
    const prep = await modificaPreparazione(preparazione);
    if(prep) {
        const ordinazione = ordinazioniDaEvadere.filter((o) => o.idOrdinazione === prep.idOrdinazione);
        const ordIndex = ordinazioniDaEvadere.indexOf((o) => o.idOrdinazione === ordinazione.idOrdinazione);
        const prepIndex = ordinazione.preparazioni.indexOf((p) => p.idPreparazionePiattoOrdinazione === prep.idPreparazionePiattoOrdinazione);

        ordinazione.preparazioni[prepIndex] = preparazione;

        if(!isOrdinazioneEvasa(ordinazione))
            setOrdinazioniDaEvadere([...ordinazioniDaEvadere.slice(0, ordIndex), ordinazione, ...ordinazioniDaEvadere.slice(ordIndex+1)]);
        else {
            setOrdinazioniDaEvadere([...ordinazioniDaEvadere.slice(0, ordIndex), ...ordinazioniDaEvadere.slice(ordIndex+1)]);
            setOrdinazioniEvase([ordinazione, ...ordinazioniEvase]);
        }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adesso = new Date();
        const dataOdierna = adesso.getFullYear() + "-" + (adesso.getMonth()+1<10 ? "0"+ (adesso.getMonth()+1) : adesso.getMonth()+1) + "-" + (adesso.getDate() < 10 ? "0" + adesso.getDate() : adesso.getDate());
        const domani = new Date();
        domani.setDate(adesso.getDate() + 1);
        const dataDomani = domani.getFullYear() + "-" + (domani.getMonth()+1<10 ? "0"+ (domani.getMonth()+1) : domani.getMonth()+1) + "-" + (domani.getDate() < 10 ? "0" + domani.getDate() : domani.getDate());
        
        const ordinazioniDaTerminare = await ottieniOrdinazioniDaTerminare(dataOdierna);
        const ordinazioniTerminate = await ottieniOrdinazioniTerminateDate(dataOdierna, dataDomani);

        if(ordinazioniDaTerminare)
            for(const ordinazioneDaTerminare of ordinazioniDaTerminare) {
                const preparazioni = await ottieniPreparazioniOrdinazione(ordinazioneDaTerminare.idOrdinazione);
                const tavolo = await ottieniTavoloDaId(ordinazioneDaTerminare.idTavolo);

                ordinazioneDaTerminare.preparazioni = preparazioni;
                ordinazioneDaTerminare.tavolo = tavolo;
            }

        if(ordinazioniTerminate)
            for(const ordinazioneTerminata of ordinazioniTerminate) {
                const preparazioni = await ottieniPreparazioniOrdinazione(ordinazioneTerminata.idOrdinazione);
                const tavolo = await ottieniTavoloDaId(ordinazioneTerminata.idTavolo);

                ordinazioneTerminata.preparazioni = preparazioni;
                ordinazioneTerminata.tavolo = tavolo;
            }


        return {ordinazioniDaTerminare, ordinazioniTerminate};
      } catch (error) {
        console.log(error);
      }
    }

    fetchData().then(({ordinazioniDaTerminare, ordinazioniTerminate}) => {
        setOrdinazioniDaEvadere(ordinazioniDaTerminare);
        setOrdinazioniEvase(ordinazioniTerminate);
    }).catch(error => console.log(error));

    const intervalId = setInterval(()=>{fetchData().then(({ordinazioniDaTerminare, ordinazioniTerminate}) => {
        setOrdinazioniDaEvadere(ordinazioniDaTerminare);
        setOrdinazioniEvase(ordinazioniTerminate);
    }).catch(error => console.log(error))}, 5000);

    return () => clearInterval(intervalId);

    /*fetchData().then(({ordinazioniDaTerminare, ordinazioniTerminate}) => {
      setOrdinazioniDaEvadere(ordinazioniDaTerminare);
      setOrdinazioniEvase(ordinazioniTerminate);
    }).catch(error => console.log(error));*/
  }, []);
  return (
    <OrdinazioniView ordinazioniDaEvadere={ordinazioniDaEvadere} ordinazioniEvase={ordinazioniEvase} modificaPreparazionePiatto={modificaPreparazionePiatto}/>
  )
}

export default OrdinazioniContainer