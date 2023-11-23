import React, { useEffect, useState } from "react";
import { MiembroProRegister } from "../../types/miembroProyectoService";
import {
  postMiembroPro,
  getMiembroPro,
} from "../../api/miembroProyecto/miembroProyecto.api";
import { getUsers } from "../../api/usuario/auth.api";
import { getProyecto } from "../../api/proyecto/proyecto.api";
import { getProyectoRol } from "../../api/rolProyecto/rolProyecto.api";
import { useNavigate } from "react-router";
import AlertMessage from "../../pages/AlertMessage";

const RegistrarMiembroProyecto: React.FC = () => {
  const [selectedUsuario, setSelectedUsuario] = useState<{
    usuario: string;
    nombre: string;
  }>({
    usuario: "",
    nombre: "",
  });
  const [selectedRol, setSelectedRol] = useState<{
    rol: string;
    nombreRolProyecto: string;
  }>({
    rol: "",
    nombreRolProyecto: "",
  });
  const [selectedProyecto, setSelectedProyecto] = useState<{
    proyecto: string;
    nombreProyecto: string;
  }>({
    proyecto: "",
    nombreProyecto: "",
  });
  const [usuarios, setUsuarios] = useState<MiembroProRegister[]>([]);
  const [roles, setRoles] = useState<MiembroProRegister[]>([]);
  const [proyectos, setProyectos] = useState<MiembroProRegister[]>([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usuariosResponse,
          proyectosResponse,
          rolesResponse,
          miembrosProyectoResponse,
        ] = await Promise.all([
          getUsers(),
          getProyecto(),
          getProyectoRol(),
          getMiembroPro(),
        ]);

        const usuariosData = usuariosResponse.data.map(
          (usuario: MiembroProRegister) => ({
            id: usuario.id,
            usuario: usuario.usuarios,
            nombre: usuario.nombre,
          })
        );
        const proyectosData = proyectosResponse.data.map(
          (proyecto: MiembroProRegister) => ({
            id: proyecto.id,
            proyecto: proyecto.proyecto,
            nombreProyecto: proyecto.nombreProyecto, // Asigna el valor a la propiedad dentro del objeto proyecto
          })
        );
        const rolesData = rolesResponse.data.map((rol: MiembroProRegister) => ({
          id: rol.id,
          rol: rol.rol,
          nombreRolProyecto: rol.nombreRolProyecto,
        }));
        const miembrosProyectoData = miembrosProyectoResponse.data;

        setUsuarios(usuariosData);
        setProyectos(proyectosData);
        setRoles(rolesData);

        // Establecer valores seleccionados basados en datos de miembrosProyecto si es necesario
        if (miembrosProyectoData.length > 0) {
          const defaultMiembroProyecto = miembrosProyectoData[0]; // Podrías tomar el primer miembro como ejemplo
          setSelectedUsuario({
            usuario: defaultMiembroProyecto.usuario,
            nombre: defaultMiembroProyecto.nombre,
          });
          setSelectedRol({
            rol: defaultMiembroProyecto.rol,
            nombreRolProyecto: defaultMiembroProyecto.nombreRolProyecto,
          });
          setSelectedProyecto({
            proyecto: defaultMiembroProyecto.proyecto,
            nombreProyecto: defaultMiembroProyecto.nombreProyecto,
          });
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleRegistration = async () => {
    try {
      const newUser: MiembroProRegister = {
        usuarios: [selectedUsuario.usuario], // Cambia a 'usuario'
        nombre: selectedUsuario.nombre,
        rol: selectedRol.rol,
        nombreRolProyecto: selectedRol.nombreRolProyecto,
        proyecto: selectedProyecto.proyecto,
        nombreProyecto: selectedProyecto.nombreProyecto,
      };

      const response = await postMiembroPro(newUser);

      console.log("Registro exitoso:", response.data);

      setRegistrationSuccess(true);
      setRegistrationError(null);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error en el registro:", error);
      setRegistrationSuccess(false);
      setRegistrationError("Error en el registro. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-3xl font-bold mb-4 text-center">
          Registrar Miembro Proyecto
        </div>
        <form className="space-y-4">
          <select
            value={selectedUsuario.usuario || ""}
            onChange={(e) =>
              setSelectedUsuario({
                ...selectedUsuario,
                usuario: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
          >
            <option key="default" value="">
              Seleccionar Usuario
            </option>
            {usuarios.map((miembro, index) => (
              <option key={index} value={miembro.usuarios}>
                {miembro.nombre}
              </option>
            ))}
          </select>

          <select
            value={selectedRol.rol || ""}
            onChange={(e) =>
              setSelectedRol({
                ...selectedRol,
                rol: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
          >
            <option key="default" value="">
              Seleccionar Rol
            </option>
            {roles.map((rol, index) => (
              <option key={index} value={rol.rol}>
                {rol.nombreRolProyecto}
              </option>
            ))}
          </select>

          <select
            value={selectedProyecto.proyecto || ""}
            onChange={(e) =>
              setSelectedProyecto({
                ...selectedProyecto,
                proyecto: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
          >
            <option key="default" value="">
              Seleccionar Proyecto
            </option>
            {proyectos.map((proyecto, index) => (
              <option key={index} value={proyecto.proyecto}>
                {proyecto.nombreProyecto}
              </option>
            ))}
          </select>

          <div>
            <button
              type="button"
              onClick={handleRegistration}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Guardar
            </button>
          </div>
          {registrationSuccess && (
            <AlertMessage
              type="success"
              message="miembro proyecto registrado. La página se actualizará en breve."
            />
          )}

          {registrationError && (
            <AlertMessage
              type="error"
              message="Error en el registro. Inténtalo de nuevo."
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrarMiembroProyecto;
