import type { FastifyError, FastifySchemaValidationError } from 'fastify';
import type { SchemaErrorDataVar } from 'fastify/types/schema.js';
import { type Static } from '@sinclair/typebox';
/**
 * Обёртка над стандартной ошибкой Fastify для случаев, когда схема запроса не проходит валидацию.
 * Мы расширяем Error, чтобы получить сообщение и stack trace, и одновременно реализуем FastifyError,
 * чтобы Fastify понимал код ошибки и корректно возвращал ответ клиенту.
 */
export declare class ValidationProblem extends Error implements FastifyError {
    readonly name = "ValidationError";
    readonly code = "FST_ERR_VALIDATION";
    readonly statusCode = 400;
    readonly validation: FastifySchemaValidationError[];
    readonly validationContext: SchemaErrorDataVar;
    constructor(message: string, errs: FastifySchemaValidationError[], ctx: SchemaErrorDataVar, options?: ErrorOptions);
}
export declare const ProblemDetails: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TString;
    title: import("@sinclair/typebox").TString;
    status: import("@sinclair/typebox").TInteger;
    detail: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    instance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    errorsText: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ProblemDetails = Static<typeof ProblemDetails>;
export declare const User: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    email: import("@sinclair/typebox").TString;
}>;
export type User = Static<typeof User>;
export declare const Health: import("@sinclair/typebox").TObject<{
    ok: import("@sinclair/typebox").TBoolean;
}>;
export type Health = Static<typeof Health>;
//# sourceMappingURL=types.d.ts.map