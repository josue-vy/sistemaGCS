import { useEffect, useState } from "react";
import { RolProyectoList } from "../../../types/rolProyectoService";
import { getProyectoRol } from "../../../api/rolProyecto/rolProyecto.api";

const RolProyectoListar: React.FC = () => {
  const [rolProyectos, setRolProyecto] = useState<RolProyectoList[]>([]);

  useEffect(() => {
    const fetchMetodologia = async () => {
      try {
        const response = await getProyectoRol();
        setRolProyecto(response.data);
      } catch (error) {
        console.error("Error al listar roles:", error);
      }
    };

    fetchMetodologia();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Listado de Rol Proyecto</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">Id</th>
                <th className="py-3 px-4 border-b border-gray-300">Rol Proyecto</th>
              </tr>
            </thead>
            <tbody>
              {rolProyectos.map((metodologia) => (
                <tr key={metodologia.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 border-b border-gray-300">{metodologia.id}</td>
                  <td className="py-4 px-6 border-b border-gray-300">{metodologia.nombreRolProyecto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RolProyectoListar;
