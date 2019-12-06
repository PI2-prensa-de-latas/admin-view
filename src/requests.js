import axios from 'axios';
import { getAuth } from './services/auth';

const baseURL = 'https://api-producao.herokuapp.com/'; // for Dev
// const baseURL = 'some production thing';

export const reqRoutes = {
    promo: '/promo',
    login: '/login',
}

export const api = axios.create({
    baseURL: baseURL,
    headers: getAuth,
})
