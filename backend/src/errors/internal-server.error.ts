import { ErrorBase } from './base.error.js';

export class InternalServerError extends ErrorBase {
  constructor(msg = 'Erro interno do Servidor') {
    super(500, msg);
  }
}
