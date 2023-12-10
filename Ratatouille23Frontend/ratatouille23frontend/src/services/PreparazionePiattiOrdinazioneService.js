import axios from "./axiosConfig";

const OTTIENI_PREPARAZIONI_ORDINAZIONE = '/preparazione/getPreparazioniOrdinazione';
const OTTIENI_PREPRAZIONI_EVASE_DIPENDENTE = '/preparazione/getPreparazioniEvaseDipendente';
const AGGIUNGI_PREPARAZIONI_MULTIPLE = '/preparazione/creaPreparazioni';
const MODIFICA_PREPARAZIONE = '/preparazione/modificaPreparazione';

export const ottieniPreparazioniOrdinazione = async (idOrdinazione) => {
    return axios.get(OTTIENI_PREPARAZIONI_ORDINAZIONE + `/${idOrdinazione}`).then(res => res.data).catch(res => null);
}

export const ottieniPreparazioniEvaseDipendente = async (idDipendente) => {
    return axios.get(OTTIENI_PREPRAZIONI_EVASE_DIPENDENTE + `/${idDipendente}`).then(res => res.data).catch(res => null);
}

export const aggiungiPreparazioniMultiple = async (preparazioni) => {
    return axios.post(AGGIUNGI_PREPARAZIONI_MULTIPLE, preparazioni).then(res => res.data).catch(res => null);
}

export const modificaPreparazione = async (preparazione) => {
    return axios.put(MODIFICA_PREPARAZIONE, preparazione).then(res => res.data).catch(res => null);
}