import axios from 'axios';
import { RolProyectoRegister } from '../../types/rolProyectoService';

const baseUrl = 'http://localhost:3000';

export const getProyectoRol = () => {
    return axios.get(`${baseUrl}/proyectorol`);
};

export const postProyectoRol = async (proyectoRolData: RolProyectoRegister) => {
  return axios.post(`${baseUrl}/proyectorol`, proyectoRolData);
};