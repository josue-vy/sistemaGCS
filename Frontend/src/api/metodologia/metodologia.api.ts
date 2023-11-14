import axios from 'axios';
import { MetodologiaRegister } from '../../types/metodologiaService';

const baseUrl = 'http://localhost:3000';

export const getMetodologia = () => {
    return axios.get(`${baseUrl}/metodologia`);
};

export const postMetodologia = async (metodologiaData: MetodologiaRegister) => {
  return axios.post(`${baseUrl}/metodologia`, metodologiaData);
};