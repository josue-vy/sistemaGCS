import { useEffect, useState } from "react";
import { MetodologiaList } from "../../types/metodologiaService";
import { getMetodologia } from "../../api/metodologia/metodologia.api";

const MetodologiaListar: React.FC = () => {
  const [metodologias, setMetodologia] = useState<MetodologiaList[]>([]);

  useEffect(() => {
    const fetchMetodologia = async () => {
      try {
        const response = await getMetodologia();
        setMetodologia(response.data);
      } catch (error) {
        console.error("Error al listar metodologías:", error);
      }
    };

    fetchMetodologia();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Listado de Metodologías</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">Id</th>
                <th className="py-3 px-4 border-b border-gray-300">Metodología</th>
              </tr>
            </thead>
            <tbody>
              {metodologias.map((metodologia) => (
                <tr key={metodologia.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 border-b border-gray-300">{metodologia.id}</td>
                  <td className="py-4 px-6 border-b border-gray-300">{metodologia.nombreMetodologia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MetodologiaListar;
