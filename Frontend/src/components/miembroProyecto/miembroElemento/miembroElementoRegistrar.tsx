import React, { useEffect, useState } from "react";
import { MiembroElementoRegister } from "../../../types/miembroElementoService";
import { useNavigate } from "react-router";
import { getElementoConfi } from "../../../api/elementosConfiguracion/elementoConfiguracion.api";
import { getUsers } from "../../../api/usuario/auth.api";
import { postMiembroElemento } from "../../../api/miembroElemento/miembroElemento.api";
import AlertMessage from "../../../pages/AlertMessage";
import { getMiembroPro } from "../../../api/miembroProyecto/miembroProyecto.api";
import { MiembroProList } from "../../../types/miembroProyectoService";
import { UserList } from "../../../types/usuarioService";
import { getProyecto } from "../../../api/proyecto/proyecto.api";
import { ProyectoList } from "../../../types/proyectoService";

const RegistrarMiembroElemento: React.FC = () => {
  const [selectedUsuario, setSelectedUsuario] = useState<{
    usuario: string;
    nombre: string;
  }>({
    usuario: "",
    nombre: "",
  });
  const [selectedElementoConfi, setSelectedElementoConfi] = useState<{
    elementosConfiguracion: string;
    nomenclaturaElemento: string;
  }>({
    elementosConfiguracion: "",
    nomenclaturaElemento: "",
  });
  const [url, setUrl] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFinal] = useState(new Date());

  const [usuarios, setUsuarios] = useState<MiembroElementoRegister[]>([]);
  const [elementos, setElementos] = useState<MiembroElementoRegister[]>([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [proyecto, setProyecto] = useState<ProyectoList | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usuariosResponse,
          elementosResponse,
          miembrosProyectoResponse,
          proyectoResponse,
        ] = await Promise.all([
          getUsers(),
          getElementoConfi(),
          getMiembroPro(),
          getProyecto(),
        ]);

        const usuariosProyecto: string[] = miembrosProyectoResponse.data.map(
          (miembroProyecto: MiembroProList) => miembroProyecto.usuario.nombre
        );

        const usuariosData = usuariosResponse.data
          .filter(
            (usuario: UserList) =>
              usuariosProyecto.indexOf(usuario.nombre) !== -1
          )
          .map((usuarioFiltrado: UserList) => ({
            id: usuarioFiltrado.id,
            nombre: usuarioFiltrado.nombre,
          }));

        const elementosData = elementosResponse.data.map(
          (elemento: MiembroElementoRegister) => ({
            id: elemento.id,
            elementoConfiguracion: elemento.elementosConfiguracion,
            nomenclaturaElemento: elemento.nomenclaturaElemento,
          })
        );

        setUsuarios(usuariosData);
        setElementos(elementosData);
        setProyecto(proyectoResponse.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleRegistration = async () => {
    try {

      const newMiembroElemento: MiembroElementoRegister = {
        usuarios: [selectedUsuario.usuario],
        nombre: selectedUsuario.nombre,
        elementosConfiguracion: [selectedElementoConfi.elementosConfiguracion],
        nomenclaturaElemento: selectedElementoConfi.nomenclaturaElemento,
        url,
        fechaInicio,
        fechaFin,
      };

      if (proyecto) {
        const fechaInicioProyecto = new Date(proyecto.fechaInicio);
        const fechaFinalProyecto = new Date(proyecto.fechaFinal);
        const fechaInicioElemento = new Date(fechaInicio);
        const fechaFinElemento = new Date(fechaFin);
        console.log("Fecha inicio proyecto:", fechaInicioProyecto);
        console.log("Fecha final proyecto:", fechaFinalProyecto);
        console.log("Fecha inicio elemento:", fechaInicioElemento);
        console.log("Fecha final elemento:", fechaFinElemento);

        if (
          fechaInicioElemento >= fechaInicioProyecto &&
          fechaFinElemento <= fechaFinalProyecto
        ) {
          alert(
            `Las fechas del elemento deben estar dentro del rango del proyecto: Fecha de inicio del proyecto: ${proyecto.fechaInicio}, Fecha final del proyecto: ${proyecto.fechaFinal}`
          );
          return;
        }
      }

      const response = await postMiembroElemento(newMiembroElemento);

      console.log("Registro exitoso:", response.data);

      setRegistrationSuccess(true);
      setRegistrationError(null);

      setTimeout(() => {
        window.location.reload();
      }, 9000);
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
          Registrar Miembro Elemento
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
            value={selectedElementoConfi.elementosConfiguracion || ""}
            onChange={(e) =>
              setSelectedElementoConfi({
                ...selectedElementoConfi,
                elementosConfiguracion: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
          >
            <option key="default" value="">
              Seleccionar Elemento
            </option>
            {elementos.map((rol, index) => (
              <option key={index} value={rol.elementosConfiguracion}>
                {rol.nomenclaturaElemento}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
          />
          <input
            type="date"
            value={fechaInicio.toISOString().split("T")[0]} 
            onChange={(e) => setFechaInicio(new Date(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
          />
          <input
            type="date"
            value={fechaFin.toISOString().split("T")[0]} 
            onChange={(e) => setFechaFinal(new Date(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
          />
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
              message="miembro elemento registrado. La página se actualizará en breve."
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

export default RegistrarMiembroElemento;
