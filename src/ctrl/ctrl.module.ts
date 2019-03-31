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
