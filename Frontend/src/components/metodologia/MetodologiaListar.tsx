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
        console.error("Error al listar usuarios:", error);
      }
    };

    fetchMetodologia();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Listado de Metodologias</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Id</th>
                <th className="border border-gray-300 p-2">Metodologia</th>
              </tr>
            </thead>
            <tbody>
              {metodologias.map((metodologia) => (
                <tr key={metodologia.id}>
                  <td className="border border-gray-300 p-2">{metodologia.id}</td>
                  <td className="border border-gray-300 p-2">
                    {metodologia.nombreMetodologia}
                  </td>
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
