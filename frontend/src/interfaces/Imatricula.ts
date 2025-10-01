export interface Imatricula {
  id: number;
  notaFinal: null;
  presencaFinal: null;
  status: string;
  alunoId: number;
  disciplinaRealizadaId: number;
  usuario: {
    nome: string;
  };
}
