import { useState } from "react";
import { postSolicitudCambios } from "../../api/solicitudCambio/solicitudCambio.api";
import { SolicitudCreate } from "../../types/solicitudCambioService";
import AlertMessage from "../../pages/AlertMessage";

const SolicitudForm = () => {
  const today = new Date();
  const defaultDate = today.toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    fecha: defaultDate,
    objetivo: "",
    url: "",
    urlCompartido: "",
    archivo: null as File | null, // Asegura que archivo puede ser File o null
    descripcion: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const handleSolicitudSubmission = async () => {
    try {
      // Convertir la fecha a un objeto Date
      const fechaDate = new Date(formData.fecha);

      // Verificar si la fecha es válida
      if (isNaN(fechaDate.getTime())) {
        console.error("Fecha no válida");
        return;
      }

      // Enviar la nueva solicitud de cambio al servidor
      const newSolicitud: SolicitudCreate = {
        fecha: fechaDate,
        objetivo: formData.objetivo,
        url: formData.url,
        urlCompartido: formData.urlCompartido || "", // Asignar un valor predeterminado o tomar del formulario
        descripcion: formData.descripcion,
      };

      const response = await postSolicitudCambios(newSolicitud);

      // Limpiar los campos después del registro
      setFormData({
        fecha: "",
        objetivo: "",
        url: "",
        urlCompartido: "", // También restablecer urlCompartido
        archivo: null, // Agregar la propiedad archivo con valor null
        descripcion: "",
      });

      console.log("Solicitud de cambio registrada:", response.data);
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        Registrar Solicitud de Cambio
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Fecha:
        </label>
        <input
          type="date"
          value={formData.fecha}
          onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Objetivo:
        </label>
        <input
          type="text"
          value={formData.objetivo}
          onChange={(e) =>
            setFormData({ ...formData, objetivo: e.target.value })
          }
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">URL:</label>
        <input
          type="text"
          value={formData.urlCompartido}
          onChange={(e) =>
            setFormData({ ...formData, urlCompartido: e.target.value })
          }
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>

      <input
        type="file"
        onChange={(e) => {
          const selectedFile = e.target?.files?.[0];
          setFormData({ ...formData, archivo: selectedFile || null });
        }}
        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-400"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Descripción:
        </label>
        <textarea
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>

      <button
        onClick={handleSolicitudSubmission}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Registrar
      </button>

      {/* Mostrar mensaje de éxito después del registro */}
      {registrationSuccess && (
        <AlertMessage
          type="success"
          message="Solicitud registrado. La página se actualizará en breve."
        />
      )}

      {registrationError && (
        <AlertMessage
          type="error"
          message="Error en el registro. Inténtalo de nuevo."
        />
      )}
    </div>
  );
};

export default SolicitudForm;
