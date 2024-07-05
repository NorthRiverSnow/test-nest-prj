import {
  BadRequestException,
  HttpException,
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

// export class RSOCException extends HttpException {
//   constructor(error: string) {
//     console.log(error);
//     if (error === 'TYPE_ORM_ERROR') {
//       super(
//         {
//           statusCode: 400,
//           error: 'error',
//           message: 'エラーだよ',
//           values: 'type orm error',
//         },
//         HttpStatus.OK,
//       );
//       return;
//     }

//     if (error === 'NO_DATA_FOUND') {
//       super(
//         {
//           statusCode: 400,
//           error: 'error',
//           message: 'データないよ',
//           values: 'no data error',
//         },
//         HttpStatus.OK,
//       );
//       return;
//     }

//     super(
//       {
//         statusCode: 400,
//         response: { error: 'error', values: 'unknown error' },
//       },
//       HttpStatus.OK,
//     );
//     return;
//   }
// }

export class newError extends Error {
  readonly resBody;
  constructor(message: string, resBody: unknown) {
    super(message);
    this.resBody = resBody;
  }
}

const RSOCException = (error: unknown) => {
  if (error instanceof Error && error.message === 'TOO_BIG_IMPORT_FILE_SIZE') {
    return {
      status: 'error',
      message: 'ERRORS.IMPORT_FILE_SIZE',
    };
  }
  if (error instanceof newError && error.message === 'ERROR_CODE_104') {
    return [new ServiceResponse(104), error.resBody];
  }

  if (error instanceof newError && error.message === 'ERROR_CODE_105') {
    return [new ServiceResponse(105), error.resBody];
  }

  return [new ServiceResponse(200), 'データがないよ'];
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

export const errorHandler = async <T>(
  decorateFn: () => Promise<T>,
  errorHandler = RSOCException,
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
  statusCode: number;
  value: unknown;
  error: boolean;
  message: string;
};

export const fnWrapper = (input: Result | Promise<Result>) => async () => {
  const res = await input;
  return {
    body: res,
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

@Injectable()
export class ErrorHandler {
  async handleError<T>(fn: () => Promise<T>) {
    try {
      return fn();
    } catch (error) {
      if (
        error instanceof QueryFailedError ||
        error instanceof EntityNotFoundError ||
        error instanceof CannotCreateEntityIdMapError
      ) {
        console.log('error', error);
        throw new RSOCException('TYPE_ORM_ERROR');
      } else {
        throw new RSOCException(error.message);
      }
    }
  }
}
