import express from 'express';
// import { PrismaClient } from '@prisma/client';
import { erroHandler } from './middlewares/erro-handler.middleware.js';

const app = express();

app.use(express.json());

erroHandler(app);

// export const prismaClient = new PrismaClient({ log: ['query'] });

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:30001');
});
