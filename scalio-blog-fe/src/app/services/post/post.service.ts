import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private baseService: BaseService) {}

  public GetPosts(): Observable<Post[]> {
    return this.baseService.Get(environment.api.posts).pipe(
      map(json => {
        let data = [...json]
        return data.map(e => new Post(e));
      })
    );
  }

  public GetPost(id: number): Observable<Post> {
    return this.baseService.Get(environment.api.posts + "/" + id).pipe(
      map(json => {
        return new Post(json);
      })
    );
  }

  public CreatePost(post: Post): Observable<any> {
    return this.baseService.Post(environment.api.posts, post);
  }
  public UpdatePost(id: number, post: Post): Observable<any> {
    return this.baseService.Update(environment.api.posts + "/" + id, post);
  }

  public deletePost(id: number) {
    return this.baseService.Delete(environment.api.posts + "/" + id);
  }
}
