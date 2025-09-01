import express from 'express';
import { erroHandler } from './middlewares/erro-handler.middleware.js';
import { routes } from './routes/index.js';

const app = express();

app.use(express.json());

routes(app);
erroHandler(app);

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
