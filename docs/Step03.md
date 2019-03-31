# Step 03
이제 만들어둔 Entity에 값을 저장하는 로직을 만들 것이다.  
일반적인 게시판 형태를 생각하면 된다.  
사용자가 있고 이 사용자는 글을 쓰거나 고치거나 삭제하거니 읽을 수 있다.  
사용자에 대한 비지니스 로직을 담당할 service를 만들고 그 이후에 post의 service를 만들것이다.  

## Service For User  
각 module의 root directory에서 다음의 커맨드를 통해 각각을 위한 service class 생성을 한다.  

```bash
$)pwd
./src/user
nest g service user --flat
```  
이를 통해 user.service를 생성하였다.  
여기서 --flat은 추가적인 directory 생성없이 현재 위치에 service file을 만든다는 의미이다.   
Post역시 위와 마찬가지로 생성한다.  

```typescript
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

```

위의 user service는 User entity를 이용하여 생성시점에 Repository를 만들어낸다.  
여기서 만들어낸 userRepository를 이용하여 DB 접속 및 쿼리 실행을 처리할 것이다.  
우선 해당 service는 3개의 method를 구현하였다.  

- 전체 회원 목록 찾기
- 회원 가입
- 비밀번호 수정

userRepository에서 제공하는 `find`, `save`, `findOne`를 통해 쿼리를 생성하도록 하였다.  
typeOrm의 repository에서 제공하는 method에 대한 자세한 설명은 [이곳](https://github.com/typeorm/typeorm/blob/master/docs/repository-api.md)을 참고하기바란다.  

위의 user에서의 예제처럼 post service 역시 생성자에서 repository를 주입하는 설정 및 4개의 method를 만들 것이다.  

- 글 작성
- 특정 글 정보 불러오기
- 글 삭제
- 전체 글 불러오기

여기서 특이한 사항은 글 삭제이다.  
글 삭제는 기존과 다르게 리턴 타입이 `DeleteResult` 이다.  
`DeleteResult`는 typeorm에서 제공하는 Class이다. 
delete query에 의한 결과를 전달하도록 사용하는 Class이다.  


### References  
- https://github.com/typeorm/typeorm/blob/master/docs/repository-api.md
- https://github.com/lujakob/nestjs-realworld-example-app/blob/master/src/article/article.service.ts

