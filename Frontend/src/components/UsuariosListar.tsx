import { useEffect, useState } from "react";
import { UserList } from "../types/usuarioService";
import { getUsers } from "../api/auth.api";

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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Listado de Usuarios</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Nombre</th>
                <th className="border border-gray-300 p-2">Apellido</th>
                <th className="border border-gray-300 p-2">Correo</th>
                <th className="border border-gray-300 p-2">Tipo de Usuario</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="border border-gray-300 p-2">{usuario.nombre}</td>
                  <td className="border border-gray-300 p-2">{usuario.apellido}</td>
                  <td className="border border-gray-300 p-2">{usuario.correo}</td>
                  <td className="border border-gray-300 p-2">
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
