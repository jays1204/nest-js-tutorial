import { Controller, Get, Post, Put, Param } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<any> {
    const userList = await this.userService.findAll();
    return userList;
  }
  
  @Post()
  async joinMember(): Promise<any> {
    const joinedUser = await this.userService.join();
    return joinedUser;
  }

  @Get("/:user_id")
  async getUser(@Param('user_id') user_id): Promise<any> {
    const user = await this.userService.getUser(user_id);
    return user;
  }

  @Put("/:user_id")
  async editPassword(@Param('user_id') user_id): Promise<any> {
    const result = await this.userService.modifyPassword(user_id, '5678');
    return result;
  }
}
