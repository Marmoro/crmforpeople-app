import { Case } from './case/entities/case.entity';
import { User } from './user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseModule } from './case/case.module';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { Organization } from './organization/entities/organization.entity';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CaseModule,
    OrganizationModule,
    UserModule,
    PassportModule.register({
      defaultStrategy: 'local',
      session: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Case, Organization, User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
