import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { User } from '../user/user.entity';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Post, User ])],
  exports: [ PostService ],
  providers: [PostService],
})
export class PostModule {}
