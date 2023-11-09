import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const listProyecto = () => {
    return axios.get(`${baseUrl}/proyecto`);
};

export const registerProyecto = async (userData: { codigoProyecto: string; nombreProyecto: string; fechaInicio: string ; fechaFinal: string ; estado: string}) => {
  return axios.post(`${baseUrl}/usuarios`, userData);
};