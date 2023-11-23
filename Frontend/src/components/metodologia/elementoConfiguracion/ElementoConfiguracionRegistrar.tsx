import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ElementoConfiCreate } from "../../../types/elementoConfiguracionService";
import { getFase } from "../../../api/fase/fase.api";
import { postElementoConfi } from "../../../api/elementosConfiguracion/elementoConfiguracion.api";


const RegistrarElementoConfiguracion: React.FC = () => {
  const [nomenclaturaElemento, setNameNomenclaturaElemento] = useState("");
  const [nombreElemento, setNameNombreElemento] = useState("");
  const [selectedFase, setSelectedFase] = useState<{
    fase: string;
    nombreFase: string;
  }>({
    fase: "",
    nombreFase: "",
  });

  const [fases, setMetologia] = useState<ElementoConfiCreate[]>([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFase = async () => {
      try {
        const response = await getFase();
        setMetologia(response.data);
      } catch (error) {
        console.error("Error al obtener Fase:", error);
      }
    };
    fetchFase();
  }, []);

  const handleRegistration = async () => {
    try {
      const newFase: ElementoConfiCreate = {
        nomenclaturaElemento,
        nombreElemento,
        fase: selectedFase.fase,
        nombreFase: selectedFase.nombreFase,
      };

      const response = await postElementoConfi(newFase);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-3xl font-bold mb-4 text-center">Registrar Elemento de Configuracion</div>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="nomenclatura de elemento"
              value={nomenclaturaElemento}
              onChange={(e) => setNameNomenclaturaElemento(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="nombre de elemento"
              value={nombreElemento}
              onChange={(e) => setNameNombreElemento(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <select
            value={selectedFase.fase}
            onChange={(e) =>
              setSelectedFase({
                ...selectedFase,
                fase: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
          >
            <option key="default" value="">
              Seleccionar Fase
            </option>
            {/* Filtrar tipos de usuario existentes */}
            {fases
              .filter(
                (metodologia, index, self) =>
                  index ===
                  self.findIndex(
                    (t) => t.nombreFase === metodologia.nombreFase
                  )
              )
              .map((metodologia) => (
                <option key={metodologia.id} value={metodologia.fase}>
                  {metodologia.nombreFase}
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
        </form>
        {/* Mostrar mensaje de éxito después del registro */}
        {registrationSuccess && (
          <div className="text-green-500 text-center">
            Usuario registrado. La página se actualizará en breve.
          </div>
        )}
        {/* Mostrar mensaje de error después del registro */}
        {registrationError && (
          <div className="text-red-500 text-center">
            Error en el registro. Inténtalo de nuevo.
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrarElementoConfiguracion;
