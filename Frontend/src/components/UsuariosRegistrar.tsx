import React, { useState } from 'react';
import { registerUser } from '../api/auth.api';

const Registration: React.FC = () => {
  const [nombre, setUsername] = useState('');
  const [apellido, setLastname] = useState('');
  const [correo, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
 
  const handleRegistration = async () => {
    try {
      const response = await registerUser({ nombre, apellido, correo, contrasena});
      // Manejar la respuesta exitosa, por ejemplo, almacenar el token JWT.
      console.log('Registro exitoso:', response);
    } catch (error) {
      // Manejar el error, mostrar un mensaje de error, etc.
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-3xl font-bold mb-4 text-center">Registrar Usuario</div>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={nombre}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="apellido"
              value={apellido}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="contraseña"
              value={contrasena}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleRegistration}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
