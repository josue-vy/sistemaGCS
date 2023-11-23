import { useEffect, useState } from "react";
import { MiembroProList } from "../../types/miembroProyectoService";
import { getMiembroPro } from "../../api/miembroProyecto/miembroProyecto.api";

const MiembroProyectoListar: React.FC = () => {
  const [usuarios, setUsuarios] = useState<MiembroProList[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await getMiembroPro();
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al listar miembro:", error);
      }
    };

    fetchUsuarios();
  }, []);

  // Agrupar usuarios por proyecto
  const proyectosUsuariosMap = usuarios.reduce((map, usuario) => {
    const projectName = usuario.proyecto ? usuario.proyecto.nombreProyecto : "Sin tipo";

    if (!map.has(projectName)) {
      map.set(projectName, []);
    }

    map.get(projectName)?.push(usuario);
    return map;
  }, new Map<string, MiembroProList[]>());

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Listado de Proyectos</h2>
        {[...proyectosUsuariosMap.keys()].map((projectName) => (
          <div key={projectName} className="mb-8">
            <div className="bg-gray-200 rounded-t-lg p-4">
              <h3 className="text-xl font-semibold">{projectName}</h3>
            </div>
            <div className="bg-white shadow-md rounded-b-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Proyecto
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {proyectosUsuariosMap.get(projectName)?.map((usuario) => (
                    <tr key={usuario.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6 whitespace-nowrap">{usuario.usuario ? usuario.usuario.nombre : "Sin tipo"}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{usuario.rol ? usuario.rol.nombreRolProyecto : "Sin tipo"}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{usuario.proyecto ? usuario.proyecto.nombreProyecto : "Sin tipo"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiembroProyectoListar;
