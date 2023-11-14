import axios from 'axios';
import { SolicitudCreate } from '../../types/solicitudCambioService';

const baseUrl = 'http://localhost:3000';

export const getSolicitudCambios = () => {
  return axios.get(`${baseUrl}/solicitudC`);
};

export const postSolicitudCambios = async (solicitudData: SolicitudCreate) => {
  return axios.post(`${baseUrl}/solicitudC`, solicitudData);
};

