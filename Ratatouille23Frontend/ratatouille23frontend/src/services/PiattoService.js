import axios from "./axiosConfig";

const OTTIENI_PIATTI_ATTIVI = '/piatto/getPiattiAttivi';
const ELIMINA_PIATTO = '/piatto/eliminaPiatto';
const AGGIUNGI_PIATTO = '/piatto/creaPiatto';
const MODIFICA_PIATTO = '/piatto/modificaPiatto';
const OTTIENI_PIATTI_CATEGORIA = '/piatto/getPiattiCategoria';

const OTTIENI_NOMI_PIATTI_OPENFOODFACTS = 'https://it.openfoodfacts.org/cgi/search.pl?search_terms=';

export const ottieniPiattiAttivi = async () => {
    return axios.get(OTTIENI_PIATTI_ATTIVI).then(res => res.data).catch(res => null);
}

export const eliminaPiatto = async (idPiatto) => {
    return axios.delete(ELIMINA_PIATTO+`/${idPiatto}`);
}

export const aggiungiPiatto = async (piatto) => {
    return axios.post(AGGIUNGI_PIATTO, piatto).then(res => res.data).catch(res => null);
}

export const modificaPiatto = async (piatto) => {
    return axios.put(MODIFICA_PIATTO, piatto).then(res => res.data).catch(res => null);
}

export const ottieniPiattiAttiviDaIdCategoria = async (idCategoria) => {
    return axios.get(OTTIENI_PIATTI_CATEGORIA+`/${idCategoria}/true`).then(res => res.data).catch(res => null);
}

export const ottieniPiattiDaIdCategoria = async (idCategoria) => {
    return axios.get(OTTIENI_PIATTI_CATEGORIA+`/${idCategoria}/false`).then(res => res.data).catch(res => null);
}

export const ottieniNomiPiattiOpenFoodFacts = async (stringa) => {
    const response = await axios.get(OTTIENI_NOMI_PIATTI_OPENFOODFACTS + `${stringa}&json=1`);
    const vettoreNomiTrovati = [];

    if(response.data === undefined)
        return null;
    
    const traverse = function(o, fn) {
        for (var i in o) {
            fn.apply(this,[i,o[i]]);  
            if (o[i] !== null && typeof(o[i])=="object") {
                traverse(o[i], fn);
            }
        }
    }
    traverse(response.data, function(k,v){
        if((k === 'product_name_it' || k === 'product_name') && v !== undefined && v !== null && v !== "") {
            if(vettoreNomiTrovati.findIndex((el) => el === v) === -1)
                vettoreNomiTrovati.push(v);
        }
    });

    return vettoreNomiTrovati;
}