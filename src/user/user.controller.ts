import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterQuery } from 'mongoose';
import { UserDocument } from './model/user.schema';
import { query } from 'express';
import { CompanyService } from 'src/company/company.service';



@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService
  ) { }

  @Get()
  async getUsers(
    @Query() query: FilterQuery<UserDocument>
  ) {
    return await this.userService.findAll(query);
  }


  @Get(":id")
  async getUser(
    @Param("id") id: string
  ) {
    const user = await this.userService.findById(id);
    // find user companies
    const { data: companies } = await this.companyService.findAll({ user: id });
    return {
      user,
      companies
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { user, company } = createUserDto;
    const newUser = await this.userService.create(user);
    const newCompany = await this.companyService.create({ ...company, user: newUser._id.toString() });

    return {
      message: "User created successfully",
      user: newUser,
      company: newCompany
    }
  }

}
