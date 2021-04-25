import { Case } from './case/entities/case.entity';
import { User } from './user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseModule } from './case/case.module';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { Organization } from './organization/entities/organization.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CaseModule,
    OrganizationModule,
    UserModule,
    PassportModule.register({
      defaultStrategy: 'local',
      session: true,
    }),
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
