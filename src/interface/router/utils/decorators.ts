import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiBearerAuth, ApiResponseOptions } from '@nestjs/swagger';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'datetimeValidator', async: false })
export class DatetimeValidator implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: string, _args: ValidationArguments) {
    const date = new Date(value);
    return isNaN(date.getTime()) === true ? false : true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should be Date!`;
  }
}

export function ApiCommonCreateHeaderAndResponses(okResponse?: ApiResponseOptions) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token',
      required: true,
    }),
    ApiResponse(okResponse || { status: 201, description: 'OK' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 409, description: 'Conflict' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function ApiCommonGetHeaderAndResponses(okResponse: ApiResponseOptions) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token',
      required: true,
    }),
    ApiResponse(okResponse),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function ApiCommonDeleteHeaderAndResponses(okResponse?: ApiResponseOptions) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token',
      required: true,
    }),
    ApiResponse(okResponse || { status: 200, description: 'OK' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function ApiCommonUpdateHeaderAndResponses(okResponse?: ApiResponseOptions) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token',
      required: true,
    }),
    ApiResponse(okResponse || { status: 200, description: 'OK' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
