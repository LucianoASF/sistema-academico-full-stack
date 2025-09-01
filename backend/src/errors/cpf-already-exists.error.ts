import { ErrorBase } from './base.error.js';

export class CpfAlreadyExistsError extends ErrorBase {
  constructor(message = 'O CPF informado já está em uso por outra conta!') {
    super(409, message);
  }
}
