import React from 'react';
import Sidebar from '../components/shared/sidebar';

const SolicitudListar: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-96">
        <h2>Listado de Solicitudes</h2> 
        <ul>
          <li>Solicitud 1</li>  
          <li>Solicitud 2</li>
          <li>Solicitud 3</li>
        </ul>   
      </div>
    </div>
  );
};

export default SolicitudListar;
