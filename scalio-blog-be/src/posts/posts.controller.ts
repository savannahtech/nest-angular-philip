import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    async getAllPosts(): Promise<any> {
        return await this.postsService.getAllPosts();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    async getPostById(@Param('id') id: string): Promise<any> {
        return await this.postsService.getPostById(id);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async createPost(@Body() post: CreatePostDto): Promise<any> {
      return await this.postsService.createPost(post);
    }
    
    @Patch('/:id')
    async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto): Promise<any> {
      return await this.postsService.updatePost(Number(id), post);
    }
  
    @Delete('/:id')
    async deletePost(@Param('id') id: string): Promise<void> {
      return await this.postsService.deletePost(Number(id));
    }
}
