import { Controller, Get, Post, Put, Param, Delete, Body } from '@nestjs/common';
import { PostService } from '../post/post.service';
import { PostDto, PostResponse } from '../post/post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll(): Promise<PostResponse[]> {
    const list = await this.postService.findAll();
    const whois = await list[0].user;
    console.info('whois', whois);

    return list.map((item) => {
      return { post: item };
    });
  }

  @Post()
  async write(@Body() postItem: PostDto): Promise<PostResponse> {
    //TBD
    return;
  }

  @Get("/:post_id")
  async getItem(@Param('post_id') post_id): Promise<PostResponse> {
    const item = await this.postService.read(post_id);
    return { post: item};
  }

  @Delete("/:post_id")
  async deleteItem(@Param('post_id') post_id): Promise<null> {
    await this.postService.deletePost(post_id);
    return null;
  }

}
