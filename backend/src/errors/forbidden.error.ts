import { ErrorBase } from './base.error.js';

export class ForbiddenError extends ErrorBase {
  constructor(message = 'Acesso negado') {
    super(403, message);
  }
}
