import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GetEmployeeInfoResponseDataType } from '../../src/entities/models/employeeInfo';
import { CreateEmployeeInfoType } from '../../src/entities/decoder/employeeInfo.dto';
import { closeTransaction, insertFixture, startTransaction } from '../sequlize';
import { Transaction } from 'sequelize';
import { RoutingModule } from '../../src/interface/loaders/routing.module';

const GET_PATH = '/v1/employee-info/sequelize';
type responseDataType = GetEmployeeInfoResponseDataType;
type postRequestType = CreateEmployeeInfoType;

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
        'department-id': 3,
      },
      { 'employee-id': 2, 'employee-name': '山田花子', 'department-id': 3 },
      { 'employee-id': 3, 'employee-name': '田中花子', 'department-id': 1 },
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
        'department-id': 3,
      },
      { 'employee-id': 2, 'employee-name': '山田花子', 'department-id': 3 },
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

  it('Successfully: create one data', async () => {
    const req: postRequestType[] = [
      {
        'department-id': 1,
        'employee-name': 'ジョン・ドゥー',
      },
    ];
    const res = await request(app.getHttpServer()).post(`${GET_PATH}`).send(req);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual('OK');

    const getRes = await request(app.getHttpServer()).get(GET_PATH);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toHaveLength(4);
    const body = getRes.body as responseDataType[];
    const names = body.map((x) => x['employee-name']);
    expect(names).toEqual(['山田一郎', '山田花子', '田中花子', 'ジョン・ドゥー']);

    body.forEach((x) => {
      if (x['employee-name'] === req[0]['employee-name']) {
        expect(x['department-id']).toBe(req[0]['department-id']);
      }
    });
  });

  it('Successfully: create several data', async () => {
    const req: postRequestType[] = [
      {
        'department-id': 1,
        'employee-name': '高橋花子',
      },
      {
        'department-id': 1,
        'employee-name': '山田次郎',
      },
      {
        'department-id': 2,
        'employee-name': '山田三郎',
      },
    ];

    const res = await request(app.getHttpServer()).post(`${GET_PATH}`).send(req);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual('OK');

    const getRes = await request(app.getHttpServer()).get(GET_PATH);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toHaveLength(7);
    const body = getRes.body as responseDataType[];
    const names = body.map((x) => x['employee-name']);
    expect(names).toEqual(['山田一郎', '山田花子', '田中花子', 'ジョン・ドゥー', '高橋花子', '山田次郎', '山田三郎']);
  });

  it('Error: post department-id as string', async () => {
    const req = [
      {
        'department-id': 'error',
        'employee-name': 'ジョン・ドゥー',
      },
    ];
    const res = await request(app.getHttpServer()).post(`${GET_PATH}`).send(req);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message[0]).toEqual('department-id must be a number conforming to the specified constraints');

    const getRes = await request(app.getHttpServer()).get(GET_PATH);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toHaveLength(7);
  });

  it('Error: missing required property department-id', async () => {
    const req = [
      {
        'employee-name': 'ジョン・ドゥー',
      },
    ];
    const res = await request(app.getHttpServer()).post(`${GET_PATH}`).send(req);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message[0]).toEqual('department-id must be a number conforming to the specified constraints');

    const getRes = await request(app.getHttpServer()).get(GET_PATH);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toHaveLength(7);
  });

  it('Error: missing required property employee-name', async () => {
    const req = [
      {
        'department-id': 1,
      },
    ];
    const res = await request(app.getHttpServer()).post(`${GET_PATH}`).send(req);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message[0]).toEqual('employee-name must be a string');

    const getRes = await request(app.getHttpServer()).get(GET_PATH);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toHaveLength(7);
  });
});
