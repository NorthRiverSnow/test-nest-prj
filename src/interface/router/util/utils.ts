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

