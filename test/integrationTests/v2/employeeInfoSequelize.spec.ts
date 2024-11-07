import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GetEmployeeInfoResponseDataTypeV2 } from '../../../src/entities/models/employeeInfo';
import { closeTransaction, insertFixture, startTransaction } from '../../sequlize';
import { Transaction } from 'sequelize';
import { RoutingModule } from '../../../src/interface/loaders/routing.module';

const GET_PATH = '/v2/employee-info/sequelize';
type responseDataType = GetEmployeeInfoResponseDataTypeV2;

const startFixture = async (t: Transaction) => {
  await insertFixture('insertEmployeeInfo.sql', t);
};

describe('EmproyeeInfo test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RoutingModule],
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
        'employee-name': '山田一郎',
        'department-name': '技術部',
      },
      { 'employee-id': 2, 'employee-name': '山田花子', 'department-name': '技術部' },
      { 'employee-id': 3, 'employee-name': '田中花子', 'department-name': '総務部' },
    ];
    const res = await request(app.getHttpServer()).get(GET_PATH);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(3);
    expect(res.body).toEqual(result);
  });

  it('Successfully: get data filtered by department-id', async () => {
    const result: responseDataType[] = [
      {
        'employee-id': 1,
        'employee-name': '山田一郎',
        'department-name': '技術部',
      },
      { 'employee-id': 2, 'employee-name': '山田花子', 'department-name': '技術部' },
    ];
    const res = await request(app.getHttpServer()).get(`${GET_PATH}?department-id=3`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body).toEqual(result);
  });

  it('Error: set wrong type into department-id', async () => {
    const res = await request(app.getHttpServer()).get(encodeURIComponent(`${GET_PATH}?department-id=あいうえお`));
    expect(res.statusCode).toBe(400);
  });
});
