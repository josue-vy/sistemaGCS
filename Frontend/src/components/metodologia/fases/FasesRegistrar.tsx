import React, { useEffect, useState } from "react";
import { FaseCreate } from "../../../types/faseService";
import { useNavigate } from "react-router";
import { postFase } from "../../../api/fase/fase.api";
import { getMetodologia } from "../../../api/metodologia/metodologia.api";

const RegistrarFases: React.FC = () => {
  const [nombreFase, setNameFase] = useState("");
  const [selectedMetodologia, setSelectedMetodologia] = useState<{
    metodologia: string;
    nombreMetodologia: string;
  }>({
    metodologia: "",
    nombreMetodologia: "",
  });

  const [metodologias, setMetologia] = useState<FaseCreate[]>([]);
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
      const newFase: FaseCreate = {
        nombreFase,
        metodologia: selectedMetodologia.metodologia,
        nombreMetodologia: selectedMetodologia.nombreMetodologia,
      };

      const response = await postFase(newFase);
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
        <div className="text-3xl font-bold mb-4 text-center">Registrar Fase</div>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="nombre de fase"
              value={nombreFase}
              onChange={(e) => setNameFase(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
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

export default RegistrarFases;
