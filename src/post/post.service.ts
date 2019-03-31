import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../user/user.entity';
import { PostDto } from './post.interface';

@Injectable()
export class PostService {
  constructor(
  @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  @InjectRepository(User)  
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<Post[]> {
    const list = await this.postRepository.find();
    return list;
  }

  async write(postItem: PostDto): Promise<Post> {
    const author = await this.userRepository.findOne({userId: 'jays'});
    const post = new Post();
    post.title = postItem.title;
    post.contents = postItem.contents;
    post.user = Promise.resolve(author);

    await this.postRepository.save(post);

    return post;
  }

  async read(post_id: number): Promise<Post> {
    const postItem = await this.postRepository.findOne({id: post_id});
    return postItem;
  }

  async deletePost(post_id: number): Promise<DeleteResult> {
    return await this.postRepository.delete(post_id);
  }

}
