import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async join(): Promise<User> {
    const user = new User();
    user.userId = "jays";
    user.password = "1234"; // apply encryption later

    await this.userRepository.save(user);

    return user;
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({userId: userId});
    return user;
  }

  async modifyPassword(userId: string, new_password: string): Promise<User> {
    let user = await this.userRepository.findOne({userId: userId});
    user.password = new_password;
    await this.userRepository.save(user);

    return user;
  }

}
