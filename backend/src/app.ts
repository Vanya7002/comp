import Fastify, { type FastifyError } from 'fastify'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import { STATUS_CODES } from 'node:http'
import { Type as T } from '@sinclair/typebox'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { ValidationProblem, ProblemDetails, User, Health } from './types.js'
import prismaPlugin from './plugins/prisma.js'

/**
 * Временное in-memory хранилище. На следующей лабе оно уедет в Postgres + Prisma,
 * а пока этого достаточно, чтобы научиться писать маршруты и схемы.
 */

export async function buildApp() {
  const app = Fastify({
    logger: true,
    trustProxy: true,
    schemaErrorFormatter(errors, dataVar) {
      const msg = errors.map((e) => e.message).filter(Boolean).join('; ') || 'Validation failed'
      return new ValidationProblem(msg, errors, dataVar)
    },
  }).withTypeProvider<TypeBoxTypeProvider>()
  // Инфраструктурные плагины
  await app.register(helmet)
  // Для dev открываем localhost фронтенда, чтобы CORS-запросы из браузера проходили.
  await app.register(cors, {
    origin: [/^http:\/\/localhost:\d+$/],
    credentials: false,
  })
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    enableDraftSpec: true,
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
      'retry-after': true,
    },
    errorResponseBuilder(request, ctx) {
      const seconds = Math.ceil(ctx.ttl / 1000)
      return {
        type: 'about:blank',
        title: 'Too Many Requests',
        status: 429,
        detail: `Rate limit exceeded. Retry in ${seconds} seconds.`,
        instance: request.url,
      } satisfies ProblemDetails
    },
  })
  await app.register(swagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'Rooms API',
        version: '1.0.0',
        description: 'HTTP-API, совместимый с RFC 9457 (Problem Details).',
      },
      servers: [{ url: 'http://localhost:3000' }],
      tags: [
        { name: 'Users', description: 'Маршруты для управления пользователями' },
        { name: 'System', description: 'Служебные эндпоинты' },
      ],
    },
  })
  // Глобальные обработчики ошибок
  app.setErrorHandler<FastifyError | ValidationProblem>((err, req, reply) => {
    const status = typeof err.statusCode === 'number' ? err.statusCode : 500
    const isValidation = err instanceof ValidationProblem
    const problem = {
      type: 'about:blank',
      title: STATUS_CODES[status] ?? 'Error',
      status,
      detail: err.message || 'Unexpected error',
      instance: req.url,
      ...(isValidation ? { errorsText: err.message } : {}),
    }
    reply.code(status).type('application/problem+json').send(problem)
  })
  app.setNotFoundHandler((request, reply) => {
    reply.code(404).type('application/problem+json').send({
      type: 'about:blank',
      title: 'Not Found',
      status: 404,
      detail: `Route ${request.method} ${request.url} not found`,
      instance: request.url,
    } satisfies ProblemDetails)
  })
  // Маршруты API
app.get(
  '/api/users',
  {
    schema: {
      operationId: 'listUsers',
      tags: ['Users'],
      summary: 'Возвращает список пользователей',
      response: {
        200: {
          description: 'Список пользователей',
          content: {
            'application/json': {
              schema: T.Array(User),
            },
          },
        },
        429: {
          description: 'Too Many Requests',
          content: {
            'application/problem+json': {
              schema: ProblemDetails,
            },
          },
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/problem+json': {
              schema: ProblemDetails,
            },
          },
        },
      },
    },
  },
  async () =>
    app.prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    }),
);

app.get(
  '/api/health',
  {
    schema: {
      operationId: 'health',
      tags: ['System'],
      summary: 'Health/Readiness',
      description: 'Проверяет, что процесс жив и база данных отвечает.',
      response: {
        200: { description: 'Ready', content: { 'application/json': { schema: Health } } },
        503: { description: 'Temporarily unavailable', content: { 'application/problem+json': { schema: ProblemDetails } } },
      },
    },
  },
  async (_req, reply) => {
    try {
      await app.prisma.$queryRaw`SELECT 1`
      return { ok: true } as Health
    } catch {
      // Возвращаем 503, чтобы балансировщик мог вывести инстанс из ротации.
      reply.code(503).type('application/problem+json').send({
        type: 'https://example.com/problems/dependency-unavailable',
        title: 'Service Unavailable',
        status: 503,
        detail: 'Database ping failed',
        instance: '/api/health',
      } satisfies ProblemDetails)
    }
  }
)
  // hide скрывает сам маршрут из генерируемой спецификации.
  app.get(
    '/openapi.json',
    { schema: { hide: true } },
    async (_req, reply) => {
      reply.type('application/json').send(app.swagger())
    }
  )
  return app
}