import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/common';
import { UserSchema } from './model/user.schema';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: "User", schema: UserSchema }])
  ],

  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule { }
