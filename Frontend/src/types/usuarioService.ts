export type UserRegister = {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  tipoUsuario: string;
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
  miembroUsuario?: string;
};
