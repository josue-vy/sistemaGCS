import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Clipboard, Layers, User,Menu, Briefcase, FileText, Calendar, BarChart2 } from 'react-feather'; // Importa los iconos

const Sidebar: React.FC = () => {
  const [solicitudOpen, setSolicitudOpen] = useState(false);
  const [usuariosOpen, setUsuariosOpen] = useState(false);
  const [proyectosOpen, setProyectosOpen] = useState(false);
  const [metodologiaOpen, setMetodologiaOpen] = useState(false);
  const [miembroProyectoOpen, setMiembroProyectoOpen] = useState(false);

  const toggleSolicitud = () => {
    setSolicitudOpen(!solicitudOpen);
  };

  const toggleUsuarios = () => {
    setUsuariosOpen(!usuariosOpen);
  };

  const toggleProyectos = () => {
    setProyectosOpen(!proyectosOpen);
  };

  const toggleMetodologia = () => {
    setMetodologiaOpen(!metodologiaOpen);
  };
  const toggleMiembroProyecto = () => {
    setMiembroProyectoOpen(!miembroProyectoOpen);
  };

  return (
    <div className="bg-gray-800 text-white w-1/5 h-screen fixed top-0 left-0 p-4 z-10">
      <div className="text-2xl font-bold mb-4">GCS</div>
      <div className="mb-4">
        <Link to="/dashboard" className="block text-white hover:text-blue-500 mb-2">
          <Menu className="w-5 h-5 inline" /> Dashboard
        </Link>
        <div className="cursor-pointer" onClick={toggleSolicitud}>
          <FileText className="w-5 h-5 inline" /> Solicitud Cambio
          <ChevronDown className="w-4 h-4 inline ml-1" />
        </div>
        {solicitudOpen && (
          <div className="pl-4">
            <Link to="/solicitud/registrar" className="block text-white hover:text-blue-500 mb-2">
              <Clipboard className="w-4 h-4 inline mr-1" /> Agregar Solicitud
            </Link>
            <Link to="/solicitud/listar" className="block text-white hover:text-blue-500 mb-2">
              <Layers className="w-4 h-4 inline mr-1" /> Listar Solicitud
            </Link>
          </div>
        )}
      </div>
      <div className="mb-4">
        <div className="cursor-pointer" onClick={toggleUsuarios}>
          <User className="w-5 h-5 inline" /> Usuarios
          <ChevronDown className="w-4 h-4 inline ml-1" />
        </div>
        {usuariosOpen && (
          <div className="pl-4">
            <Link to="/usuarios/registrar" className="block text-white hover:text-blue-500 mb-2">
              <User className="w-4 h-4 inline mr-1" /> Registrar Usuario
            </Link>
            <Link to="/usuarios/listar" className="block text-white hover:text-blue-500 mb-2">
              <Briefcase className="w-4 h-4 inline mr-1" /> Listar Usuario
            </Link>
            <Link to="/tipousuarios/registrar" className="block text-white hover:text-blue-500 mb-2">
              <User className="w-4 h-4 inline mr-1" /> Registrar Tipo Usuario
            </Link>
            <Link to="/tipousuarios/listar" className="block text-white hover:text-blue-500 mb-2">
              <Briefcase className="w-4 h-4 inline mr-1" /> Listar Tipo Usuario
            </Link>
          </div>
        )}
      </div>
      <div className="mb-4">
        <div className="cursor-pointer" onClick={toggleProyectos}>
          <Briefcase className="w-5 h-5 inline" /> Proyectos
          <ChevronDown className="w-4 h-4 inline ml-1" />
        </div>
        {proyectosOpen && (
          <div className="pl-4">
            <Link to="/proyecto/registrar" className="block text-white hover:text-blue-500 mb-2">
              <FileText className="w-4 h-4 inline mr-1" /> Registrar Proyecto
            </Link>
            <Link to="/proyecto/listar" className="block text-white hover:text-blue-500 mb-2">
              <Clipboard className="w-4 h-4 inline mr-1" /> Listar Proyecto
            </Link>
          </div>
        )}
      </div>
      <div className="mb-4">
        <div className="cursor-pointer" onClick={toggleMetodologia}>
          <Layers className="w-5 h-5 inline" /> Metodologia
          <ChevronDown className="w-4 h-4 inline ml-1" />
        </div>
        {metodologiaOpen && (
          <div className="pl-4">
            <Link to="/metodologia/registrar" className="block text-white hover:text-blue-500 mb-2">
              <FileText className="w-4 h-4 inline mr-1" /> Registrar Metodologia
            </Link>
            <Link to="/metodologia/listar" className="block text-white hover:text-blue-500 mb-2">
              <Layers className="w-4 h-4 inline mr-1" /> Listar Metodologia
            </Link>
            <Link to="/metodologia/registrar-fases" className="block text-white hover:text-blue-500 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" /> Registrar Fases
            </Link>
            <Link to="/metodologia/listar-fases" className="block text-white hover:text-blue-500 mb-2">
              <BarChart2 className="w-4 h-4 inline mr-1" /> Listar Fases
            </Link>
          </div>
        )}
      </div>
      <div className="mb-4">
        <div className="cursor-pointer" onClick={toggleMiembroProyecto}>
          <Layers className="w-5 h-5 inline" /> Designar Proyecto
          <ChevronDown className="w-4 h-4 inline ml-1" />
        </div>
        {miembroProyectoOpen && (
          <div className="pl-4">
            <Link to="/miembroProyecto/registrar" className="block text-white hover:text-blue-500 mb-2">
              <FileText className="w-4 h-4 inline mr-1" /> Designar Proyecto a Usuario
            </Link>
            <Link to="/miembroProyecto/listar" className="block text-white hover:text-blue-500 mb-2">
              <Layers className="w-4 h-4 inline mr-1" /> Listar Proyectos
            </Link>
            {/* <Link to="/metodologia/registrar-fases" className="block text-white hover:text-blue-500 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" /> Registrar Fases
            </Link>
            <Link to="/metodologia/listar-fases" className="block text-white hover:text-blue-500 mb-2">
              <BarChart2 className="w-4 h-4 inline mr-1" /> Listar Fases
            </Link> */}
          </div>  
        )}
      </div>
    </div>
  );
};

export default Sidebar;
