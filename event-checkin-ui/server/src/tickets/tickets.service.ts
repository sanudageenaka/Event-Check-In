import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TYPES = ['VIP', 'STANDARD', 'STUDENT'] as const;
type TicketKind = (typeof TYPES)[number];

@Injectable()
export class TicketsService {
  async list() {
    return prisma.ticket.findMany({ orderBy: { createdAt: 'asc' } });
  }

  async stats() {
    const total = await prisma.ticket.count();

    const grouped = await prisma.ticket.groupBy({
      by: ['type', 'checkedIn'],
      _count: { _all: true },
    });

    const summary: Record<string, { total: number; checkedIn: number }> = {
      VIP: { total: 0, checkedIn: 0 },
      STANDARD: { total: 0, checkedIn: 0 },
      STUDENT: { total: 0, checkedIn: 0 },
    };

    for (const row of grouped) {
      const key = row.type as keyof typeof summary;
      if (!summary[key]) summary[key] = { total: 0, checkedIn: 0 };
      summary[key].total += row._count._all;
      if (row.checkedIn) summary[key].checkedIn += row._count._all;
    }

    const checkedIn = await prisma.ticket.count({ where: { checkedIn: true } });
    return { total, checkedIn, byType: summary };
  }

  async seed(count = 15) {
    const { randomUUID } = await import('crypto');

    // Ensure unique references before insert (SQLite doesn't support skipDuplicates)
    const refs = new Set<string>();
    const data: Array<{ reference: string; type: TicketKind }> = [];
    while (data.length < count) {
      const ref = randomUUID();
      if (!refs.has(ref)) {
        refs.add(ref);
        data.push({ reference: ref, type: TYPES[data.length % TYPES.length] });
      }
    }

    await prisma.ticket.createMany({ data }); // no skipDuplicates on SQLite
    return { created: data.length };
  }

  async byReference(reference: string) {
    const t = await prisma.ticket.findUnique({ where: { reference } });
    if (!t) throw new NotFoundException('Ticket not found');
    return t;
  }

  async checkin(reference: string) {
    const t = await prisma.ticket.findUnique({ where: { reference } });
    if (!t) throw new NotFoundException('Ticket not found');
    if (t.checkedIn) throw new BadRequestException('Ticket already checked in');

    return prisma.ticket.update({
      where: { reference },
      data: { checkedIn: true, checkedInAt: new Date() },
    });
  }
}
