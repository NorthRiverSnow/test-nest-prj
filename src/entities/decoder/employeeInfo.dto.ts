import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetEmployeeInfoType {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  'department-id': number | undefined;
}

export class CreateEmployeeInfoType {
  @Type(() => Number)
  @IsNumber()
  'department-id': number;

  @IsString()
  'employee-name': string;
}
