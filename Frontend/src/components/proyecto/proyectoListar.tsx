import React, { useEffect, useState } from 'react';
import { ProyectoList } from '../../types/proyectoService';
import { getProyecto } from '../../api/proyecto/proyecto.api';

const ProyectoListar: React.FC = () => {
    const [proyectos, setProyectos] = useState<ProyectoList[]>([]);

    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                const response = await getProyecto();
                setProyectos(response.data);
            } catch (error) {
                console.error("Error al listar proyectos:", error);
            }
        };

        fetchProyectos();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl p-6">
                <h2 className="text-3xl font-bold mb-6 text-center">Listado de Proyectos</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 border-b border-gray-300">Id</th>
                                <th className="py-3 px-4 border-b border-gray-300">Proyecto</th>
                                <th className="py-3 px-4 border-b border-gray-300">Fecha Inicio</th>
                                <th className="py-3 px-4 border-b border-gray-300">Fecha Final</th>
                                <th className="py-3 px-4 border-b border-gray-300">Estado</th>
                                <th className="py-3 px-4 border-b border-gray-300">Metodologia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proyectos.map((proyecto) => (
                                <tr key={proyecto.id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 border-b border-gray-300">{proyecto.id}</td>
                                    <td className="py-4 px-6 border-b border-gray-300">{proyecto.nombreProyecto}</td>
                                    <td className="py-4 px-6 border-b border-gray-300">{proyecto.fechaInicio}</td>
                                    <td className="py-4 px-6 border-b border-gray-300">{proyecto.fechaFinal}</td>
                                    <td className="py-4 px-6 border-b border-gray-300">{proyecto.estado}</td>
                                    <td className="py-4 px-6 border-b border-gray-300">{proyecto.metodologia ? proyecto.metodologia.nombreMetodologia : "Sin tipo"}</td>
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
