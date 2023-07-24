import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';

import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'src/app/components/home/home.component';
import { PostService } from 'src/app/services/post/post.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let testBedService: PostService;

  let ActivatedRouteSpy = {
    snapshot: {
      paramMap: convertToParamMap({
        some: 'some',
        else: 'else',
      })
    },
    queryParamMap: of(
      convertToParamMap({
        some: 'some',
        else: 'else',
      })
    )
  };

  let RouterSpy = { navigate: jasmine.createSpy('navigate') };

  class MockPostService {
    GetPost(id: number) {
      return of({
        id,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        userId: 1
      });
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: "home", component: HomeComponent },
          {
            path: '',
            children: [
              {
                path: "",
                redirectTo: "/home",
                pathMatch: "full"
              },
              {
                path: 'post/:id',
                component: PostComponent
              }
            ]
          },
        ]),
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [ PostComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteSpy    },
        { provide: Router, useValue: RouterSpy            },
        { provide: PostService, useClass: MockPostService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedService = TestBed.inject(PostService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#GetPost, fetch post via PostService', (done) => {
    const result = {
      id: 2,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      userId: 1
    }

    component.getPost();
    expect(component.id).toBeNull(false);
    component.validatePost(result.title, result.body, result);
    expect(component.post).toEqual(result);
    expect(component.loading).toEqual(false);
    done();
  });

});
