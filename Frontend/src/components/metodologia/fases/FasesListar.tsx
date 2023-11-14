import React, { useEffect, useState } from 'react';
import { getFase } from '../../../api/fase/fase.api';
import { FaseList } from '../../../types/faseService';

const FaseListar: React.FC = () => {
    const [fases, setFases] = useState<FaseList[]>([]); // Especifica que users es un array de tipo User

    useEffect(() => {
      const fetchFases = async () => {
        try {
          const response = await getFase();
          setFases(response.data);
        } catch (error) {
          console.error("Error al listar usuarios:", error);
        }
      };
  
      fetchFases();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Listado de Fases</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Id</th>
                    <th className="border border-gray-300 p-2">Fase</th>
                    <th className="border border-gray-300 p-2">Metodologia</th>
                  </tr>
                </thead>
                <tbody>
                  {fases.map((fase) => (
                    <tr key={fase.id}>
                      <td className="border border-gray-300 p-2">{fase.id}</td>
                      <td className="border border-gray-300 p-2">{fase.nombreFase}</td>
                      <td className="border border-gray-300 p-2">{fase.metodologia ? fase.metodologia.nombreMetodologia : "Sin tipo"}</td>

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
