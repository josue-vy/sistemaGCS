import React, { useEffect, useState } from "react";
import { postProyecto } from "../../api/proyecto/proyecto.api";
import { useNavigate } from "react-router";
import { getMetodologia } from "../../api/metodologia/metodologia.api";
import { ProyectoCreate } from "../../types/proyectoService";
import AlertMessage from "../../pages/AlertMessage";

const RegistrarProyecto: React.FC = () => {
  const [nombreProyecto, setNamePro] = useState("");
  const [fechaInicio, setInicio] = useState(new Date());
  const [fechaFinal, setFinal] = useState(new Date());
  const [estado, setEstado] = useState("");
  const [selectedMetodologia, setSelectedMetodologia] = useState<{
    metodologia: string;
    nombreMetodologia: string;
  }>({
    metodologia: "",
    nombreMetodologia: "",
  });

  const [metodologias, setMetologia] = useState<ProyectoCreate[]>([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetodologia = async () => {
      try {
        const response = await getMetodologia();
        setMetologia(response.data);
      } catch (error) {
        console.error("Error al obtener Metodologia:", error);
      }
    };
    fetchMetodologia();
  }, []);

  const handleRegistration = async () => {
    try {
      const newProyecto: ProyectoCreate = {
        nombreProyecto,
        fechaInicio,
        fechaFinal,
        estado,
        metodologia: selectedMetodologia.metodologia,
        nombreMetodologia: selectedMetodologia.nombreMetodologia,
      };
      const response = await postProyecto(newProyecto);
      console.log("Registro exitoso:", response.data);

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
  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Manejar cambios en el estado del proyecto
    console.log("Nuevo estado seleccionado:", e.target.value);
    setEstado(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-3xl font-bold mb-4 text-center">
          Registrar Proyecto
        </div>
        <form className="space-y-4">
          <div>
            {/* Input para el nombre del proyecto */}
            <input
              type="text"
              placeholder="nombre del proyecto"
              value={nombreProyecto}
              onChange={(e) => setNamePro(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            {/* Input para la fecha de inicio */}
            <input
              type="date"
              value={fechaInicio.toISOString().split("T")[0]}
              onChange={(e) => setInicio(new Date(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            {/* Input para la fecha final */}
            <input
              type="date"
              value={fechaFinal.toISOString().split("T")[0]} 
              onChange={(e) => setFinal(new Date(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            {/* Select para el estado del proyecto */}
            <select
              value={estado}
              onChange={handleEstadoChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            >
              <option>Seleccione el estado</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <select
            value={selectedMetodologia.metodologia}
            onChange={(e) =>
              setSelectedMetodologia({
                ...selectedMetodologia,
                metodologia: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
          >
            <option key="default" value="">
              Seleccionar Metodologia
            </option>
            {/* Filtrar tipos de usuario existentes */}
            {metodologias
              .filter(
                (metodologia, index, self) =>
                  index ===
                  self.findIndex(
                    (t) => t.nombreMetodologia === metodologia.nombreMetodologia
                  )
              )
              .map((metodologia) => (
                <option key={metodologia.id} value={metodologia.metodologia}>
                  {metodologia.nombreMetodologia}
                </option>
              ))}
          </select>
          <div>
            {/* Botón para enviar el formulario */}
            <button
              type="button"
              onClick={handleRegistration}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Guardar
            </button>
          </div>
          {/* Mostrar mensaje de éxito después del registro */}
          {registrationSuccess && (
            <AlertMessage
              type="success"
              message="proyecto registrado. La página se actualizará en breve."
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
export default RegistrarProyecto;
