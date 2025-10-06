"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const prisma = new client_1.PrismaClient();
async function main() {
    const existing = await prisma.ticket.count();
    if (existing > 0) {
        console.log(`DB already has ${existing} tickets; skipping seed.`);
        return;
    }
    const types = ['VIP', 'STANDARD', 'STUDENT'];
    await prisma.ticket.createMany({
        data: Array.from({ length: 30 }, (_, i) => ({
            reference: (0, crypto_1.randomUUID)(),
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
//# sourceMappingURL=seed.js.map