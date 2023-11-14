import axios from 'axios';
import { FaseCreate } from '../../types/faseService';

const baseUrl = 'http://localhost:3000';

export const getFase = () => {
    return axios.get(`${baseUrl}/fase`);
};

export const postFase = async (faseData: FaseCreate) => {
  return axios.post(`${baseUrl}/fase`, faseData);
};