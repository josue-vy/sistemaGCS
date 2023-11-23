import React, { useEffect, useState } from 'react';
import { ElementoConfiList } from '../../../types/elementoConfiguracionService';
import { getElementoConfi } from '../../../api/elementosConfiguracion/elementoConfiguracion.api';


const ElementoConfiguracionListar: React.FC = () => {
    const [fases, setFases] = useState<ElementoConfiList[]>([]); // Especifica que users es un array de tipo User

    useEffect(() => {
      const fetchFases = async () => {
        try {
          const response = await getElementoConfi();
          setFases(response.data);
        } catch (error) {
          console.error("Error al listar elementos:", error);
        }
      };
  
      fetchFases();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Listado de Elementos</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Id</th>
                    <th className="border border-gray-300 p-2">Nomenclatura</th>
                    <th className="border border-gray-300 p-2">Nombre</th>
                    <th className="border border-gray-300 p-2">Fase</th>
                  </tr>
                </thead>
                <tbody>
                  {fases.map((fase) => (
                    <tr key={fase.id}>
                      <td className="border border-gray-300 p-2">{fase.id}</td>
                      <td className="border border-gray-300 p-2">{fase.nomenclaturaElemento}</td>
                      <td className="border border-gray-300 p-2">{fase.nombreElemento}</td>
                      <td className="border border-gray-300 p-2">{fase.fase ? fase.fase.nombreFase : "Sin tipo"}</td>

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
