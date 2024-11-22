import { ApiProperty } from "@nestjs/swagger"

export class GetEmployeeInfoResponseDataType {
  @ApiProperty()
  "employee-id": number

  @ApiProperty()
  "employee-name": string

  @ApiProperty()
  "department-id": number
}

export class GetEmployeeInfoResponseDataTypeV2 {
  @ApiProperty()
  "employee-id": number

  @ApiProperty()
  "employee-name": string

  @ApiProperty()
  "department-name": string
}

export type EmployeeInfoDatabaseType = {
  EMPLOYEE_ID: number
  EMPLOYEE_NAME: string
  DEPARTMENT_ID: number
}

export type GetEmployeeInfoResponsType = {
  code: number
  body: GetEmployeeInfoResponseDataType[] | string
}

export type GetEmployeeInfoResponsTypeV2 = {
  code: number
  body: GetEmployeeInfoResponseDataTypeV2[] | string
}

export type CreateEmployeeInfoResponsType = {
  code: number
  body: string
}
