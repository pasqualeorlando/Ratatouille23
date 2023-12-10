import axios from "./axiosConfig";

const OTTIENI_TAVOLI = '/tavolo/getTavoli';
const CREA_TAVOLO = '/tavolo/creaTavolo';
const OTTIENI_TAVOLO_DA_ID = '/tavolo/getTavoloDaId';

export const ottieniTavoliDataInizioDataFine = async (dataInizio, dataFine) => {
    return axios.get(OTTIENI_TAVOLI+`/${dataInizio}/${dataFine}`).then(res => res.data).catch(res => null);
}

export const creaTavolo = async (tavolo) => {
    return axios.post(CREA_TAVOLO, tavolo);
}

export const ottieniTavoloDaId = async (idTavolo) => {
    return axios.get(OTTIENI_TAVOLO_DA_ID + `/${idTavolo}`).then(res => res.data).catch(res => null);
}