import { useEffect, useState } from "react";
import { getTipoUsuarios } from "../../api/tipousuario/tipousuario.api";
import { TipoUserList } from "../../types/tipoUsuariosService";

const TipoUsuariosListar: React.FC = () => {
  const [tipoUsuario, setTipoUsuario] = useState<TipoUserList[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await getTipoUsuarios();
        setTipoUsuario(response.data);
      } catch (error) {
        console.error("Error al listar usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Listado de Tipos de Usuarios</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">Id</th>
                <th className="py-3 px-4 border-b border-gray-300">Tipo de Usuario</th>
              </tr>
            </thead>
            <tbody>
              {tipoUsuario.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 border-b border-gray-300">{usuario.id}</td>
                  <td className="py-4 px-6 border-b border-gray-300">{usuario.nombreTipoUsuario}</td>
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
