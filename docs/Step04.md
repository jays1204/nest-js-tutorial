# Step 04 
이전까지 만든 로직을 HTTP API를 통해 호출하는 작업을 진행한다.  

## 회원 처리 API
controlelr를 추가하기 위해 다음의 커맨드를 이용한다.  
참고로 이 커맨드는 src 디렉토리에서 실행한다.  
이는 여러 controller를 한곳에 모아 관리하기 위함이다.  

```bash
$) nest g module ctrl
$) cd ctrl
$) nest g controller users --flat
$) nest g controller posts --flat
``` 

ctrl 모듈은 HTTP API를 담당하는 모듈로 사용될 것이다.  
이를 위해선 기존에 만들어둔 user, post module의 기능을 가져다 쓸 수 있어야 한다.  
이를 위해 user, post module에서 exports에 각 service를 추가하였다.  

```typescript
@Module({
 imports: [TypeOrmModule.forFeature([ User ])],
 exports: [ UserService ],
 providers: [UserService], // 이곳이 추가되었다.
})
export class UserModule {}
```  

post module역시 위와 마찬가지로 export 를 추가한다.  
그리고 ctrl module에서는 user, post module을 사용하기 위한 import 설정을 추가한다.  

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PostsController } from './posts.controller';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [ UserModule, PostModule ],
  controllers: [UsersController, PostsController]
})
export class CtrlModule {}
```  

이제 user controller 를 작성한다.  

```typescript
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

```

참고로 리턴 타입이 any인 것은 이후 예제를 위해 임시로 작성한 부분이다.  
실제 서비스에서는 any를 사용하지 않기를 권한다.  


위와 같이 작성이 되었다면 아래와 같이 curl을 통해 테스트를 할 수 있다.  

```bash
$) curl -X POST http://localhost:3000/users
{"userId":"jays","password":"1234","id":1,"createdDate":"2019-03-31T09:25:16.620Z","updatedDate":"2019-03-31T09:25:16.620Z"}%
```

회원 가입 API가 성공하였다면 아래의 두 API도 적절한 응답을 줄 것이다.   

- http://localhost:3000/users/jays
- http://localhost:3000/users

위와 같은 코드를 이용하여 Post 관련 API도 아래의 API를 작성한다.  

- 전체 글 목록 불러오기  

글 쓰기는 이후 DTO를 만든 후 처리할 예정이다.  
우선은 DB에 직접 DATA를 insert하여 조회 API를 테스트 한다.  

### 변동 사항  
기본적으로 TypeOrm의 mapping 관계는 lazy loading이다.  
lazy loading된 칼럼은 Promsie 로 구성되어있으므로 해당 값을 알고 싶다면 다음과 같이 불러올 수 있다.  

```typescript
  @Get()
  async getAll(): Promise<any> {
    const list = await this.postService.findAll();
    const whois = await list[0].user;
    console.info('whois', whois);
    return list;
  }
```

또한 lazy loading 칼럼 선언시에는 Promise<type>으로 선언을 해주어야 한다.  