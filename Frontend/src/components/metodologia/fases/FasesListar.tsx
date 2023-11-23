import React, { useEffect, useState } from 'react';
import { getFase } from '../../../api/fase/fase.api';
import { FaseList } from '../../../types/faseService';

const FaseListar: React.FC = () => {
    const [fases, setFases] = useState<FaseList[]>([]);

    useEffect(() => {
        const fetchFases = async () => {
            try {
                const response = await getFase();
                setFases(response.data);
            } catch (error) {
                console.error("Error al listar fases:", error);
            }
        };

        fetchFases();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl p-6">
                <h2 className="text-3xl font-bold mb-6 text-center">Listado de Fases</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 border-b border-gray-300">Id</th>
                                <th className="py-3 px-4 border-b border-gray-300">Fase</th>
                                <th className="py-3 px-4 border-b border-gray-300">Metodología</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fases.map((fase) => (
                                <tr key={fase.id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 border-b border-gray-300">{fase.id}</td>
                                    <td className="py-4 px-6 border-b border-gray-300">{fase.nombreFase}</td>
                                    <td className="py-4 px-6 border-b border-gray-300">{fase.metodologia ? fase.metodologia.nombreMetodologia : "Sin tipo"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FaseListar;
