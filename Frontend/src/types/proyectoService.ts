export type ProyectoCreate= {
    id?: number;
    nombreProyecto: string;
    fechaInicio: string;
    fechaFinal: string;
    estado: string;
    metodologia: string;
    nombreMetodologia?: string;
  }
  
export type ProyectoList= {
    id?: string;
    nombreProyecto: string;
    fechaInicio: string;
    fechaFinal: string;
    estado: string;
    metodologia:{
      nombreMetodologia: string
    }
}