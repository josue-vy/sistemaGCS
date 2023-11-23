import React, { useState } from 'react';
import { postTipoUsuarios } from '../../api/tipousuario/tipousuario.api';
import { TipoUserRegister } from '../../types/tipoUsuariosService';
import AlertMessage from '../../pages/AlertMessage';

const TipoUsuarioRegistrar: React.FC = () => {
  const [nombreTipoUsuario, setNombreTipoUsuario] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const handleTipoUsuarioRegistration = async () => {
    try {
      // Enviar el nuevo tipo de usuario al servidor
      const newTipoUser: TipoUserRegister = {
        nombreTipoUsuario,
      };

      const response = await postTipoUsuarios(newTipoUser);

      // Limpiar el campo de entrada después del registro
      setNombreTipoUsuario('');

      console.log('Tipo de usuario registrado:', response.data);
      setRegistrationSuccess(true);
      setRegistrationError(null);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error al registrar tipo de usuario:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Registrar Tipo de Usuario</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Nombre del Tipo de Usuario:</label>
        <input
          type="text"
          value={nombreTipoUsuario}
          onChange={(e) => setNombreTipoUsuario(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>
      <button
        onClick={handleTipoUsuarioRegistration}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Registrar
      </button>
      {registrationSuccess && (
            <AlertMessage
              type="success"
              message="Usuario registrado. La página se actualizará en breve."
            />
          )}

          {registrationError && (
            <AlertMessage
              type="error"
              message="Error en el registro. Inténtalo de nuevo."
            />
          )}
    </div>
    
  );
};

export default TipoUsuarioRegistrar;
