import axios from 'axios';
import { MiembroProRegister } from '../../types/miembroProyectoService';

const baseUrl = 'http://localhost:3000';

export const getMiembroPro = () => {
    return axios.get(`${baseUrl}/miembropro`);
};

export const postMiembroPro = async (miembroProData: MiembroProRegister) => {
  return axios.post(`${baseUrl}/miembropro`, miembroProData);
};