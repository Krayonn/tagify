import axios from 'axios';

const baseUrl = process.env.API_URL;

const test = () => {
    console.log('BASEURL=',process.env.API_URL)
    return process.env.API_URL
}
const instance = axios.create({
    // baseURL: 'http://localhost:8000/'
    // baseURL: "https://tagify.eu.pythonanywhere.com"
    baseURL: test()
});


export default instance;