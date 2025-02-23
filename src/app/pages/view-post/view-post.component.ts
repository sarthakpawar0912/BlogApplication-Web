import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../service/comment.service';

@Component({
  selector: 'app-view-post',
  standalone:false,
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})

export class ViewPostComponent {

  postId!: number;
  commentForm!: FormGroup;
  postData: any;
  comments: any = [];


  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private commentService: CommentService
  ) {}


  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.postId = Number(params['id']);
      if (this.postId) {
        this.getPostById();
        this.commentForm = this.fb.group({
          postedBy: [null, Validators.required],
          content: [null, Validators.required],
        });
      } else {
        this.matSnackBar.open('Invalid Post ID', 'Ok');
      }
    });
  }


  publishComment() {
    if (this.commentForm.invalid) {
      this.matSnackBar.open('Please fill in all required fields!', 'Ok');
      return;
    }
    const postedBy = this.commentForm.get('postedBy')?.value?.trim();
    const content = this.commentForm.get('content')?.value?.trim();

    if (!postedBy || !content) {
      this.matSnackBar.open('Comment cannot be empty!', 'Ok');
      return;
    }

    this.commentService.createComment(this.postId, postedBy, content).subscribe(
      (res) => {
        this.matSnackBar.open('Comment Published Successfully', 'Ok');
        this.commentForm.reset();
        Object.keys(this.commentForm.controls).forEach((key) => {
          this.commentForm.get(key)?.setErrors(null);
        });
        this.getCommentsByPost(); // Refresh comments after posting
      },
      (error) => {
        console.error('Error publishing comment:', error);
        this.matSnackBar.open('Something went wrong. Please try again!', 'Ok');
      }
    );
  }



  getCommentsByPost() {
    this.commentService.getAllCommentsByPost(this.postId).subscribe(
      (res) => {
        console.log('API Response:', res); // Debugging: Check the actual structure of `res`

        // Ensure `res` is an array and extract only the content text
        if (Array.isArray(res)) {
          this.comments = res.map((comment: any) => ({
            postedBy: comment.postedBy,
            createdAt: comment.createdAt,
            content: comment.content, // Directly use the content property
          }));
        } else {
          console.error('API response is not an array:', res);
          this.matSnackBar.open('Invalid comments data format', 'Ok');
        }

        console.log('Processed Comments:', this.comments); // Debugging: Check final output
      },
      (error) => {
        this.matSnackBar.open('Something Went Wrong...!!!', 'Ok');
      }
    );
  }


  getPostById() {
    this.postService.getPostById(this.postId).subscribe(
      (res) => {
        this.postData = res;
        this.getCommentsByPost(); // Fetch comments when post loads
      },
      (error) => {
        this.matSnackBar.open('Something Went Wrong....!!!', 'Ok');
      }
    );
  }


  likepost() {
    this.postService.likePost(this.postId).subscribe(
      () => {
        this.matSnackBar.open('Post Liked Successfully', 'Ok');
        if (this.postData) {
          this.postData.likeCount += 1;
        }
      },
      () => {
        this.matSnackBar.open('Something Went Wrong..!!!!', 'Ok');
      }
    );
  }

  
}