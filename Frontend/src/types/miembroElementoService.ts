export type MiembroElementoRegister = {
  id?: number;
  usuarios: string[]; // Cambio a un array de usuarios
  nombre: string;
  elementoConfiguracion: string;
  nomenclaturaElemento: string;
  url: string;
  fechaInicio: string;
  fechaFinal: string;
};

export type MiembroElementoList = {
    id?: number;
    usuario?: {
      nombre: string;
    } | null;
    elementoConfiguracion?: {
      nomenclaturaElemento: string;
    } | null;
    url: string;
    fechaInicio: string;
    fechaFin: string;
    nombreUsuario?: string; // Nuevo campo para el nombre de usuario
    nomenclaturaElemento?: string; // Nuevo campo para la nomenclatura del elemento
    // Otros campos que necesites en la lista
  };