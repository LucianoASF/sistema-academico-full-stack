import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthController } from '../controllers/auth.controller.js';
import { celebrate, Segments } from 'celebrate';
import { loginSchema } from '../schemas/auth.schema.js';

export const authRoutes = Router();

authRoutes.post(
  '/auth/login',
  celebrate({ [Segments.BODY]: loginSchema }),
  asyncHandler(AuthController.login),
);
