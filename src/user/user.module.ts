import { CookieSerializer } from './cookie.serializer';
import { LocalStrategy } from './local.strategy';
import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, SessionSerializer, CookieSerializer, LocalStrategy],
})
export class UserModule {}
