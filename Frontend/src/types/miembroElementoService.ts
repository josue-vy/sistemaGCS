export type MiembroElementoRegister = {
  id?: number;
  usuarios: string[]; // Cambio a un array de usuarios
  nombre: string;
  elementosConfiguracion: string[];
  nomenclaturaElemento: string;
  url: string;
  fechaInicio: string;
  fechaFin: string;
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
    nombreUsuario?: string; 
    nomenclaturaElemento?: string; 

  };