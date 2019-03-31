# Step 05 

외부에서 들어오는 데이터에 대한 validation 처리 및 데이터 모델을 위한 DTO를  만드는 단계이다.  

여기서 만드는 DTO는 외부 요청 -> controller, controller -> service 단계에서 사용될 모델이다.  

## Interface 추가

user, post 각 모듈마다 사용할 DTO를 위해 각 module root dir에서 interface를 추가한다.  

```bash
$) nest g interface user
```

user interface에 dto 를 추가한다.  

```typescript
export interface UserDto {
  readonly userId: string;
  readonly password: string;
}

export interface UserResponse {
	user: User;
}
```

이제 이 DTO를 사용하도록 ctrl와 service에 설정한다.   
- controller

```typescript
  @Post()
  async joinMember(@Body() joinUser: UserDto): Promise<UserResponse> {
    const joinedUser = await this.userService.join(joinUser);
    return joinedUser;
  }
```

- service 

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  ....
  
  async join(joinUser: UserDto): Promise<User> {
    const user = new User();
    user.userId = joinUser.userId;
    user.password = joinUser.password; // apply encryption later

    await this.userRepository.save(user);

    return user;
  }
  ....

}

```
controller와 service method에 인자로 UserDto를 사용하게 하였다. 
추가로 controller의 리턴 타입은 더이상 any가 아니라 UserResponse 를 사용하도록 하였다. 

아래 curl을 호출하여 동작이 잘되는지 테스트한다.  

```bash
$) curl -X POST http://localhost:3000/users -d '{"userId": "jays2", "password":"5678"}' -H "Content-Type: application/json"
```