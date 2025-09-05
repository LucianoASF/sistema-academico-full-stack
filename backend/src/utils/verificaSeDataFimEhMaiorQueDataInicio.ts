import { UnprocessableEntityError } from '../errors/unprocessable-entity.error.js';

export function verificaSeDataFimEhMaiorQueDataInicio(
  dataInicio: Date,
  dataFim: Date | null,
) {
  if (dataFim) {
    if (dataInicio >= dataFim)
      throw new UnprocessableEntityError(
        'A data de fim deve ser maior que a data de início',
      );
  }
}
