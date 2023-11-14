import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para cerrar sesión
    // ...

    // Redirige al usuario a la página de inicio
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-700 p-4 text-white z-10 flex justify-between items-center">
      {/* Contenido del encabezado */}
      <h1 className="text-xl">Header</h1>
      <div className="flex items-center">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          onClick={handleLogout}
        >
          Salir
        </button>
      </div>
    </div>
  );
};

export default Header;

