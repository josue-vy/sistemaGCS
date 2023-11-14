export type ProyectoCreate= {
    nombreProyecto: string;
    fechaInicio: string;
    fechaFinal: string;
    estado: string;
  }
  
export type ProyectoList= {
    id?: string;
    nombreProyecto: string;
    fechaInicio: string;
    fechaFinal: string;
    estado: string;
}