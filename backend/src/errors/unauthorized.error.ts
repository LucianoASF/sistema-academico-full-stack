import { ErrorBase } from './base.error.js';

export class UnauthorizedError extends ErrorBase {
  constructor(message = 'Usuário e/ou senha incorretos') {
    super(401, message);
  }
}
