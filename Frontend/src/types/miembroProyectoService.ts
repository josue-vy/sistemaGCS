export type MiembroProRegister = {
  id?: number;
  usuarios: string[]; // Cambia 'usuario' a 'usuarios'
  nombre: string;
  rol: string;
  nombreRolProyecto: string;
  proyecto: string;
  nombreProyecto: string;
};
export type MiembroProList = {
  id?: number;
  usuario: {
    nombre: string;
  };
  rol: {
    nombreRolProyecto: string;
  };
  proyecto: {
    nombreProyecto: string;
  };
};
