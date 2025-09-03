import { ErrorBase } from './base.error.js';

export class UnprocessableEntityError extends ErrorBase {
  constructor(message: string) {
    super(422, message);
  }
}
