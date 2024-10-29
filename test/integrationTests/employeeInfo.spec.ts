import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { closeTransaction, insertFixture, startTransaction } from '../typeOrm';
import { EmployeeInfoModule } from '../../src/interface/loaders/employeeInfo.module';
import { getEmployeeInfoResponseDataType } from '../../src/entities/models/employeeInfo';
import { QueryRunner } from 'typeorm';

const GET_PATH = '/employee-info';
type responseDataType = getEmployeeInfoResponseDataType

const startFixture = async (qr: QueryRunner) => {
  await insertFixture(qr, 'insertEmployeeInfo.sql');
};

describe('EmproyeeInfo test', () => {
  let app: INestApplication;

  beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [EmployeeInfoModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();

    await startTransaction(startFixture);
  });

  afterAll(async () => {
    await closeTransaction();
  });

  it('Successfully get data', async () => {
    const result: responseDataType[] = [
      {
        'employee-id': 1,
        'employee-name': 'ジャワード マッハムード',
        'department-id': 3,
      },
      { 'employee-id': 2, 'employee-name': '加藤 有希', 'department-id': 3 },
      { 'employee-id': 3, 'employee-name': '大沼 晶子', 'department-id': 1 },
      { 'employee-id': 10, 'employee-name': '山田 太郎', 'department-id': 1 },
    ];
    const res = await request(app.getHttpServer()).get(GET_PATH);
    expect(res.body).toHaveLength(4);
    expect(res.body).toEqual(result);
  });

  it('Successfully: get data filtered by department-id', async () => {
    const result: responseDataType[] = [
      {
        'employee-id': 1,
        'employee-name': 'ジャワード マッハムード',
        'department-id': 3,
      },
      { 'employee-id': 2, 'employee-name': '加藤 有希', 'department-id': 3 },
    ];
    const res = await request(app.getHttpServer()).get(`${GET_PATH}?department-id=3`);
    expect(res.body).toHaveLength(2);
    expect(res.body).toEqual(result);
  });
});
