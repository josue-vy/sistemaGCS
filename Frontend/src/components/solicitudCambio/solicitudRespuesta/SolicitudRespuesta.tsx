// import { registerProyecto } from '../../api/metodologia/proyecto.api';

import Sidebar from "../../shared/sidebar";

const RespuestaSolicitudCambio: React.FC = () => {
  const handleRegistration = async () => {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Sidebar />
      <div className="max-w-md w-full">
        <div className="text-3xl font-bold mb-4 text-center">
          Enviar Respuesta
        </div>
        <form className="space-y-4">
          <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400">
            <option>Seleccione:</option>
            <option value="activo">Aprobado</option>
            <option value="inactivo">Rechazado</option>
          </select>
          <div>
            <input
              type="text"
              placeholder="descripcion"
              //   value={codigoProyecto}
              //   onChange={(e) => setCodPro(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleRegistration}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RespuestaSolicitudCambio;
