import fp from 'fastify-plugin'
import { PrismaClient } from '../generated/prisma/client.js'
// Расширяем типизацию Fastify: после регистрации плагина у экземпляра появится свойство prisma.
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}
// fastify-plugin снимает инкапсуляцию, чтобы decorate был виден всему приложению, а не только внутри плагина.
export default fp(async (app) => {
  const prisma = new PrismaClient()
  // decorate делает prisma доступным как app.prisma во всех маршрутах и хуках.
  app.decorate('prisma', prisma)
  // Хук onClose вызывает $disconnect, когда сервер останавливается, чтобы закрыть соединение с БД.
  app.addHook('onClose', async (inst) => {
    await inst.prisma.$disconnect()
  })
})