import axios from 'axios';

let url = window.location.hostname + ":8080/api";
url = url.includes("http") ? url : "http://" + url;
export default axios.create({
    baseURL: url,
})