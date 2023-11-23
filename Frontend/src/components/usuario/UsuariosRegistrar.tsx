import React, { useState, useEffect } from "react";
import { registerUser } from "../../api/usuario/auth.api";
import { UserRegister } from "../../types/usuarioService";
import { useNavigate } from "react-router-dom";
import { getTipoUsuarios } from "../../api/tipousuario/tipousuario.api";
import AlertMessage from "../../pages/AlertMessage";

const Registration: React.FC = () => {
  const [nombre, setUsername] = useState("");
  const [apellido, setLastname] = useState("");
  const [correo, setEmail] = useState("");
  const [contrasena, setPassword] = useState("");
  const [selectedTipoUsuario, setSelectedTipoUsuario] = useState<{
    tipoUsuario: string;
    nombreTipoUsuario: string;
  }>({
    tipoUsuario: "",
    nombreTipoUsuario: "",
  });

  const [tipoUsuarios, setTipoUsuarios] = useState<UserRegister[]>([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTipoUsuarios = async () => {
      try {
        const response = await getTipoUsuarios();
        setTipoUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener TipoUsuarios:", error);
      }
    };

    fetchTipoUsuarios();
  }, []);

  const handleRegistration = async () => {
    try {
      const newUser: UserRegister = {
        nombre,
        apellido,
        correo,
        contrasena,
        tipoUsuario: selectedTipoUsuario.tipoUsuario,
        nombreTipoUsuario: selectedTipoUsuario.nombreTipoUsuario,
      };

      const response = await registerUser(newUser);

      console.log("Registro exitoso:", response.data);

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
        <div className="text-3xl font-bold mb-4 text-center">
          Registrar Usuario
        </div>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={nombre}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="email"
              required
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
            />
          </div>
          <select
            value={selectedTipoUsuario.tipoUsuario}
            onChange={(e) =>
              setSelectedTipoUsuario({
                ...selectedTipoUsuario,
                tipoUsuario: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
          >
            <option key="default" value="">
              Seleccionar Tipo de Usuario
            </option>
            {/* Filtrar tipos de usuario existentes */}
            {tipoUsuarios
              .filter(
                (tipoUsuario, index, self) =>
                  index ===
                  self.findIndex(
                    (t) => t.nombreTipoUsuario === tipoUsuario.nombreTipoUsuario
                  )
              )
              .map((tipoUsuario) => (
                <option key={tipoUsuario.id} value={tipoUsuario.tipoUsuario}>
                  {tipoUsuario.nombreTipoUsuario}
                </option>
              ))}
          </select>
          <div>
            <button
              type="button"
              onClick={handleRegistration}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Registrarse
            </button>
          </div>
          {registrationSuccess && (
            <AlertMessage
              type="success"
              message="Usuario registrado. La página se actualizará en breve."
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

export default Registration;
