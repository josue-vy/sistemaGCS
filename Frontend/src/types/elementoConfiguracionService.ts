export type ElementoConfiCreate= {
    id?: number;
    nomenclaturaElemento: string;
    nombreElemento: string;
    fase: string;
    nombreFase: string;
  }
  
  export type ElementoConfiList= {
    id?: number;
    nomenclaturaElemento: string;
    nombreElemento: string;
    fase:{
    nombreFase: string;
    }
  }
