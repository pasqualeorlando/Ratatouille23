import axios from "./axiosConfig";

const OTTIENI_TUTTI_MENU = '/menu/getMenu';
const AGGIUNGI_MENU = '/menu/creaMenu';
const AGGIORNA_MENU = '/menu/modificaMenu';
const ELIMINA_MENU = '/menu/eliminaMenu';

export const ottieniMenu = async () => {
    return axios.get(OTTIENI_TUTTI_MENU).then(res => res.data).catch(res => null);
}

export const aggiungiMenu = async (menu) => {
    return axios.post(AGGIUNGI_MENU, menu).then(res => res.data).catch(res => null);
}

export const modificaMenu = async (menu) => {
    return axios.put(AGGIORNA_MENU, menu).then(res => res.data).catch(res => null);
}

export const eliminaMenu = async (idMenu) => {
    return axios.delete(ELIMINA_MENU + `/${idMenu}`);
}