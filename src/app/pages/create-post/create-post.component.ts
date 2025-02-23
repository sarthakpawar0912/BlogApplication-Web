import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';
@Component({
  selector: 'app-create-post',
  standalone:false,
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup; 
  tags: string[] = []; 


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private postService: PostService
  ) {}


  ngOnInit() {
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, Validators.required],
      postedBy: [null, Validators.required]
    });
  }


  add(event: any) {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear(); 
  }


  remove(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }


  createPost(){
    const data = { ...this.postForm.value, tags: this.tags };

    this.postService.createNewPost(data).subscribe(() => {
      this.snackBar.open("Post Created Successfully!", "Ok", { duration: 3000 });
      this.router.navigateByUrl("/");
    }, () => {
      this.snackBar.open("Something went wrong!", "Ok", { duration: 3000 });
    });
  }

  
}
