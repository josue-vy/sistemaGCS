import React, { useEffect, useState } from 'react';
import { ProyectoList } from '../../types/proyectoService';
import { getProyecto } from '../../api/proyecto/proyecto.api';

const ProyectoListar: React.FC = () => {
    const [proyectos, setUsers] = useState<ProyectoList[]>([]); // Especifica que users es un array de tipo User

    useEffect(() => {
        getProyecto()
            .then((response) => {
                setUsers(response.data as ProyectoList[]); // Convierte la respuesta en un array de tipo User
            })
            .catch((error) => {
                console.error('Error al listar usuarios:', error);
            });
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
                  </tr>
                </thead>
                <tbody>
                  {proyectos.map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="border border-gray-300 p-2">{usuario.id}</td>
                      <td className="border border-gray-300 p-2">{usuario.nombreProyecto}</td>
                      <td className="border border-gray-300 p-2">{usuario.fechaInicio}</td>
                      <td className="border border-gray-300 p-2">{usuario.fechaFinal}</td>
                      <td className="border border-gray-300 p-2">{usuario.estado}</td>

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
