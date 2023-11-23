import { RolProyectoRegister } from "../../../types/rolProyectoService";
import { postProyectoRol } from "../../../api/rolProyecto/rolProyecto.api";
import { useState } from "react";
import AlertMessage from "../../../pages/AlertMessage";

const RolProyectoRegistrar: React.FC = () => {
  const [nombreRolProyecto, setNombreRolProyecto] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const handleRolProyectoRegistration = async () => {
    try {
      const newRolProyecto: RolProyectoRegister = {
        nombreRolProyecto,
      };

      const response = await postProyectoRol(newRolProyecto);

      setNombreRolProyecto('');

      console.log('Rol de proyecto registrado:', response.data);

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
        <div className="text-3xl font-bold mb-4 text-center">Registrar Rol Proyecto</div>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Rol del proyecto"
              value={nombreRolProyecto}
              onChange={(e) => setNombreRolProyecto(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleRolProyectoRegistration}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Registrar
            </button>
          </div>
          {registrationSuccess && (
            <AlertMessage
              type="success"
              message="rol proyecto registrado. La página se actualizará en breve."
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

export default RolProyectoRegistrar;
