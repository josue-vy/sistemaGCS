export type MiembroElementoRegister = {
  id?: number;
  usuarios: string[];
  nombre: string;
  elementosConfiguracion: string[];
  nomenclaturaElemento: string;
  url: string;
  fechaInicio: Date;
  fechaFin: Date;
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
    fechaInicio: Date;
    fechaFin: Date;
    nombreUsuario?: string; 
    nomenclaturaElemento?: string; 

  };