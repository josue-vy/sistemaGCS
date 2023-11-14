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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Listado de Solicitudes de Cambio</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            {/* Encabezado de la tabla */}
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Id</th>
                <th className="border border-gray-300 p-2">Objetivo</th>
                <th className="border border-gray-300 p-2">Descripción</th>
                <th className="border border-gray-300 p-2 w-1/4">Acciones</th>
              </tr>
            </thead>
            {/* Cuerpo de la tabla */}
            <tbody>
              {solicitudList.map((solicitud) => (
                <tr key={solicitud.id}>
                  <td className="border border-gray-300 p-2">{solicitud.id}</td>
                  <td className="border border-gray-300 p-2">{solicitud.objetivo}</td>
                  <td className="border border-gray-300 p-2">{solicitud.descripcion}</td>
                  <td className="border border-gray-300 p-2 w-1/4">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                      onClick={() => redirectToUrl(solicitud.urlCompartido)}
                    >
                      Ver Url
                    </button>
                    <button
                      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                      onClick={ handleDirectToR}
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
