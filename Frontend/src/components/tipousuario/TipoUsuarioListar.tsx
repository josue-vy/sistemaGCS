import { useEffect, useState } from "react";
import { getTipoUsuarios } from "../../api/tipousuario/tipousuario.api";
import { TipoUserList } from "../../types/tipoUsuariosService";

const TipoUsuariosListar: React.FC = () => {
  const [tipoUsuario, setUsuarios] = useState<TipoUserList[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await getTipoUsuarios();
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al listar usuarios:", error);
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
                <th className="border border-gray-300 p-2">Id</th>
                <th className="border border-gray-300 p-2">Tipo de Usuario</th>
              </tr>
            </thead>
            <tbody>
              {tipoUsuario.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="border border-gray-300 p-2">{usuario.id}</td>
                  <td className="border border-gray-300 p-2">
                    {usuario.nombreTipoUsuario}
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

export default TipoUsuariosListar;
