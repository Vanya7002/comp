import { Type as T } from '@sinclair/typebox';
// Схемы вынесены отдельно — одни и те же объекты питают и валидацию, и генерацию OpenAPI.
/**
 * Обёртка над стандартной ошибкой Fastify для случаев, когда схема запроса не проходит валидацию.
 * Мы расширяем Error, чтобы получить сообщение и stack trace, и одновременно реализуем FastifyError,
 * чтобы Fastify понимал код ошибки и корректно возвращал ответ клиенту.
 */
export class ValidationProblem extends Error {
    name = 'ValidationError';
    code = 'FST_ERR_VALIDATION';
    statusCode = 400;
    validation;
    validationContext;
    constructor(message, errs, ctx, options) {
        super(message, options);
        this.validation = errs;
        this.validationContext = ctx;
    }
}
// Схема ответа RFC 9457 (Problem Details) — единый JSON-формат для сообщений об ошибках.
export const ProblemDetails = T.Object({
    type: T.String({ description: 'URI с подробным описанием ошибки (по умолчанию about:blank)' }),
    title: T.String({ description: 'Короткое человекочитаемое резюме проблемы' }),
    status: T.Integer({ minimum: 100, maximum: 599, description: 'HTTP-статус, с которым был отправлен ответ' }),
    detail: T.Optional(T.String({ description: 'Дополнительные сведения о том, что пошло не так' })),
    instance: T.Optional(T.String({ description: 'URI запроса, в котором возникла проблема' })),
    errorsText: T.Optional(T.String({ description: 'Сводное описание всех ошибок, собранных валидацией Fastify' })),
}, { additionalProperties: true });
// Схема и тип пользователя, которые используются и в валидаторах, и в ответах API.
export const User = T.Object({
    id: T.String({ description: 'Уникальный идентификатор пользователя' }),
    email: T.String({ format: 'email', description: 'Адрес электронной почты' }),
});
export const Health = T.Object({
    ok: T.Boolean({ description: 'Флаг готовности сервиса' }),
});
//# sourceMappingURL=types.js.map