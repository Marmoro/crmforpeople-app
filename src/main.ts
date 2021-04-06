import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as passport from 'passport';
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CRM For People')
    .setDescription('CRM For People API description')
    .setVersion('1.0')
    .addTag('crmforpeople')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const client = redis.createClient();

  app.use(session({
    store: new RedisStore({ host: 'localhost', port: 6379, client: client, ttl: 999999 }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   secure: true,
    //   httpOnly: true,
    //   maxAge: 5184000000, // 60 days
    // },
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({ credentials: true, origin: true });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
