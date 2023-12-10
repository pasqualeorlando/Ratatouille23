import React, { useEffect } from 'react'
import TavoliView from './TavoliView'
import { useState } from 'react'
import { modificaTavoloLocale, ottieniTavoliLocali } from '../../services/TavoloLocaleService'
import { creaTavolo } from '../../services/TavoloService'

const TavoliContainer = () => {
  const [tavoli, setTavoli] = useState([]);
  const [preparazioni, setPreparazioni] = useState([]);

  const occupaTavolo = async (tavolo) => {
    let response = await creaTavolo(tavolo.tavolo);
    
    if(response.status === 201) {
        let tavoloCreato = response.data;

        tavolo.stato = 'Occupato';
        tavolo.tavolo = tavoloCreato;
        
        let responseModifica = await modificaTavoloLocale(tavolo);
        if(responseModifica.status === 200) {
            const index = tavoli.map(t => t.numeroTavolo).indexOf(tavolo.numeroTavolo);
            if(index !== -1) {
                setTavoli([...tavoli.slice(0, index), tavolo, ...tavoli.slice(index+1)]);
            }
        }
    }
  }

  const richiediConto = async (tavolo) => {

    tavolo.stato = 'Conto richiesto';
    let response = await modificaTavoloLocale(tavolo);
    if(response.status === 200) {
        const index = tavoli.map(t => t.numeroTavolo).indexOf(tavolo.numeroTavolo);
        if(index !== -1) {
            setTavoli([...tavoli.slice(0, index), tavolo, ...tavoli.slice(index+1)]);
        }
    }
  }

  const liberaTavolo = async (tavolo) => {
    tavolo.stato = 'Libero';
    tavolo.tavolo = null;
    let response = await modificaTavoloLocale(tavolo);
    if(response.status === 200) {
      const index = tavoli.map(t => t.numeroTavolo).indexOf(tavolo.numeroTavolo);
      if(index !== -1) {
          setTavoli([...tavoli.slice(0, index), tavolo, ...tavoli.slice(index+1)]);
      }
  }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tavoli = await ottieniTavoliLocali() || [];

        return tavoli;
      } catch (error) {
        console.log(error);
      }
    }
    /*fetchData().then(tav => {
        setTavoli(tav);
    }).catch(error => console.log(error));*/

    (function ottieniTavoliEIniziaLoop(){
      fetchData().then(tav => {setTavoli(tav)}).catch(error => console.log(error));
      setTimeout(ottieniTavoliEIniziaLoop, 10000);
    })();
    
    /*setInterval(()=>{fetchData().then(tav => {
        setTavoli(tav);
    }).catch(error => console.log(error))}, 10000);*/
  }, []);

  return (
    <TavoliView tavoli={tavoli} occupaTavolo={occupaTavolo} richiediConto={richiediConto} liberaTavolo={liberaTavolo} preparazioni={preparazioni} setPreparazioni={setPreparazioni}></TavoliView>
  )
}

export default TavoliContainer