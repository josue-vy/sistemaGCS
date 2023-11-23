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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Listado Miembro Elemento</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Nombre</th>
                <th className="border border-gray-300 p-2">Elemento</th>
                <th className="border border-gray-300 p-2">Fecha de Inicio</th>
                <th className="border border-gray-300 p-2">Fecha Final</th>
                <th className="border border-gray-300 p-2">Tiempo estimado</th>
                <th className="border border-gray-300 p-2">URL</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="border border-gray-300 p-2">
                    {usuario.nombreUsuario
                      ? usuario.nombreUsuario
                      : "Sin nombre"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {usuario.nomenclaturaElemento
                      ? usuario.nomenclaturaElemento
                      : "Sin elemento"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {usuario.fechaInicio}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {usuario.fechaFin}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {calcularTiempoRestante(
                      usuario.fechaInicio,
                      usuario.fechaFin
                    )}{" "}
                    días restantes
                  </td>
                  <td className="border border-gray-300 p-2 w-1/4">
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
