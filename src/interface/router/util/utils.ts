import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'datetimeValidator', async: false })
export class DatetimeValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    console.log(args);
    const date = new Date(value);
    return isNaN(date.getTime()) === true ? false : true;
  }

  defaultMessage(args: ValidationArguments) {
    console.log(args);
    return `${args.property} should be Date!`;
  }
}

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

@Injectable()
export class ParseOptionalNumberPipe implements PipeTransform {
  transform(value: string | undefined | null) {
    if (!value) return value;
    const transformedValue = Number(value);
    console.log('pipe', transformedValue);
    if (isNaN(transformedValue)) {
      console.log('error');
      throw new BadRequestException('Invalid Number');
    }
    console.log(transformedValue);
    return transformedValue;
  }
}
