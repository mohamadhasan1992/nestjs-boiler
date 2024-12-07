import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, environmentConfig, LoggerModule, ThrottlerConfig } from './common';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventListeners } from './listener';
import { QueueModule } from './queue';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(environmentConfig),
    ThrottlerModule.forRoot(ThrottlerConfig),
    DatabaseModule,
    EventEmitterModule.forRoot(),
    LoggerModule,
    UserModule,
    CompanyModule,
    QueueModule
  ],
  controllers: [AppController],
  providers: [...EventListeners],
})
export class AppModule { }
