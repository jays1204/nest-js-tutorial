import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto, UserResponse } from '../user/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserResponse[]> {
    const userList = await this.userService.findAll();

    return userList.map((user_info) => {
      return {user: user_info};
    });
  }
  
  @Post()
  async joinMember(@Body() joinUser: UserDto): Promise<UserResponse> {
    const joinedUser = await this.userService.join(joinUser);
    return {user: joinedUser};
  }

  @Get("/:user_id")
  async getUser(@Param('user_id') user_id): Promise<UserResponse> {
    const user = await this.userService.getUser(user_id);
    return {user};
  }

  @Put("/:user_id")
  async editPassword(@Param('user_id') user_id): Promise<UserResponse> {
    const result = await this.userService.modifyPassword(user_id, '5678');
    return {user: result};
  }
}
