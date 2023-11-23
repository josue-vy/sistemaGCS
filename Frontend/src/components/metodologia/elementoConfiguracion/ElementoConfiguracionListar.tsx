import React, { useEffect, useState } from 'react';
import { ElementoConfiList } from '../../../types/elementoConfiguracionService';
import { getElementoConfi } from '../../../api/elementosConfiguracion/elementoConfiguracion.api';

const ElementoConfiguracionListar: React.FC = () => {
    const [elementos, setElementos] = useState<ElementoConfiList[]>([]);

    useEffect(() => {
        const fetchElementos = async () => {
            try {
                const response = await getElementoConfi();
                setElementos(response.data);
            } catch (error) {
                console.error("Error al listar elementos:", error);
            }
        };

        fetchElementos();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl p-6">
                <h2 className="text-3xl font-bold mb-6 text-center">Listado de Elementos</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 border-b border-gray-300">Id</th>
                                <th className="py-3 px-4 border-b border-gray-300">Nomenclatura</th>
                                <th className="py-3 px-4 border-b border-gray-300">Nombre</th>
                                <th className="py-3 px-4 border-b border-gray-300">Fase</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elementos.map((elemento) => (
                                <tr key={elemento.id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 border-b border-gray-300">{elemento.id}</td>
                                    <td className="py-4 px-6 border-b border-gray-300">{elemento.nomenclaturaElemento}</td>
                                    <td className="py-4 px-6 border-b border-gray-300">{elemento.nombreElemento}</td>
                                    <td className="py-4 px-6 border-b border-gray-300">{elemento.fase ? elemento.fase.nombreFase : "Sin tipo"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ElementoConfiguracionListar;
