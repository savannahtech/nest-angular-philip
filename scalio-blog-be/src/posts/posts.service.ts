import { CreatePostDto } from './dto/createPost.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostsRepository } from './posts.repository';
import Post from './post.entity';

@Injectable()
export class PostsService {
    constructor(
        private readonly postsRepository: PostsRepository
    ) {}

    async createPost(post: CreatePostDto) {
        // conditions to fetch additional details goes here
        const newPost = await this.postsRepository.createPost(post);
        return newPost;
    }

    async getPostById(postId: string): Promise<any> {
        const post: any = await this.postsRepository.getPostById(Number(postId));
        if (!post) {
            throw new NotFoundException (`Post with ID ${postId} not found`);
        }
        return post;
    }

    async getAllPosts(): Promise<any> {
        const posts: any[] = await this.postsRepository.getAllPosts();
        if (posts.length > 0) {
            return posts;
        }
        return [];
    }

    async updatePost(id: number, post: UpdatePostDto): Promise<Post> {
        // conditions before post update goes here
        const updatedPost = await this.postsRepository.updatePost(id, post);
        return updatedPost;
    }

    async deletePost(id: number) {
        // conditions before delete goes here
        return await this.postsRepository.deletePost(id);
    }

}
