import fp from 'fastify-plugin';
import { PrismaClient } from '../generated/prisma/client.js';
// fastify-plugin снимает инкапсуляцию, чтобы decorate был виден всему приложению, а не только внутри плагина.
export default fp(async (app) => {
    const prisma = new PrismaClient();
    // decorate делает prisma доступным как app.prisma во всех маршрутах и хуках.
    app.decorate('prisma', prisma);
    // Хук onClose вызывает $disconnect, когда сервер останавливается, чтобы закрыть соединение с БД.
    app.addHook('onClose', async (inst) => {
        await inst.prisma.$disconnect();
    });
});
//# sourceMappingURL=prisma.js.map