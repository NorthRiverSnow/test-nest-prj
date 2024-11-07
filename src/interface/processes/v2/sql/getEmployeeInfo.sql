SELECT 
  e.EMPLOYEE_ID as `employee-id`,
  e.EMPLOYEE_NAME as `employee-name`,
  d.DEPARTMENT_NAME as `department-name`
FROM m_employee e
INNER JOIN m_department d
  ON d.DEPARTMENT_ID = e.DEPARTMENT_ID
WHERE %departmentIdFileter%