import axios from 'axios';
import { ElementoConfiCreate } from '../../types/elementoConfiguracionService';

const baseUrl = 'http://localhost:3000';

export const getElementoConfi = () => {
    return axios.get(`${baseUrl}/elementoc`);
};

export const postElementoConfi = async (elementoConfiData: ElementoConfiCreate) => {
  return axios.post(`${baseUrl}/elementoc`, elementoConfiData);
};