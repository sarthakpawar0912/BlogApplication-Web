import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-all',
  standalone: false,
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {

  allPosts: any[] = [];
  commentForm: FormGroup;
  selectedPostId: number | null = null;  // ✅ Track selected post for showing comments

  constructor(
    private postService: PostService, 
    private snackBar: MatSnackBar, 
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3)]],
      postedBy: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        console.log('Fetched Posts:', res);
        this.allPosts = res;
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
        this.snackBar.open('Something went wrong. Please try again!', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  // ✅ Toggle comment box for a post
  toggleCommentBox(postId: number): void {
    this.selectedPostId = this.selectedPostId === postId ? null : postId;
  }

  // ✅ Submit comment
  submitComment(postId: number): void {
    if (this.commentForm.invalid) {
      return;
    }

    const commentData = {
      postId: postId,
      content: this.commentForm.value.content,
      postedBy: this.commentForm.value.postedBy,
      date: new Date()
    };

    console.log('Comment Submitted:', commentData);

    this.snackBar.open('Comment posted successfully!', 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });

    this.commentForm.reset();
  }
}
