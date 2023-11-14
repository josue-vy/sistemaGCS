import React, { useEffect, useState } from 'react';
import { ProyectoList } from '../../types/proyectoService';
import { getProyecto } from '../../api/proyecto/proyecto.api';

const ProyectoListar: React.FC = () => {
    const [proyectos, setProyectos] = useState<ProyectoList[]>([]); // Especifica que users es un array de tipo User

    useEffect(() => {
      const fetchProyectos = async () => {
        try {
          const response = await getProyecto();
          setProyectos(response.data);
        } catch (error) {
          console.error("Error al listar usuarios:", error);
        }
      };
  
      fetchProyectos();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Listado de Proyectos</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Id</th>
                    <th className="border border-gray-300 p-2">Proyecto</th>
                    <th className="border border-gray-300 p-2">Fecha Inicio</th>
                    <th className="border border-gray-300 p-2">Fecha Final</th>
                    <th className="border border-gray-300 p-2">Estado</th>
                    <th className="border border-gray-300 p-2">Metodologia</th>
                  </tr>
                </thead>
                <tbody>
                  {proyectos.map((proyecto) => (
                    <tr key={proyecto.id}>
                      <td className="border border-gray-300 p-2">{proyecto.id}</td>
                      <td className="border border-gray-300 p-2">{proyecto.nombreProyecto}</td>
                      <td className="border border-gray-300 p-2">{proyecto.fechaInicio}</td>
                      <td className="border border-gray-300 p-2">{proyecto.fechaFinal}</td>
                      <td className="border border-gray-300 p-2">{proyecto.estado}</td>
                      <td className="border border-gray-300 p-2">{proyecto.metodologia ? proyecto.metodologia.nombreMetodologia : "Sin tipo"}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };

export default ProyectoListar;
