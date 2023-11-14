import { useState } from "react";
import { MetodologiaRegister } from "../../types/metodologiaService";
import { postMetodologia } from "../../api/metodologia/metodologia.api";


const MetodologiaRegistrar: React.FC = () => {
  const [nombreMetodologia, setNombreMetodologia] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const handleMetodologiaRegistration = async () => {
    try {
      // Enviar el nuevo tipo de usuario al servidor
      const newMetodologia: MetodologiaRegister = {
        nombreMetodologia,
      };

      const response = await postMetodologia(newMetodologia);

      // Limpiar el campo de entrada después del registro
      setNombreMetodologia('');

      console.log('Tipo de usuario registrado:', response.data);
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
        <div className="text-3xl font-bold mb-4 text-center">Registrar Metodologia</div>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="nombre de metodologia"
              value={nombreMetodologia}
              onChange={(e) => setNombreMetodologia(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleMetodologiaRegistration}
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

export default MetodologiaRegistrar;
