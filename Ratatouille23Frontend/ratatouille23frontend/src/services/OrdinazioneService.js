import axios from "./axiosConfig";

const OTTIENI_ORDINAZIONI_TERMINATE_DATE = '/ordinazione/getOrdinazioniTerminate';
const OTTIENI_ORDINAZIONI_DIPENDENTE = '/ordinazione/getOrdinazioniDipendente';
const OTTIENI_ORDINAZIONE_DA_ID = '/ordinazione/getOrdinazioneDaId';
const OTTIENI_ORDINAZIONI_TAVOLO = '/ordinazione/getOrdinazioniDaIdTavolo';
const OTTIENI_ORDINAZIONI_DA_TERMINARE = '/ordinazione/getOrdinazioniDaTerminare';
const AGGIUNGI_ORDINAZIONE = '/ordinazione/creaOrdinazione';

export const ottieniOrdinazioniTerminateDate = async (dataInizio, dataFine) => {
    return axios.get(OTTIENI_ORDINAZIONI_TERMINATE_DATE+`/${dataInizio}/${dataFine}`).then(res => res.data).catch(res => null);
}

export const ottieniOrdinazioniDipendente = async (idDipendente) => {
    return axios.get(OTTIENI_ORDINAZIONI_DIPENDENTE + `/${idDipendente}`).then(res => res.data).catch(res => null);
}

export const ottieniOrdinazioneDaId = async (idOrdinazione) => {
    return axios.get(OTTIENI_ORDINAZIONE_DA_ID + `/${idOrdinazione}`).then(res => res.data).catch(res => null);
}

export const ottieniOrdinazioniDaIdTavolo = async (idTavolo) => {
    return axios.get(OTTIENI_ORDINAZIONI_TAVOLO + `/${idTavolo}`).then(res => res.data).catch(res => null);
}

export const ottieniOrdinazioniDaTerminare = async (data) => {
    return axios.get(OTTIENI_ORDINAZIONI_DA_TERMINARE + `/${data}`).then(res => res.data).catch(res => null);
}

export const aggiungiOrdinazione = async (ordinazione) => {
    return axios.post(AGGIUNGI_ORDINAZIONE, ordinazione).then(res => res.data).catch(res => null);
}