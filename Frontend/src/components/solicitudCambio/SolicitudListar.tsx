import { useEffect, useState } from "react";
import { SolicitudList } from "../../types/solicitudCambioService";
import { getSolicitudCambios } from "../../api/solicitudCambio/solicitudCambio.api";
import { useNavigate } from "react-router";

const SolicitudCambiosListar: React.FC = () => {
  const [solicitudList, setSolicitudList] = useState<SolicitudList[]>([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await getSolicitudCambios();
        setSolicitudList(response.data);
      } catch (error) {
        console.error("Error al listar solicitudes de cambio:", error);
      }
    };

    fetchSolicitudes();
  }, []);

  const navigate = useNavigate();
  const handleDirectToR = () => {
    navigate('/solicitud/listar/respuesta');
  };

  const redirectToUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Listado de Solicitudes de Cambio</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">Id</th>
                <th className="py-3 px-4 border-b border-gray-300">Objetivo</th>
                <th className="py-3 px-4 border-b border-gray-300">Descripción</th>
                <th className="py-3 px-4 border-b border-gray-300 w-1/4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {solicitudList.map((solicitud) => (
                <tr key={solicitud.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 border-b border-gray-300">{solicitud.id}</td>
                  <td className="py-4 px-6 border-b border-gray-300">{solicitud.objetivo}</td>
                  <td className="py-4 px-6 border-b border-gray-300">{solicitud.descripcion}</td>
                  <td className="py-4 px-6 border-b border-gray-300 w-1/4">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-700"
                      onClick={() => redirectToUrl(solicitud.urlCompartido)}
                    >
                      Ver URL
                    </button>
                    <button
                      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
                      onClick={handleDirectToR}
                    >
                      Responder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SolicitudCambiosListar;
