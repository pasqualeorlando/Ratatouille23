import axios from './axiosConfig';

const AGGIUNGI_CATEGORIA_MENU = '/categoriemenu/aggiungiCategoriaMenu';
const OTTIENI_CATEGORIE_MENU_DA_IDMENU = '/categoriemenu/getCategorieMenu';
const OTTIENI_CATEGORIE_MENU_DA_IDCATEGORIA = '/categoriemenu/getMenuCategoria';
const MODIFICA_CATEGORIA_MENU = '/categoriemenu/modificaCategoriaMenu';
const ELIMINA_CATEGORIA_MENU = '/categoriemenu/eliminaCategoriaMenu';

export const aggiungiCategoriaMenu = async (categoriamenu) => {
    return axios.post(AGGIUNGI_CATEGORIA_MENU, categoriamenu).then(res => res.data).catch(res => null);
}

export const ottieniCategorieMenuDaIdMenu = async (idMenu) => {
    return axios.get(OTTIENI_CATEGORIE_MENU_DA_IDMENU+`/${idMenu}`).then(res => res.data).catch(res => null);
}

export const ottieniCategorieMenuDaIdCategoria = async (idCategoria) => {
    return axios.get(OTTIENI_CATEGORIE_MENU_DA_IDCATEGORIA+`/${idCategoria}`).then(res => res.data).catch(res => null);
}

export const modificaCategoriaMenu = async (categoriaMenu) => {
    return axios.put(MODIFICA_CATEGORIA_MENU, categoriaMenu).then(res => res.data).catch(res => null);
}

export const eliminaCategoriaMenu = async (idCategoriaMenu) => {
    return axios.delete(ELIMINA_CATEGORIA_MENU + `/${idCategoriaMenu}`);
}