import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/common';
import { UserSchema } from './model/user.schema';
import { UserRepository } from './user.repository';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: "User", schema: UserSchema }]),
    CompanyModule
  ],

  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule { }
