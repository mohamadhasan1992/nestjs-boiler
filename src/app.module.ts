import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, environmentConfig, ThrottlerConfig } from './common';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventListeners } from './listener';
import { QueueModule } from './queue';

@Module({
  imports: [
    ConfigModule.forRoot(environmentConfig),
    ThrottlerModule.forRoot(ThrottlerConfig),
    DatabaseModule,
    UserModule,
    CompanyModule,
    QueueModule
  ],
  controllers: [AppController],
  providers: [...EventListeners],
})
export class AppModule { }
