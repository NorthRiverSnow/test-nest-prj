import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class GetEmployeeInfoType {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  "department-id": number | undefined
}

export class CreateEmployeeInfoType {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  "department-id": number

  @ApiProperty()
  @IsString()
  "employee-name": string
}
