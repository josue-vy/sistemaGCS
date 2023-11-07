import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h2>Página de Inicio</h2>
      <p>Bienvenido a nuestra aplicación. Inicia sesión o regístrate para acceder al panel de control.</p>
      <Link to="/login">Iniciar Sesión</Link> {/* Enlaza a la página de inicio de sesión */}
    </div>
  );
};

export default Home;