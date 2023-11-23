import axios from 'axios';
import { MiembroElementoRegister } from '../../types/miembroElementoService';

const baseUrl = 'http://localhost:3000';

export const getMiembroElemento = () => {
    return axios.get(`${baseUrl}/miembroelem`);
};

export const postMiembroElemento = async (miembroElementoData: MiembroElementoRegister) => {
  return axios.post(`${baseUrl}/miembroelem`, miembroElementoData);
};