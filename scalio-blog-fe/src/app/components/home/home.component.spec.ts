import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PostComponent } from 'src/app/modules/post/post.component';
import { PostService } from 'src/app/services/post/post.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let testBedService: PostService;
  let componentService: PostService;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

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
        ReactiveFormsModule, FormsModule],
      declarations: [ HomeComponent ],
      providers: [
       { provide: PostService, useClass: MockPostService },
       { provide: Router, useValue: routerSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testBedService = TestBed.inject(PostService);
    componentService = fixture.debugElement.injector.get(PostService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([PostService], (injectService: PostService) => {
        expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be an instance of MockPostService', () => {
      expect(componentService instanceof MockPostService).toBeTruthy();
  });

  it('#viewPost, fetch post via componentService and route to view post', (done) => {
    const result = {
      id: 2,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      userId: 1
    }

    component.viewPost({ searchId: 2});
    expect(component.searchId).toEqual(2);
    component.validatePost(result.title, result.body, result);
    expect(component.post).toEqual(result);
    expect(component.loading).toEqual(false);
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/post/2']);
    done();
  });
});


