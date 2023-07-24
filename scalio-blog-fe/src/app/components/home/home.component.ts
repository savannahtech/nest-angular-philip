import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchId!: number;
  loading: boolean = false;
  post!: Post;
  errorMsg: string = '';

  constructor(
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  public numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
  }
  viewPost(data: any) {
    this.searchId = data.searchId;
    this.loading = true;
    this.postService.GetPost(this.searchId).subscribe(post => {
      if (post) {
        const title = post.title;
        const body = post.body;
        this.validatePost(title, body, post)
      }
    }, err => {
      if (err) {
        this.loading = false;
      }
    });
  }

  validatePost(title: string, body: string, post: any) {
    if (title && title !== undefined && body && body !== undefined) {
      this.post = post;
      this.loading = false;
      this.router.navigate([`/post/${this.searchId}`]);
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
