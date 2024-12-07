import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { FilterQuery } from 'mongoose';
import { UserDocument } from './model/user.schema';
import { EventEnum } from 'src/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './event/user.created.event';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2
  ) { }

  async create(createUserDto: BaseUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    this.eventEmitter.emit(EventEnum.USER_CREATED, new UserCreatedEvent(newUser));
    return newUser;
  }

  async findAll(filterQuery: FilterQuery<UserDocument>) {
    return await this.userRepository.find(filterQuery);
  }

  async findOne(filterQuery: FilterQuery<UserDocument>) {
    return await this.userRepository.findOne(filterQuery);
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
