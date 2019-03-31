import { Post } from './post.entity';

export interface PostDto {
  readonly title: string;
  readonly contents: string;
}

export interface PostResponse {
  post: Post
}
