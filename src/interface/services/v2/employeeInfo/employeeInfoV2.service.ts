import { Response } from "express"

import { Injectable } from "@nestjs/common"
import { fnWrapper, jsonResponseWithErrorHandler } from "../../decorator"

import { GetEmployeeInfoType } from "../../../../entities/decoder/employeeInfo.dto"
import { getEmployeeInfoTypeOrm } from "../../../processes/v2/getEmloyeeInfoTypeOrm.process"
import { getEmployeeInfoSequelize } from "../../../processes/v2/getEmloyeeInfoSequelize.process"

type GetRequestType = GetEmployeeInfoType

@Injectable()
export class EmployeeInfoServiceV2 {
  getEmployeeInfoServiceTypeOrm = async (res: Response, input: GetRequestType) =>
    jsonResponseWithErrorHandler(res, fnWrapper(getEmployeeInfoTypeOrm(input)))

  getEmployeeInfoServiceSequelize = async (res: Response, input: GetRequestType) =>
    jsonResponseWithErrorHandler(res, fnWrapper(getEmployeeInfoSequelize(input)))
}
