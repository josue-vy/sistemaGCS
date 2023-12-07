export type ProyectoCreate= {
    id?: number;
    nombreProyecto: string;
    fechaInicio: Date;
    fechaFinal: Date;
    estado: string;
    metodologia: string;
    nombreMetodologia?: string;
  }
  
export type ProyectoList= {
    id?: string;
    nombreProyecto: string;
    fechaInicio: Date;
    fechaFinal: Date;
    estado: string;
    metodologia:{
      nombreMetodologia: string
    }
}