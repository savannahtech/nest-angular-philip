import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  loading: boolean = true;
  post!: Post;
  searchId: any;
  errorBool: boolean = false;
  errorMsg: string = '';
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  goBackHome() {
    this.router.navigate(["/home"]);
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get("id");

    if (id !== null) {
      this.id = +id;
      this.postService.GetPost(this.id).subscribe(post => {
        if (post) {
          const title = post.title;
          const body = post.body;
          this.validatePost(title, body, post)
        }
      }, err => {
        if (err) {
          this.loading = false;
          this.router.navigate(["/home"]);
        }
      });
      } else {
      this.router.navigate(["/home"]);
    }
  }

  validatePost(title: string, body: string, post: any) {
    if (title && title !== undefined && body && body !== undefined) {
      this.post = post;
      this.loading = false;
    } else {
      this.loading = false;
      this.errorMsg = this.getErrorMsgForInvalidPost(title, body)
      Swal.fire({
        icon: 'error',
        color: '#00657b',
        confirmButtonText: 'OK',
        confirmButtonColor: '#00657b',
        title: 'Invalid Post Result',
        text: this.errorMsg,
      })
    }
  }

  getErrorMsgForInvalidPost(title: string, body: string): string {
    let errMsg = (!title || title === '') && (!body || body === '') ? 'Post title & body is missing'
                                      : title && (!body || body === '') ?  'Post body is missing.'
                                      : (!title || title === '') && body ? 'Post title is missing' : '';

    return errMsg;
  }
}
