import { HttpStatus, Injectable } from '@nestjs/common';

import { Response } from 'express';
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError } from 'typeorm';

const handleErrorFn = (error: unknown) => {
  if (
    error instanceof QueryFailedError ||
    error instanceof EntityNotFoundError ||
    error instanceof CannotCreateEntityIdMapError
  ) {
    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      body: error.message,
    };
  }
  if (error instanceof Error && error.message === 'TOO_BIG_IMPORT_FILE_SIZE') {
    return {
      code: HttpStatus.BAD_REQUEST,
      body: 'the file size is too big',
    };
  }
};

const errorHandlerFn = async (decorateFn: () => Promise<Result> | Result, errorHandler = handleErrorFn) => {
  try {
    return await decorateFn();
  } catch (error) {
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError ||
      error instanceof CannotCreateEntityIdMapError
    ) {
      console.log('error', error);
      errorHandler(error);
    } else {
      errorHandler(error);
    }
  }
};

export type Result = {
  code: number;
  body: unknown;
};

export const fnWrapper = (input: Result | Promise<Result>) => async () => {
  const res = await input;
  return {
    code: res.code,
    body: res.body,
  };
};

const jsonResponse = async (res: Response, decoratedFn: () => Promise<Result> | Result) => {
  const result = await decoratedFn();
  res.status(result.code).json(result.body);
};

export const jsonResponseWithErrorHandler = async (res: Response, fn: () => Promise<Result> | Result) =>
  jsonResponse(res, () => errorHandlerFn(fn));

@Injectable()
export class ErrorHandler {
  handleErrorWithJsonResponse = async (res: Response, fn: () => Promise<Result> | Result) => {
    return jsonResponse(res, () => errorHandlerFn(fn));
  };
}
