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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Listado de Rol Proyecto</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Id</th>
                <th className="border border-gray-300 p-2">Metodologia</th>
              </tr>
            </thead>
            <tbody>
              {rolProyectos.map((metodologia) => (
                <tr key={metodologia.id}>
                  <td className="border border-gray-300 p-2">{metodologia.id}</td>
                  <td className="border border-gray-300 p-2">
                    {metodologia.nombreRolProyecto}
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

export default RolProyectoListar;
