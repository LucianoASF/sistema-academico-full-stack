import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { erroHandler } from './middlewares/erro-handler.middleware.js';
import { routes } from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', // site permitido
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // métodos permitidos
    credentials: true, // se precisar enviar cookies
  }),
);

routes(app);
erroHandler(app);

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
