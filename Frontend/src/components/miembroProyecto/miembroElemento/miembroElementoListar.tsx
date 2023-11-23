import React, { useEffect, useState } from "react";
import { MiembroElementoList } from "../../../types/miembroElementoService";
import { getMiembroElemento } from "../../../api/miembroElemento/miembroElemento.api";

const MiembroElementoListar: React.FC = () => {
  const [usuarios, setUsuarios] = useState<MiembroElementoList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMiembroElemento();
        if (Array.isArray(response.data.data)) {
          setUsuarios(response.data.data);
        } else {
          console.error("Los datos no son un array:", response.data.data);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const calcularTiempoRestante = (fechaInicio: string, fechaFin: string) => {
    const inicio = new Date(fechaInicio).getTime();
    const fin = new Date(fechaFin).getTime();
    const diff = fin - inicio;

    // Calcula el tiempo restante en milisegundos y convierte a días
    const diasRestantes = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diasRestantes;
  };

  const redirectToUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Listado Miembro Elemento</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">Nombre</th>
                <th className="py-3 px-4 border-b border-gray-300">Elemento</th>
                <th className="py-3 px-4 border-b w-1/5 border-gray-300">Fecha de Inicio</th>
                <th className="py-3 px-4 border-b w-1/5 border-gray-300">Fecha Final</th>
                <th className="py-3 px-4 border-b border-gray-300">Tiempo estimado</th>
                <th className="py-3 px-4 border-b w-1/5 border-gray-300">URL</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 border-b border-gray-300">
                    {usuario.nombreUsuario ? usuario.nombreUsuario : "Sin nombre"}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300">
                    {usuario.nomenclaturaElemento ? usuario.nomenclaturaElemento : "Sin elemento"}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300">{usuario.fechaInicio}</td>
                  <td className="py-4 px-6 border-b border-gray-300">{usuario.fechaFin}</td>
                  <td className="py-4 px-6 border-b border-gray-300">
                    {calcularTiempoRestante(usuario.fechaInicio, usuario.fechaFin)} días restantes
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                      onClick={() => redirectToUrl(usuario.url)}
                    >
                      Ver Url
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

export default MiembroElementoListar;
