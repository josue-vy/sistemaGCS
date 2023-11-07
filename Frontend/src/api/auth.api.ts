import axios from 'axios';

// URL base de tu servidor API
const baseUrl = 'http://localhost:3000'; // Asegúrate de que esta URL sea la correcta para tu servidor

// Función para listar usuarios
export const listUsers = () => {
    return axios.get(`${baseUrl}/listar`);
};

// Función para iniciar sesión
export const loginUser = async (username: string, password: string) => {
  console.log("Datos enviados:", username, password);
  return axios.post(`${baseUrl}/login`, {
      username,
      password,
    });
}

// Función para registrar un nuevo usuario
export const registerUser = async (userData: { username: string; password: string; email: string }) => {
  return axios.post(`${baseUrl}/register`, userData);
};
