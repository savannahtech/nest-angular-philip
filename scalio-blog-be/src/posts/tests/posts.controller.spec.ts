import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsRepository } from '../posts.repository';
import { PostsService } from '../posts.service';
import { getPostsMockData, PostNotFoundMock } from './post.mock';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: PostsRepository,
          useValue: jest.fn()
        }
      ]
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  describe('Get All Posts', () => {

    it('should return array of data when all post is requested', async () => {
      jest.spyOn(service, 'getAllPosts').mockImplementation(async () => {
        return getPostsMockData;
      });
      expect(await controller.getAllPosts()).toBe(getPostsMockData);
    })


    it('should return empty array if no Posts was found', async () => {
      jest.spyOn(service, 'getAllPosts').mockImplementation(async () => {
        return [];
      });
      expect(await controller.getAllPosts()).toStrictEqual([]);
    })

    it('should throw a INTERNAL SERVER ERROR when service throws any error', async () => {
      jest.spyOn(service, 'getAllPosts')
          .mockImplementation(async () => {
            throw new InternalServerErrorException}
          );
      
      await expect(controller.getAllPosts())
          .rejects.toThrowError(InternalServerErrorException);
    });
  })

  describe('get Post By Id', () => {
    it('should return data when a post is found by it ID', async () => {
      const requestId = '1';

      jest.spyOn(service, 'getPostById').mockImplementation(async () => {
        return Promise.resolve(getPostsMockData[0]);
      });
      expect(await controller.getPostById(requestId)).toBe(getPostsMockData[0]);
    })
    
    it('should return an empty object when no Post is found', async () => {
      const requestId = '1';

      jest.spyOn(service, 'getPostById').mockImplementation(() => {
        return Promise.resolve(PostNotFoundMock);
      });
      expect(await controller.getPostById(requestId)).toBe(PostNotFoundMock);
    })
  })

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

      jest.spyOn(service, 'createPost').mockImplementation(async () => {
        return result
      });
      expect(await controller.createPost(post)).toBe(result);

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

      jest.spyOn(service, 'createPost').mockImplementation(async () => {
        throw new BadRequestException});
      await expect(controller.createPost(post)).rejects.toThrowError(BadRequestException)
    }) 
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

      jest.spyOn(service, 'updatePost').mockResolvedValue(result);
      expect(await controller.updatePost('1', post)).toBe(result);
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

      jest.spyOn(service, 'updatePost').mockImplementation(async () => {
        throw new NotFoundException(`Post with ID 1 not found`);
      });
      await expect(controller.updatePost('1', post)).rejects.toThrowError(new NotFoundException(`Post with ID 1 not found`))
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
      
      jest.spyOn(service, 'updatePost')
      .mockImplementation(async () => {
        throw new BadRequestException;
      });;
      
      await expect(controller.updatePost('1', post))
          .rejects.toThrowError(BadRequestException);
    });

  })

  describe('Delete Post by ID', () => {
    it('should throw NOTFOUND exception when wrong ID is requested', async () => {
      jest.spyOn(service, 'deletePost').mockImplementation(async () => { 
        throw new NotFoundException(`Post with ID 1 not found`)});
      await expect(controller.deletePost('1')).rejects.toThrowError(new NotFoundException(`Post with ID 1 not found`))
    })

    it('should throw a INTERNAL SERVER ERROR when repository throws any error', async () => {
      jest.spyOn(service, 'deletePost')
      .mockImplementation(async () => { 
        throw new InternalServerErrorException});
      
      await expect(controller.deletePost('1'))
          .rejects.toThrowError(InternalServerErrorException);
    });

  })
});
