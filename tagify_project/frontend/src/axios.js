import axios from 'axios';

const baseUrl = process.env.API_URL;

const instance = axios.create({
    baseURL: process.env.API_URL
});


export default instance;