import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
  @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  async findAll(): Promise<Post[]> {
    const list = await this.postRepository.find();
    return list;
  }

  async write(author: User): Promise<Post> {
    const post = new Post();
    post.title = "don't do that youngsu!";
    post.contents = "said by hose?";
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
