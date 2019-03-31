import { User } from './user.entity';

export interface UserDto {
  readonly userId: string;
  readonly password: string;
}

export interface UserResponse {
  user: User;
}
