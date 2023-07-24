import { NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { UpdatePostDto } from './dto/updatePost.dto';
import Post from './post.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {

    async createPost(post: any): Promise<any> {
        try {
            const newPost = this.create(post);
            await this.save(newPost);
            return newPost;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getPostById(postId: number): Promise<Post> {
        try {
            const post = await this.findOne({ where: { id: postId } });
            return post;
        } catch (error) {
            throw new NotFoundException(`Post with ID: ${postId}, Not Found`);
        }
    }

    async getAllPosts() {
        try {
            const posts = await this.find();
            return posts;
        } catch (error) {
            throw new InternalServerErrorException;
        }
    }

    async updatePost(id: number, post: UpdatePostDto) {
        try {
            await this.update(id, post);
            const updatedPost = await this.findOne(id);
            if (updatedPost) {
              return updatedPost
            }
            throw new NotFoundException(`Post with ID: ${id}, Not Found`);
        } catch (error) {
            throw new BadRequestException(error.message);;
        }
    }

    async deletePost(id: number) {
        try {
            const deleteResponse = await this.delete(id);
            if (!deleteResponse.affected) {
                throw new NotFoundException(`Post with ID: ${id}, Not Found`);
            }
            return;    
        } catch (error) {
            throw new InternalServerErrorException;
        }
    }

}
