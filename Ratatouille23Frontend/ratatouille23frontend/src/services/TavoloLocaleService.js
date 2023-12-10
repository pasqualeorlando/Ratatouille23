import axios from './axiosConfig';

const OTTIENI_TAVOLI_LOCALI = '/tavololocale/getTavoliLocali';
const MODIFICA_TAVOLO_LOCALE = '/tavololocale/modificaTavoloLocale';
const AGGIUNGI_TAVOLO_LOCALE = '/tavololocale/creaTavoloLocale';
const ELIMINA_TAVOLO_LOCALE = '/tavololocale/eliminaTavoloLocale';

export const ottieniTavoliLocali = async () => {
    return axios.get(OTTIENI_TAVOLI_LOCALI).then(res => res.data).catch(res => null);
}

export const modificaTavoloLocale = async (tavolo) => {
    return axios.put(MODIFICA_TAVOLO_LOCALE, tavolo);
}

export const aggiungiTavoloLocale = async (tavolo) => {
    return axios.post(AGGIUNGI_TAVOLO_LOCALE, tavolo).then(res => res.data).catch(res => null);
}

export const eliminaTavoloLocale = async (numeroTavolo) => {
    return axios.delete(ELIMINA_TAVOLO_LOCALE + `/${numeroTavolo}`);
}