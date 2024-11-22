import * as fs from "fs"
import * as path from "path"

import { GetEmployeeInfoType } from "../../../entities/decoder/employeeInfo.dto"
import { GetEmployeeInfoResponsTypeV2, GetEmployeeInfoResponseDataTypeV2 } from "../../../entities/models/employeeInfo"
import { sequelize, wrapInTransaction } from "../../../infrastracture/orm/Seaquelize"
import { QueryTypes, Transaction } from "sequelize"

type requestType = GetEmployeeInfoType
type responseType = GetEmployeeInfoResponsTypeV2
type responseDataType = GetEmployeeInfoResponseDataTypeV2

const QUERY = fs.readFileSync(path.resolve(__dirname, "sql/getEmployeeInfo.sql"), {
  encoding: "utf-8",
  flag: "r",
})
const getDatabaseData = async (input: requestType, transaction: Transaction): Promise<responseDataType[]> => {
  const query =
    input["department-id"] === undefined
      ? QUERY.replace("%departmentIdFileter%", "true")
      : QUERY.replace("%departmentIdFileter%", "e.department_id = :departmentId")
  return sequelize.query<responseDataType>(query, {
    replacements: {
      departmentId: input["department-id"],
    },
    raw: true,
    type: QueryTypes.SELECT,
    transaction,
  })
}

const getData = async (input: requestType): Promise<responseType> => {
  const data = await wrapInTransaction((t) => getDatabaseData(input, t))
  return {
    code: 200,
    body: data,
  }
}

export const getEmployeeInfoSequelize = getData
