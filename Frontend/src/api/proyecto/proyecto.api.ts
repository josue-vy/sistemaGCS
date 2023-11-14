import axios from 'axios';
import { ProyectoCreate } from '../../types/proyectoService';

const baseUrl = 'http://localhost:3000';

export const getProyecto = () => {
    return axios.get(`${baseUrl}/proyecto`);
};

export const postProyecto = async (proyectoData: ProyectoCreate) => {
  return axios.post(`${baseUrl}/proyecto`, proyectoData);
};