export type UserRegister = {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  tipoUsuario: string; // Aquí solo debería ser el nombre del tipo de usuario
  nombreTipoUsuario?: string;
};

export type UserList = {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  tipoUsuario: {
      nombreTipoUsuario: string;
    };
};
