import {
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import {
  CannotCreateEntityIdMapError,
  DataSource,
  EntityNotFoundError,
  QueryFailedError,
  QueryRunner,
} from 'typeorm';

import { Response } from 'express';

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

@Injectable()
export class ParseOptionalDatePipe implements PipeTransform {
  transform(value: string | undefined | null) {
    if (!value) return value;
    const transformedValue = new Date(value);
    if (isNaN(transformedValue.getTime())) {
      throw new BadRequestException('Invalid date');
    }
    return transformedValue;
  }
}

@Injectable()
export class ParseRequiredPipe implements PipeTransform {
  transform(value: unknown | undefined | null) {
    if (!value) throw new BadRequestException('required property');
    return value;
  }
}

const errorHandlerFn = async (
  decorateFn: () => Promise<Result> | Result,
  errorHandler = handleErrorFn,
) => {
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

export const wrapInTransaction = async <T>(
  dataSource: DataSource,
  fn: (queryRunner: QueryRunner) => Promise<T>,
) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const ret = await fn(queryRunner);
    await queryRunner.commitTransaction();
    return ret;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
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

@Injectable()
export class TypeOrmTransaction {
  constructor(private dataSource: DataSource) {}

  async wrapInTransaction<T>(fn: (queryRunner: QueryRunner) => Promise<T>) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const ret = await fn(queryRunner);
      await queryRunner.commitTransaction();
      return ret;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

const jsonResponse = async (
  res: Response,
  decoratedFn: () => Promise<Result> | Result,
) => {
  const result = await decoratedFn();
  res.status(result.code).json(result.body);
};

export const jsonResponseWithErrorHandler = async (
  res: Response,
  fn: () => Promise<Result> | Result,
) => jsonResponse(res, () => errorHandlerFn(fn));

@Injectable()
export class ErrorHandler {
  handleErrorWithJsonResponse = async (
    res: Response,
    fn: () => Promise<Result> | Result,
  ) => {
    return jsonResponse(res, () => errorHandlerFn(fn));
  };
}
