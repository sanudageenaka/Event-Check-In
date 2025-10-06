import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.ticket.count();
  if (existing > 0) {
    console.log(`DB already has ${existing} tickets; skipping seed.`);
    return;
  }

  const types = ['VIP', 'STANDARD', 'STUDENT'] as const;

  await prisma.ticket.createMany({
    data: Array.from({ length: 30 }, (_, i) => ({
      reference: randomUUID(),
      type: types[i % types.length],
    })),
  });

  console.log('Seeded 30 tickets ✅');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
