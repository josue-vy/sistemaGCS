import React, { useState } from "react";
import { postProyecto } from "../../api/proyecto/proyecto.api";

const RegistrarProyecto: React.FC = () => {
  const [nombreProyecto, setNamePro] = useState("");
  const [fechaInicio, setInicio] = useState("");
  const [fechaFinal, setFinal] = useState("");
  const [estado, setEstado] = useState("");

  const handleRegistration = async () => {
    try {
      // Enviar datos del proyecto al servidor
      const response = await postProyecto({
        nombreProyecto,
        fechaInicio,
        fechaFinal,
        estado,
      });

      // Manejar la respuesta exitosa, por ejemplo, almacenar el token JWT.
      console.log("Registro exitoso:", response);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      // Manejar el error, mostrar un mensaje de error, etc.
      console.error("Error en el registro:", error);
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
              value={fechaInicio}
              onChange={(e) => setInicio(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            {/* Input para la fecha final */}
            <input
              type="date"
              value={fechaFinal}
              onChange={(e) => setFinal(e.target.value)}
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
        </form>
      </div>
    </div>
  );
};

export default RegistrarProyecto;
