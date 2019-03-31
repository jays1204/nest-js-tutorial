# Step02  
이번 스텝에서는 도메인을 정의하고 DB 커넥션을 만들것이다. 

## Domain 정의
Domain을 정의해야 한다.  
Domain 정의 및 DB 사용을 위해 TypeOrm을 사용할 것이다.  
아래 커맨드를 통해 typeorm과 mysql library를 설치한다.

```bash
$) npm install --save @nestjs/typeorm typeorm mysql2
```

mysql이 설치되지 않앗다면 sqlite3를 사용해도 된다. 

### 모델 정의  

```typescript
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15, unique: true })
  userId: string;

  @Column({ length: 100 }) 
  password: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
```
사용자는 pk 정보와 사용자마다의 고유한 id, 그리고 password 정보와 생성일시와 업데이트 일시를 기본으로 갖는다.   

```typescript
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  title: string;

  @Column({length: 300 })
  contents: string;

  @Column({default: 0})
  viewCount: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
```

게시물은 pkid, 제목, 내용과 조회수, 그리고 생성일시, 수정일시를 갖는다. 
각 칼럼마다 사용된 데코레이터의 의미는 [링크](https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md)를 참고하기 바란다. 

각 model은 src/user/user.entity.ts, src/post/post.entity.ts로 작성되었다.  
이제 이 entity 정보를 module에 등록한다.  

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ User ])],
})
export class UserModule {}

```

user.module.ts의 내용이다. TypeOrm entity로 정의된 User를 사용하기 위해 imports에 해당 Entity를 포함시킨다.   
`forFeature()` method는 Repository를 등록하기 위해 사용된다.  
즉 User Entity에 대한 Repository를 모듈이 생성될 것이고 이를 가져다 쓴다는 의미이다.  

Photo Entity역시 위와 같이 photo module에 정의된다.



## DB Connection 정의(2-1)
DB Connection은 root module에서 관리한다.  

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'devteam',
          password: '1234',
          database: 'freeboard',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        })
    UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```  

위와 같이 root module에 추가적인 imports가 생긴다.  
바로 DB 접속을 위한 설정이다.  
MYSQL에는 미리 deveteam 사용자와 freeboard 라는 DB를 만들어 두었다.  



## Relation 설정 추가(기타)
User는 여러개의 게시물을 작성할 수 있다. 즉 User-Post는 1:N 관계이다.  
이런 관계를 표현하기 위해 ManyToOne, OneToMany 등을 지원한다.  
이 예제에서는 Post의 작성자를 찾는 것이 중요하므로 Post Entity에 ManyToOne 관계를 설정할 것이다.  
또한 Post에서 User 관계만을 찾는 undirectional mapping을 설정할 것이다.  

```typescript
@ManyToOne(type => User)
@JoinColumn({
	name: "user",
	referencedColumnName: "id"
})
user: User;
```  

위와 같은 칼럼 설정이 Post Entity에 추가되었다. 이로서 Post는 작성자 정보를 갖게 된다.  





### References
- https://github.com/lujakob/nestjs-realworld-example-app
- https://docs.nestjs.com/techniques/database
- https://typeorm.io/
- https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md