import { RouterModule } from '@nestjs/core';
import { AppModule } from './v1/app.module';
import { EmployeeInfoModule } from './v1/employeeInfo.module';
import { EmployeeInfoModuleV2 } from './v2/employeeInfoV2.module';
import { AppModuleV2 } from './v2/appV2.module';

export const routerModule = RouterModule.register([
  {
    path: 'v1',
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
  {
    path: 'v2',
    children: [
      {
        path: '/',
        module: AppModuleV2,
      },
      {
        path: 'employee-info',
        module: EmployeeInfoModuleV2,
      },
    ],
  },
]);
