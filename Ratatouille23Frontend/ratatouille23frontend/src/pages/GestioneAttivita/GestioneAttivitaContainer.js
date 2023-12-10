import React, { useState, useEffect } from 'react'
import GestioneAttivitaView from './GestioneAttivitaView'
import { attivita } from '../../config/DatiAttivita'
import { aggiungiTavoloLocale, eliminaTavoloLocale, ottieniTavoliLocali } from '../../services/TavoloLocaleService';

const GestioneAttivitaContainer = () => {
    const [tavoli, setTavoli] = useState([]);

    const aggiornaTavoli = async (nuovi) => {
        let start = tavoli.length > 0 ? tavoli[tavoli.length - 1].numeroTavolo : 0;
        if(nuovi > start) {
            for(let i = start+1; i <= nuovi; i++) {
                const response = await aggiungiTavoloLocale({numeroTavolo: i, stato: 'Libero', tavolo: null});
                if(response !== null) {
                    setTavoli([...tavoli, response]);
                }
            }
        } else if(nuovi < start) {
            for(let i = start; i > nuovi; i--) {
                const response = await eliminaTavoloLocale(i);
                if(response.status !== 200) {
                    const index = tavoli.map(t => t.numeroTavolo).indexOf(i);
                    setTavoli([...tavoli.slice(0, index), ...tavoli.slice(index+1)]);
                }
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const tavoli = await ottieniTavoliLocali();
            return tavoli;
          } catch (error) {
            console.log(error);
          }
        }
    
        fetchData().then(tav => {
          setTavoli(tav);
        }).catch(error => console.log(error));
    }, []);
    
    return (
      <GestioneAttivitaView attivita={attivita} tavoli={tavoli} aggiornaTavoli={aggiornaTavoli}></GestioneAttivitaView>
    )
  }

export default GestioneAttivitaContainer