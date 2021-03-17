import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:8000/'
    baseURL: "http://tagify.eu.pythonanywhere.com/"
});
 
export default instance;