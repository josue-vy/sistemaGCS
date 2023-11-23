import React, { useEffect, useState } from "react";
import { MiembroElementoRegister } from "../../../types/miembroElementoService";
import { useNavigate } from "react-router";
import { getElementoConfi } from "../../../api/elementosConfiguracion/elementoConfiguracion.api";
import { getUsers } from "../../../api/auth.api";
import { postMiembroElemento } from "../../../api/miembroElemento/miembroElemento.api";

const RegistrarMiembroElemento: React.FC = () => {
  const [selectedUsuario, setSelectedUsuario] = useState<{
    usuario: string;
    nombre: string;
  }>({
    usuario: "",
    nombre: "",
  });
  const [selectedElementoConfi, setSelectedElementoConfi] = useState<{
    elementoConfiguracion: string;
    nomenclaturaElemento: string;
  }>({
    elementoConfiguracion: "",
    nomenclaturaElemento: "",
  });
  const [url, setUrl] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFinal, setFechaFinal] = useState<string>("");

  const [usuarios, setUsuarios] = useState<MiembroElementoRegister[]>([]);
  const [elementos, setElementos] = useState<MiembroElementoRegister[]>([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usuariosResponse, elementosResponse] =
          await Promise.all([
            getUsers(),
            getElementoConfi(),
            // Fetch de otras llamadas a APIs si es necesario
          ]);

        const usuariosData = usuariosResponse.data.map(
          (usuario: MiembroElementoRegister) => ({
            id: usuario.id,
            usuario: usuario.usuarios,
            nombre: usuario.nombre,
          })
        );

        const elementosData = elementosResponse.data.map(
          (elemento: MiembroElementoRegister) => ({
            id: elemento.id,
            elementoConfiguracion: elemento.elementoConfiguracion,
            nomenclaturaElemento: elemento.nomenclaturaElemento,
          })
        );

        setUsuarios(usuariosData);
        setElementos(elementosData);

        // Establecer valores seleccionados basados en datos de miembrosElemento si es necesario
        // ...
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
        elementoConfiguracion: selectedElementoConfi.elementoConfiguracion,
        nomenclaturaElemento: selectedElementoConfi.nomenclaturaElemento,
        url,
        fechaInicio,
        fechaFinal,
      };

      const response = await postMiembroElemento(newMiembroElemento);

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
            value={selectedElementoConfi.elementoConfiguracion || ""}
            onChange={(e) =>
              setSelectedElementoConfi({
                ...selectedElementoConfi,
                elementoConfiguracion: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
          >
            <option key="default" value="">
              Seleccionar Elemento
            </option>
            {elementos.map((rol, index) => (
              <option key={index} value={rol.elementoConfiguracion}>
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
            type="datetime-local"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
          />
          <input
            type="datetime-local"
            value={fechaFinal}
            onChange={(e) => setFechaFinal(e.target.value)}
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

export default RegistrarMiembroElemento;
