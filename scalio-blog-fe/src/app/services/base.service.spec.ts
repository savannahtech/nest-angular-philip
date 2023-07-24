import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

const API_URL = environment.api.base;
describe('BaseService', () => {
  let httpTestingController: HttpTestingController;
  let service: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseService],

    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BaseService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#Get from the specified endpoint should return an array of data', (done) => {
    const expectedData: any[] = [
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

    service.Get("posts").subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne(`${API_URL}${environment.api.posts}`);

    testRequest.flush(expectedData);
  });


  it('#Get should use GET to retrieve data', () => {
    service.Get("posts").subscribe();

    const testRequest = httpTestingController.expectOne(`${API_URL}${environment.api.posts}`);

    expect(testRequest.request.method).toEqual('GET');
  });

  it('should upload post data to the server', (done) => {

  const inputData: Post = {
    title: "dolorem tempora et accusantium",
    body: "veniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptasconsectetur animi nesciunt iure dolore\n facilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae\n enim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas facilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
    userId: 1,
  }

  const outputData: Post = {
    title: "dolorem tempora et accusantium",
    body: "veniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptasconsectetur animi nesciunt iure dolore\n facilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae\n enim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas facilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
    userId: 1,
    id: 11
  }

    service.Post('posts', inputData).subscribe(data => {
      expect(data).toEqual(outputData);
      done();
    });

    const testRequest = httpTestingController.expectOne(`${API_URL}${environment.api.posts}`);

    testRequest.flush(outputData);
  });

  it('#Post should use POST to upload data', () => {
    const inputData: Post = {
      title: "dolorem tempora",
      body: "veniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptasconsectetur animi nesciunt iure dolore\n facilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae\n enim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas facilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
      userId: 1,
    }
    service.Post("posts", inputData).subscribe();

    const testRequest = httpTestingController.expectOne(`${API_URL}${environment.api.posts}`);

    expect(testRequest.request.method).toEqual('POST');
  });

  it('should update post data to the server', (done) => {

  const inputData: Post = {
    title: "dolorem tempora",
    body: "veniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptasconsectetur animi nesciunt iure dolore\n facilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae\n enim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas facilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
    userId: 1,
  }

  const outputData: Post = {
    title: "dolorem tempora",
    body: "veniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptasconsectetur animi nesciunt iure dolore\n facilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae\n enim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas facilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
    userId: 1,
    id: 11
  }

    service.Update('posts/11', inputData).subscribe(data => {
      expect(data).toEqual(outputData);
      done();
    });

    const testRequest = httpTestingController.expectOne(`${API_URL}${environment.api.posts}/11`);

    testRequest.flush(outputData);
  });

  it('#Update should use PATCH to upload data', () => {
    const inputData: Post = {
      title: "dolorem tempora",
      body: "veniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptasconsectetur animi nesciunt iure dolore\n facilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae\n enim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas facilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
      userId: 1,
    }
    service.Update("posts/11", inputData).subscribe();

    const testRequest = httpTestingController.expectOne(`${API_URL}${environment.api.posts}/11`);

    expect(testRequest.request.method).toEqual('PATCH');
  });

  it('#Delete should use DELETE to delete requested Post by Id', () => {

    service.Delete("posts/11").subscribe();
    const testRequest = httpTestingController.expectOne(`${API_URL}${environment.api.posts}/11`);

    expect(testRequest.request.method).toEqual('DELETE');
  });

});


