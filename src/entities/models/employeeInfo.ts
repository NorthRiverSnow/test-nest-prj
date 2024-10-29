export type getEmployeeInfoResponseDataType = {
  'employee-id': number;
  'employee-name': string;
  'department-id': number;
};

export type getEmployeeInfoDatabaseType = {
  EMPLOYEE_ID: number;
  EMPLOYEE_NAME: string;
  DEPARTMENT_ID: number;
};

export type getEmployeeInfoResponsType = {
  code: number;
  body: getEmployeeInfoResponseDataType[] | string;
};
