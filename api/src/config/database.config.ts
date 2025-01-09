import { registerAs } from '@nestjs/config';
import { Prisma } from '.prisma/client';

export default registerAs(
  'database',
  (): Prisma.PrismaClientOptions => ({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ['query'],
  }),
);
