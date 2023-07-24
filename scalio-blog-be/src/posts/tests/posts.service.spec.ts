import { BadRequestException, HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostsRepository } from '../posts.repository';
import { PostsService } from '../posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let repository: PostsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, PostsRepository],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<PostsRepository>(PostsRepository);
  });

  describe('Create Post', () => {
    it('should create the Post and return Data for the input', async () => {
      const post = {
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\n' +
          'suscipit recusandae consequuntur expedita et cum\n' +
          'reprehenderit molestiae ut ut quas totam\n' +
          'nostrum rerum est autem sunt rem eveniet architecto',
        userId: 1
      }
      
      const result = {
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\n' +
          'suscipit recusandae consequuntur expedita et cum\n' +
          'reprehenderit molestiae ut ut quas totam\n' +
          'nostrum rerum est autem sunt rem eveniet architecto',
        userId: 1,
        createdAt: new Date('2022-02-03T02:21:14.161Z'),
        updatedAt: new Date('2022-02-03T02:21:14.000Z')
      }

      jest.spyOn(repository, 'createPost').mockResolvedValue(result);
      expect(await service.createPost(post)).toBe(result);

    });

    it('should throw InternalServerErrorException exception when the repository throws the same', async () => {
      
      const post = {
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\n' +
          'suscipit recusandae consequuntur expedita et cum\n' +
          'reprehenderit molestiae ut ut quas totam\n' +
          'nostrum rerum est autem sunt rem eveniet architecto',
        userId: 1
      }

      jest.spyOn(repository, 'createPost').mockRejectedValueOnce(new BadRequestException);
      await expect(service.createPost(post)).rejects.toThrowError(BadRequestException)
    }) 
  })

  describe('Get Post By Id', () => {
    it('should be return Data for the Requested ID', async () => {
      const requestId = '1';

      const result = {
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\n' +
          'suscipit recusandae consequuntur expedita et cum\n' +
          'reprehenderit molestiae ut ut quas totam\n' +
          'nostrum rerum est autem sunt rem eveniet architecto',
        userId: 1,
        createdAt: new Date('2022-02-03T02:21:14.161Z'),
        updatedAt: new Date('2022-02-03T02:21:14.000Z')
      }

      jest.spyOn(repository, 'getPostById').mockResolvedValue(result);
      expect(await service.getPostById(requestId)).toBe(result);

    });

    it('should throw NOTFOUND exception when wrong ID is requested', async () => {
      const requestId = '1';

      jest.spyOn(repository, 'getPostById').mockResolvedValue(undefined);
      await expect(service.getPostById(requestId)).rejects.toThrowError(new NotFoundException(`Post with ID ${requestId} not found`))
    }) 
  })

  describe('Get All Posts', () => {
    it('should return all Posts found', async () => {
      const result = [{
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\n' +
          'suscipit recusandae consequuntur expedita et cum\n' +
          'reprehenderit molestiae ut ut quas totam\n' +
          'nostrum rerum est autem sunt rem eveniet architecto',
        userId: 1,
        createdAt: new Date('2022-02-03T02:21:14.161Z'),
        updatedAt: new Date('2022-02-03T02:21:14.000Z')
      }];

      jest.spyOn(repository, 'getAllPosts').mockResolvedValue(result);
      expect(await service.getAllPosts()).toBe(result);
    })

    it('should return empty array if no Posts was found', async () => {
      const result = [];

      jest.spyOn(repository, 'getAllPosts').mockResolvedValue(result);
      expect(await service.getAllPosts()).toStrictEqual([]);
    })

    it('should throw a INTERNAL SERVER ERROR when repository throws any error', async () => {
      jest.spyOn(repository, 'getAllPosts')
          .mockRejectedValueOnce(new InternalServerErrorException);
      
      await expect(service.getAllPosts())
          .rejects.toThrowError(InternalServerErrorException);
    });

  })

  describe('Update Posts', () => {
    it('should return the Updated Post', async () => {
      const post = {
        title: 'sunt aut facere repellat provident',
        body: 'quia et suscipit\n' +
          'suscipit recusandae consequuntur expedita et cum\n' +
          'reprehenderit molestiae ut ut quas totam\n' +
          'nostrum rerum est autem sunt rem eveniet architecto',
        userId: 1,
      };

      const result = {
        id: 1,
        title: 'sunt aut facere repellat provident',
        body: 'quia et suscipit\n' +
          'suscipit recusandae consequuntur expedita et cum\n' +
          'reprehenderit molestiae ut ut quas totam\n' +
          'nostrum rerum est autem sunt rem eveniet architecto',
        userId: 1,
        createdAt: new Date('2022-02-03T02:21:14.161Z'),
        updatedAt: new Date('2022-02-03T02:21:14.000Z')
      };

      jest.spyOn(repository, 'updatePost').mockResolvedValue(result);
      expect(await service.updatePost(1, post)).toBe(result);
    })

    it('should throw NOTFOUND exception when wrong ID is requested', async () => {
      const post = {
        title: 'sunt aut facere repellat provident',
        body: 'quia et suscipit\n' +
          'suscipit recusandae consequuntur expedita et cum\n' +
          'reprehenderit molestiae ut ut quas totam\n' +
          'nostrum rerum est autem sunt rem eveniet architecto',
        userId: 1,
      };

      jest.spyOn(repository, 'updatePost').mockRejectedValueOnce(new NotFoundException(`Post with ID 1 not found`));
      await expect(service.updatePost(1, post)).rejects.toThrowError(new NotFoundException(`Post with ID 1 not found`))
    })

    it('should throw a BadRequestException ERROR when repository throws any error', async () => {
      const post = {
        title: 'sunt aut facere repellat provident',
        body: 'quia et suscipit\n' +
          'suscipit recusandae consequuntur expedita et cum\n' +
          'reprehenderit molestiae ut ut quas totam\n' +
          'nostrum rerum est autem sunt rem eveniet architecto',
        userId: 1,
      };
      
      jest.spyOn(repository, 'updatePost')
          .mockRejectedValueOnce(new BadRequestException);
      
      await expect(service.updatePost(1, post))
          .rejects.toThrowError(BadRequestException);
    });

  })
  
  describe('Delete Post by ID', () => {
    it('should throw NOTFOUND exception when wrong ID is requested', async () => {
      jest.spyOn(repository, 'deletePost').mockRejectedValueOnce(new NotFoundException(`Post with ID 1 not found`));
      await expect(service.deletePost(1)).rejects.toThrowError(new NotFoundException(`Post with ID 1 not found`))
    })

    it('should throw a INTERNAL SERVER ERROR when repository throws any error', async () => {
      jest.spyOn(repository, 'deletePost')
          .mockRejectedValueOnce(new InternalServerErrorException);
      
      await expect(service.deletePost(1))
          .rejects.toThrowError(InternalServerErrorException);
    });

  })
});
