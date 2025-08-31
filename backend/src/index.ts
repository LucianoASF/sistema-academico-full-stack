import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();

export const prismaClient = new PrismaClient({ log: ['query'] });

app.listen(3000, () => {
  console.log('SERVIDOR ESCUTANDO!!!');
});
