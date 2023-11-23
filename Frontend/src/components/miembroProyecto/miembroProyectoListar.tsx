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

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Listado de Usuarios</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Nombre</th>
                <th className="border border-gray-300 p-2">Rol</th>
                <th className="border border-gray-300 p-2">Proyecto</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="border border-gray-300 p-2">
                    {usuario.usuario ? usuario.usuario.nombre : "Sin tipo"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {usuario.rol ? usuario.rol.nombreRolProyecto : "Sin tipo"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {usuario.proyecto ? usuario.proyecto.nombreProyecto : "Sin tipo"}
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

export default MiembroProyectoListar;
