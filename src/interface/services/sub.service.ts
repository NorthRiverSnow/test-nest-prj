import { Injectable } from '@nestjs/common';
import { errorHandler, fnWrapper, TypeOrmTransaction } from './decorator';
import { subResponsType } from 'src/entities/models/sub';

type responseType = subResponsType;
// type responseDataType = subResponseDataType;

@Injectable()
export class SubService {
  constructor(private typeOrmTransaction: TypeOrmTransaction) {}

  // private getService = async (name: string): Promise<responseType> => {
  //   console.log(name);
  //   const data = await this.typeOrmTransaction.wrapInTransaction<
  //     responseDataType[]
  //   >((qr) => qr.query('select * from t_test'));
  //   return {
  //     code: HttpStatus.OK,
  //     body: data,
  //   };
  // };

  private getService = async (name: string): Promise<responseType> => {
    return { value: [name], error: false, message: 'OK' };
  };
  getTest = async (name: string) =>
    errorHandler(fnWrapper(this.getService(name)));
}
