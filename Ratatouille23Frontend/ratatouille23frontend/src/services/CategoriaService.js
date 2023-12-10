import axios from './axiosConfig';

const OTTIENI_CATEGORIE = '/categoria/getCategorie';
const OTTIENI_CATEGORIA_DA_ID = '/categoria/getCategoriaDaId';
const ELIMINA_CATEGORIA = '/categoria/eliminaCategoria';
const AGGIUNGI_CATEGORIA = '/categoria/creaCategoria';
const MODIFICA_CATEGORIA = '/categoria/modificaCategoria';

export const ottieniCategorie = async () => {
    return axios.get(OTTIENI_CATEGORIE).then(res => res.data).catch(res => null);
}

export const ottieniCategoriaDaId = async (idCategoria) => {
    return axios.get(OTTIENI_CATEGORIA_DA_ID + `/${idCategoria}`).then(res => res.data).catch(res => null);
}

export const aggiungiCategoria = async (categoria) => {
    return axios.post(AGGIUNGI_CATEGORIA, categoria).then(res => res.data).catch(res => null);
}

export const eliminaCategoria = async (idCategoria) => {
    return axios.delete(ELIMINA_CATEGORIA+`/${idCategoria}`);
}

export const modificaCategoria = async (categoria) => {
    return axios.put(MODIFICA_CATEGORIA, categoria).then(res => res.data).catch(res => null);
}