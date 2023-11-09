import React, { useState } from 'react';
import { registerProyecto } from '../../api/proyecto/proyecto.api';

const RegistrarProyecto: React.FC = () => {
  const [codigoProyecto, setCodPro] = useState('');
  const [nombreProyecto, setNamePro] = useState('');
  const [fechaInicio, setInicio] = useState('');
  const [fechaFinal, setFinal] = useState('');
  const [estado, setEstado] = useState('');
 
  const handleRegistration = async () => {
    try {
      const response = await registerProyecto({ codigoProyecto, nombreProyecto, fechaInicio, fechaFinal, estado});
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
        <div className="text-3xl font-bold mb-4 text-center">Registrar Proyecto</div>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="codigo del Proyecto"
              value={codigoProyecto}
              onChange={(e) => setCodPro(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="nombre del proyecto"
              value={nombreProyecto}
              onChange={(e) => setNamePro(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setInicio(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="date"
              value={fechaFinal}
              onChange={(e) => setFinal(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="nombre del proyecto"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleRegistration}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarProyecto;
