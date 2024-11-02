INSERT INTO m_department (DEPARTMENT_ID, DEPARTMENT_NAME) VALUES
  (1, '総務部'),
  (2, '営業部'),
  (3, '技術部');
-- $break$
INSERT INTO m_employee (EMPLOYEE_ID, EMPLOYEE_NAME, DEPARTMENT_ID) VALUES
  (1, "山田一郎", 3),
  (2, "山田花子", 3),
  (3, "田中花子", 1);
