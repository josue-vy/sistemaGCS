import axios from 'axios';
import { TipoUserRegister } from '../../types/tipoUsuariosService';

const baseUrl = 'http://localhost:3000';

export const getTipoUsuarios = () => {
    return axios.get(`${baseUrl}/tipousuarios`);
};

export const postTipoUsuarios = async (userData: TipoUserRegister) => {
  return axios.post(`${baseUrl}/tipousuarios`, userData);
};