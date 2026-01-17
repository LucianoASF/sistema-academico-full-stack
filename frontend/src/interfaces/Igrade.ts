export interface Igrade {
  id: number;
  versao: number;
  cursoId: number;
  disciplinas: {
    id: number;
    nome: string;
    quantidadeAulas: number;
  }[];
}
