import Fastify from 'fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
/**
 * Временное in-memory хранилище. На следующей лабе оно уедет в Postgres + Prisma,
 * а пока этого достаточно, чтобы научиться писать маршруты и схемы.
 */
export declare function buildApp(): Promise<Fastify.FastifyInstance<import("node:http").Server<typeof import("node:http").IncomingMessage, typeof import("node:http").ServerResponse>, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, Fastify.FastifyBaseLogger, TypeBoxTypeProvider>>;
//# sourceMappingURL=app.d.ts.map