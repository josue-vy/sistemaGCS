export type MiembroProRegister = {
  id?: number;
  usuario: string;
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
