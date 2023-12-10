import DashboardView from "./DashboardView";

import React, { useEffect, useState } from 'react'
import { ottieniMigliorAddettoAllaCucina, ottieniMigliorAddettoAllaSala } from "../../services/DipendenteService";
import { ottieniOrdinazioniTerminateDate } from "../../services/OrdinazioneService";
import { ottieniTavoliDataInizioDataFine } from "../../services/TavoloService";
import { ottieniPreparazioniOrdinazione } from "../../services/PreparazionePiattiOrdinazioneService";

const DashboardContainer = () => {
  //MESE CORRENTE
  const dataOdierna = new Date();
  let dataFine = '';
  let dataInizio = '';

  const meseProssimo = dataOdierna.getMonth() + 2;
  if(meseProssimo > 12) {
    dataFine = (dataOdierna.getFullYear() + 1) + "-" + ((meseProssimo % 12)<10 ? "0"+(meseProssimo % 12) : meseProssimo % 12) + "-01";
  } else {
    dataFine = dataOdierna.getFullYear() + "-" + ((dataOdierna.getMonth()+2)<10 ? "0"+ (dataOdierna.getMonth()+2) : dataOdierna.getMonth()+2) + "-01";
  }
  dataInizio = dataOdierna.getFullYear() + "-" + (dataOdierna.getMonth()+1<10 ? "0"+ (dataOdierna.getMonth()+1) : dataOdierna.getMonth()+1) + "-01";

  //MESE SCORSO
  const dataFineMeseScorso = new Date(dataOdierna.getFullYear(), dataOdierna.getMonth(), 1);
  let dataInizioMeseScorso = '';
  if(dataFineMeseScorso.getMonth() === 0) {
    dataInizioMeseScorso = `${dataFineMeseScorso.getFullYear() - 1}-12-01`;
  } else
    dataInizioMeseScorso = `${dataFineMeseScorso.getFullYear()}-${dataFineMeseScorso.getMonth()<10 ? "0"+ (dataFineMeseScorso.getMonth()) : dataFineMeseScorso.getMonth()}-01`;
  let dataFineMeseScorsoString = dataFineMeseScorso.toISOString().substring(0, 10);

  //console.log(dataFine, dataInizio)
  //console.log(dataFineMeseScorso);

  const [migliorAddettoSala, setMigliorAddettoSala] = useState({nome: 'N/A', cognome: ''});
  const [migliorAddettoCucina, setMigliorAddettoCucina] = useState({nome: 'N/A', cognome: ''});
  const [ordinazioniMeseCorrente, setOrdinazioniMeseCorrente] = useState([]);
  const [ordinazioniMeseScorso, setOrdinazioniMeseScorso] = useState([]);
  const [clientiMeseCorrente, setClientiMeseCorrente] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const addettoSala = await ottieniMigliorAddettoAllaSala(dataInizio, dataFine);
        const addettoCucina = await ottieniMigliorAddettoAllaCucina(dataInizio, dataFine);
        const ordinazioniCorrente = await ottieniOrdinazioniTerminateDate(dataInizio, dataFine);
        const ordinazioniScorso = await ottieniOrdinazioniTerminateDate(dataInizioMeseScorso, dataFineMeseScorsoString);
        const tavoli = await ottieniTavoliDataInizioDataFine(dataInizio, dataFine);

        let clienti = 0;

        if(tavoli)
          for(const tavolo of tavoli)
            clienti += tavolo.numeroOspiti;

        if(ordinazioniCorrente)
          for(const ordinazione of ordinazioniCorrente) {
            ordinazione.preparazioni = await ottieniPreparazioniOrdinazione(ordinazione.idOrdinazione);
          };

        if(ordinazioniScorso)
          for(const ordinazione of ordinazioniScorso) {
            ordinazione.preparazioni = await ottieniPreparazioniOrdinazione(ordinazione.idOrdinazione);
          };

        return {addettoSala, addettoCucina, ordinazioniCorrente, ordinazioniScorso, clienti};

      } catch(err) {
        console.log(err);
      }

    }

    fetchData().then(res => {
      setMigliorAddettoSala(res.addettoSala);
      setMigliorAddettoCucina(res.addettoCucina);
      setOrdinazioniMeseCorrente(res.ordinazioniCorrente);
      setOrdinazioniMeseScorso(res.ordinazioniScorso);
      setClientiMeseCorrente(res.clienti);
    }).catch(err => console.log(err));

  }, [dataFine, dataInizio, dataFineMeseScorsoString, dataInizioMeseScorso]);

  return (
    <DashboardView 
      migliorAddettoSala={migliorAddettoSala}
      migliorAddettoCucina={migliorAddettoCucina}
      ordinazioniMeseCorrente={ordinazioniMeseCorrente}
      ordinazioniMeseScorso={ordinazioniMeseScorso}
      clienti={clientiMeseCorrente}>
    </DashboardView>
  )
}

export default DashboardContainer