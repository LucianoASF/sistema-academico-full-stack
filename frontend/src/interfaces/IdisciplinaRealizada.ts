export interface IdisciplinaRealizada {
  id: number;
  dataInicio: string | Date;
  dataFim: null | string | Date;
  disciplinaId: number;
  professorId: number;
  disciplina: {
    id: number;
    nome: string;
    quantidadeAulas: number;
  };
}
