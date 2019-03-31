import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CtrlModule } from './ctrl/ctrl.module';


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
        }),
    UserModule, PostModule, CtrlModule ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
