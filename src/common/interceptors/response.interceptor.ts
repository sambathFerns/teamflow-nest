import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiErrorCode } from './api-response';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => ({
        error: false,
        message: 'Success',
        data,
        errorCode: ApiErrorCode.SUCCESS,
      })),
      catchError((exception: unknown) => {
        const status =
          exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const body =
          exception instanceof HttpException ? exception.getResponse() : null;
        const rawMessage =
          typeof body === 'string'
            ? body
            : body && typeof body === 'object'
              ? (body as { message?: string | string[] }).message
              : undefined;

        const message =
          status >= 500
            ? 'Internal server error'
            : Array.isArray(rawMessage)
              ? rawMessage.join(', ')
              : (rawMessage ?? 'Request failed');

        const errorCode =
          status === 400
            ? ApiErrorCode.VALIDATION_ERROR
            : status === 404
              ? ApiErrorCode.NOT_FOUND
              : status >= 500
                ? ApiErrorCode.INTERNAL_ERROR
                : ApiErrorCode.REQUEST_ERROR;

        return throwError(
          () =>
            new HttpException(
              { error: true, message, data: null, errorCode },
              status,
            ),
        );
      }),
    );
  }
}
