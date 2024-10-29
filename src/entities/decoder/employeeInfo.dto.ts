import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class GetEmployeeInfoType {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  'department-id': number | undefined;
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  'date-time': Date | undefined;
}
