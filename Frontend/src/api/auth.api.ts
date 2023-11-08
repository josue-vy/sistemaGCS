import axios from 'axios';

// URL base de tu servidor API
const baseUrl = 'http://localhost:3000'; // Asegúrate de que esta URL sea la correcta para tu servidor

// Función para listar usuarios
export const listUsers = () => {
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

// Función para registrar un nuevo usuario
export const registerUser = async (userData: { nombre: string; apellido: string; correo: string ; contrasena: string}) => {
  return axios.post(`${baseUrl}/usuarios`, userData);
};