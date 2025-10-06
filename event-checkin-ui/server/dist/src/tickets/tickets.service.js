"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const TYPES = ['VIP', 'STANDARD', 'STUDENT'];
let TicketsService = class TicketsService {
    async list() {
        return prisma.ticket.findMany({ orderBy: { createdAt: 'asc' } });
    }
    async stats() {
        const total = await prisma.ticket.count();
        const grouped = await prisma.ticket.groupBy({
            by: ['type', 'checkedIn'],
            _count: { _all: true },
        });
        const summary = {
            VIP: { total: 0, checkedIn: 0 },
            STANDARD: { total: 0, checkedIn: 0 },
            STUDENT: { total: 0, checkedIn: 0 },
        };
        for (const row of grouped) {
            const key = row.type;
            if (!summary[key])
                summary[key] = { total: 0, checkedIn: 0 };
            summary[key].total += row._count._all;
            if (row.checkedIn)
                summary[key].checkedIn += row._count._all;
        }
        const checkedIn = await prisma.ticket.count({ where: { checkedIn: true } });
        return { total, checkedIn, byType: summary };
    }
    async seed(count = 15) {
        const { randomUUID } = await Promise.resolve().then(() => require('crypto'));
        const refs = new Set();
        const data = [];
        while (data.length < count) {
            const ref = randomUUID();
            if (!refs.has(ref)) {
                refs.add(ref);
                data.push({ reference: ref, type: TYPES[data.length % TYPES.length] });
            }
        }
        await prisma.ticket.createMany({ data });
        return { created: data.length };
    }
    async byReference(reference) {
        const t = await prisma.ticket.findUnique({ where: { reference } });
        if (!t)
            throw new common_1.NotFoundException('Ticket not found');
        return t;
    }
    async checkin(reference) {
        const t = await prisma.ticket.findUnique({ where: { reference } });
        if (!t)
            throw new common_1.NotFoundException('Ticket not found');
        if (t.checkedIn)
            throw new common_1.BadRequestException('Ticket already checked in');
        return prisma.ticket.update({
            where: { reference },
            data: { checkedIn: true, checkedInAt: new Date() },
        });
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)()
], TicketsService);
//# sourceMappingURL=tickets.service.js.map