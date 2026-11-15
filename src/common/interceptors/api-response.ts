export enum ApiErrorCode {
  SUCCESS = 'SUCCESS',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  REQUEST_ERROR = 'REQUEST_ERROR',
  NOT_FOUND = 'NOT_FOUND',
}

export function apiResponse<T>(
  error: boolean,
  message: string,
  data: T,
  errorCode: ApiErrorCode,
) {
  return { error, message, data, errorCode };
}
