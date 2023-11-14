export type FaseCreate= {
    id?: number;
    nombreFase: string;
    metodologia: string;
    nombreMetodologia?: string;
  }
  
export type FaseList= {
    id?: string;
    nombreFase: string;
    metodologia:{
      nombreMetodologia: string
    }
}