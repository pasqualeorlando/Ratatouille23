import axios from './axiosConfig';

const SIGNIN = '/auth/signin'
//const REGISTRA_DIPENDENTE = '/auth/register';
const MODIFICA_CREDENZIALI = '/auth/modify';

export const signin = async (email, password) => {
    return axios.post(SIGNIN, JSON.stringify({email, password}), {headers: {'Content-Type' : 'application/json'}});
}

export const modificaCredenziali = async (dipendente) => {
    return axios.post(MODIFICA_CREDENZIALI, JSON.stringify(dipendente), {headers: {'Content-Type' : 'application/json'}});
}

export const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('dipendente');
}