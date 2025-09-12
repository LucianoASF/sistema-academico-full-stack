import { Joi } from 'celebrate';

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().email().min(5).max(100).required(),
  senha: Joi.string().trim().min(5).max(60).required(),
});
