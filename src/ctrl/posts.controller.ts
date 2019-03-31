import { Controller, Get, Post, Put, Param, Delete } from '@nestjs/common';
import { PostService } from '../post/post.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll(): Promise<any> {
    const list = await this.postService.findAll();
    const whois = await list[0].user;
    console.info('whois', whois);
    return list;
  }

  @Post()
  async write(): Promise<any> {
    //TBD
    return;
  }

  @Get("/:post_id")
  async getItem(@Param('post_id') post_id): Promise<any> {
    return await this.postService.read(post_id);
  }

  @Delete("/:post_id")
  async deleteItem(@Param('post_id') post_id): Promise<any> {
    return await this.postService.deletePost(post_id);
  }

}
