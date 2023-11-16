import React, { useEffect, useState } from "react";
import { MiembroProRegister } from "../../types/miembroProyectoService";
import { postMiembroPro } from "../../api/miembroProyecto/miembroProyecto.api";
import { getUsers } from "../../api/auth.api";
import { getProyecto } from "../../api/proyecto/proyecto.api";
import { getProyectoRol } from "../../api/rolesProyecto/rolesProyecto.api";
import { useNavigate } from "react-router";

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
        // Realizar las solicitudes en paralelo
        const [usuariosResponse, proyectosResponse, rolesResponse] =
          await Promise.all([getUsers(), getProyecto(), getProyectoRol()]);

        // Extraer los datos relevantes de cada respuesta
        const usuariosData = usuariosResponse.data.map(
          (usuario: MiembroProRegister) => usuario.nombre
        );
        const proyectosData = proyectosResponse.data.map(
          (proyecto: MiembroProRegister) => proyecto.nombreProyecto
        );
        const rolesData = rolesResponse.data.map(
          (rol: MiembroProRegister) => rol.nombreRolProyecto
        );

        console.log("Usuarios:", usuariosData);
        console.log("Proyectos:", proyectosData);
        console.log("Roles:", rolesData);

        // Establecer los estados con los datos obtenidos
        setUsuarios(usuariosData);
        setProyectos(proyectosData);
        setRoles(rolesData);
      } catch (error) {
        // Manejar errores en caso de que alguna de las solicitudes falle
        console.error("Error al obtener datos:", error);
      }
    };

    // Llamar a la función fetchData al montar el componente
    fetchData();
  }, []);

  const handleRegistration = async () => {
    try {
      const newUser: MiembroProRegister = {
        usuario: selectedUsuario.usuario,
        nombre: selectedUsuario.nombre,
        rol: selectedRol.rol,
        nombreRolProyecto: selectedRol.nombreRolProyecto,
        proyecto: selectedProyecto.proyecto,
        nombreProyecto: selectedProyecto.nombreProyecto,
      };

      const response = await postMiembroPro(newUser);

      console.log("Registro exitoso:", response.data);

      // Actualizar el estado para mostrar el mensaje
      setRegistrationSuccess(true);
      setRegistrationError(null);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      // Manejar errores
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
  value={selectedUsuario.usuario}
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
  {usuarios.map((usuario, index) => (
    <option key={index} value={usuario.usuario}>
      {usuario.nombre}
    </option>
  ))}
</select>

          <select
            value={selectedRol.rol}
            onChange={(e) => {
              const selectedName =
                e.target.options[e.target.selectedIndex].text;
              setSelectedRol({
                rol: e.target.value,
                nombreRolProyecto: selectedName,
              });
            }}
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
            value={selectedProyecto.proyecto}
            onChange={(e) => {
              const selectedName =
                e.target.options[e.target.selectedIndex].text;
              setSelectedProyecto({
                proyecto: e.target.value,
                nombreProyecto: selectedName,
              });
            }}
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
            <div className="text-green-500 text-center">
              Usuario registrado. La página se actualizará en breve.
            </div>
          )}
          {registrationError && (
            <div className="text-red-500 text-center">
              Error en el registro. Inténtalo de nuevo.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrarMiembroProyecto;
