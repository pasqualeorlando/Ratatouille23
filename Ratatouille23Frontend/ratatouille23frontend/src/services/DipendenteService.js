import axios from "./axiosConfig";

const MIGLIOR_ADDETTO_SALA = '/dipendente/getMigliorAddettoSala';
const MIGLIOR_ADDETTO_CUCINA = '/dipendente/getMigliorAddettoCucina';
const OTTIENI_DIPENDENTI = '/dipendente/getDipendenti';
const ELIMINA_DIPENDENTE = '/dipendente/eliminaDipendente';
const AGGIUNGI_DIPENDENTE = '/dipendente/creaDipendente';
const OTTIENI_DIPENDENTI_DA_RUOLO = '/dipendente/getDipendentiDaRuolo';

export const ottieniMigliorAddettoAllaSala = async (dataInizio, dataFine) => {
    return axios.get(MIGLIOR_ADDETTO_SALA+`/${dataInizio}/${dataFine}`).then(res => res.data).catch(res => null);
}

export const ottieniMigliorAddettoAllaCucina = async (dataInizio, dataFine) => {
    return axios.get(MIGLIOR_ADDETTO_CUCINA+`/${dataInizio}/${dataFine}`).then(res => res.data).catch(res => null);
}

export const ottieniDipendenti = async () => {
    return axios.get(OTTIENI_DIPENDENTI).then(res => res.data).catch(res => null);
}

export const eliminaDipendente = async (idDipendente) => {
    return axios.delete(ELIMINA_DIPENDENTE+`/${idDipendente}`);
}

export const aggiungiDipendente = async (dipendente) => {
    return axios.post(AGGIUNGI_DIPENDENTE, dipendente);
}

export const ottieniDipendentiDaRuolo = async (ruolo) => {
    return axios.get(OTTIENI_DIPENDENTI_DA_RUOLO + `/${ruolo}`).then(res => res.data).catch(res => null);
}