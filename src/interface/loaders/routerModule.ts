import { RouterModule } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmployeeInfoModule } from './employeeInfo.module';

export const routerModule = RouterModule.register([
  {
    path: 'v1', // v1のバージョンプレフィックス
    children: [
      {
        path: '/',
        module: AppModule,
      },
      {
        path: 'employee-info',
        module: EmployeeInfoModule,
      },
    ],
  },
]);
