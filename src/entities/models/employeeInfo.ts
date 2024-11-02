export type GetEmployeeInfoResponseDataType = {
  'employee-id': number;
  'employee-name': string;
  'department-id': number;
};

export type EmployeeInfoDatabaseType = {
  EMPLOYEE_ID: number;
  EMPLOYEE_NAME: string;
  DEPARTMENT_ID: number;
};

export type GetEmployeeInfoResponsType = {
  code: number;
  body: GetEmployeeInfoResponseDataType[] | string;
};

export type CreateEmployeeInfoResponsType = {
  code: number;
  body: string;
};
