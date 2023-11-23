import { useEffect, useState } from "react";
import { UserList } from "../../types/usuarioService";
import { getUsers } from "../../api/usuario/auth.api";

const UsuariosListar: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UserList[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await getUsers();
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al listar usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Listado de Usuarios</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 border border-gray-300">Nombre</th>
                <th className="py-3 px-4 border border-gray-300">Apellido</th>
                <th className="py-3 px-4 border border-gray-300">Correo</th>
                <th className="py-3 px-4 border border-gray-300">Tipo de Usuario</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border border-gray-300">{usuario.nombre}</td>
                  <td className="py-2 px-4 border border-gray-300">{usuario.apellido}</td>
                  <td className="py-2 px-4 border border-gray-300">{usuario.correo}</td>
                  <td className="py-2 px-4 border border-gray-300">
                    {usuario.tipoUsuario ? usuario.tipoUsuario.nombreTipoUsuario : "Sin tipo"}
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

export default UsuariosListar;
