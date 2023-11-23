  import axios from 'axios';
import { UserRegister } from '../../types/usuarioService';

  // URL base de tu servidor API
  const baseUrl = 'http://localhost:3000'; // Asegúrate de que esta URL sea la correcta para tu servidor

  // Función para listar usuarios
  export const getUsers = () => {
      return axios.get(`${baseUrl}/usuarios`);
  };

  // Función para iniciar sesión
  export const loginUser = async (correo: string, contrasena: string) => {
    console.log("Datos enviados:", correo, contrasena);
    return axios.post(`${baseUrl}/usuarios/login`, {
        correo,
        contrasena,
      });
  }
  export const registerUser = async (userData: UserRegister) => {
    return axios.post(`${baseUrl}/usuarios`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };