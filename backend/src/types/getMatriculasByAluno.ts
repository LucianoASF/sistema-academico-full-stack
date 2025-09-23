import type { Matricula } from '@prisma/client';

export type getMatriculasByAlunoType = {
  id: number;
  notaFinal: number | null;
  presencaFinal: number | null;
  status: Matricula['status'];
  alunoId: number;
  disciplinaRealizadaId: number;
  disciplinaRealizada: {
    dataInicio: Date;
    dataFim: null | Date;
    disciplinaId: number;
  };
};
