export type getMatriculasCursandoByAlunoType = {
  id: number;
  alunoId: number;
  disciplinaRealizadaId: number;
  disciplinaRealizada: {
    disciplina: {
      nome: string;
    };
    professor: {
      nome: string;
    };
  };
};
