import { Case } from './case/entities/case.entity';
import { User } from './user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseModule } from './case/case.module';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { Organization } from './organization/entities/organization.entity';

@Module({
  imports: [
    CaseModule,
    OrganizationModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'crmforpeopledb',
      entities: [Case, Organization, User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
