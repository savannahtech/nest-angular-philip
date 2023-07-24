import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostService } from './post.service';
import { BaseService } from '../base.service';
import { Post } from 'src/app/models/post';

describe('PostService', () => {
  let service: PostService;
  let baseService: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService, BaseService],
    });

    service = TestBed.inject(PostService);
    baseService = TestBed.inject(BaseService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#GetPosts should return Posts: Post[]', fakeAsync((done: DoneFn) => {
    const spyOnMethod = spyOn(baseService, 'Get').and.callThrough();

    const expectedData: Post[] = [
      {
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        userId: 1
      },
      {
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        userId: 1
      },
      {
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
        userId: 1
      },
      {
        id: 4,
        title: "eum et est occaecati",
        body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
        userId: 1
      }
    ];

    service.GetPosts().subscribe(data => {
      expect(spyOnMethod).toHaveBeenCalled();
      expect(data).toEqual(expectedData);
      done()
    });
  }));

  it('#GetPost by ID should return the requested Post', fakeAsync((done: DoneFn) => {
    const spyOnMethod = spyOn(baseService, 'Get').and.callThrough();

    const expectedData: Post = {
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      userId: 1
    };

    service.GetPost(1).subscribe(data => {
      expect(spyOnMethod).toHaveBeenCalled();
      expect(data).toEqual(expectedData)
      done();
    });
  }));

  it('#CreatePost should return the created Post', fakeAsync((done: DoneFn) => {
    const spyOnMethod = spyOn(baseService, 'Post').and.callThrough();

    const inputData: Post = {
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      userId: 1
    };

    const expectedData: Post = {
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      userId: 1
    };

    service.CreatePost(inputData).subscribe(data => {
      expect(spyOnMethod).toHaveBeenCalled();
      expect(data).toEqual(expectedData)
      done();
    });
  }));

  it('#UpdatePost should return the updated Post', fakeAsync((done: DoneFn) => {
    const spyOnMethod = spyOn(baseService, 'Update').and.callThrough();

    const inputData: Post = {
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      userId: 1
    };

    const expectedData: Post = {
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      userId: 1
    };

    service.UpdatePost(1, inputData).subscribe(data => {
      expect(spyOnMethod).toHaveBeenCalled();
      expect(data).toEqual(expectedData)
      done();
    });
  }));

  it('#DeletePost should delete the Post', fakeAsync((done: DoneFn) => {
    const spyOnMethod = spyOn(baseService, 'Delete').and.callThrough();
    service.deletePost(1).subscribe(data => {
      expect(spyOnMethod).toHaveBeenCalled();
      done();
    });
  }));
});


