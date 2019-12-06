import axios from 'axios';
import { getAuth } from './services/auth';

const baseURL = 'https://api-producao.herokuapp.com'; // for Dev
// const baseURL = 'some production thing';

export const reqRoutes = {
    promo: baseURL + '/promo',
    newPromo: baseURL + '/newPromo',
    login: baseURL + '/login',
    categories: baseURL + '/canCategory',
    machines: baseURL + '/machine',
}

export const api = axios.create({
    baseURL: baseURL,
    headers: getAuth,
})
