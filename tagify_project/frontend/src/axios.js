import axios from 'axios';


const instance = axios.create({
    // baseURL: 'http://localhost:8000/'
    // baseURL: "https://tagify.eu.pythonanywhere.com"
    baseURL: process.env.API_URL
});


export default instance;