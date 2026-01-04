import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-by-name',
  standalone: false,
  templateUrl: './search-by-name.component.html',
  styleUrl: './search-by-name.component.css'
})
export class SearchByNameComponent implements OnInit {
  result: any = [];
  searchQuery: string = '';
  isLoading: boolean = false;

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
        this.searchByName();
      }
    });
  }

  searchByName() {
    if (!this.searchQuery.trim()) return;

    this.isLoading = true;
    this.postService.searchByName(this.searchQuery).subscribe({
      next: (res) => {
        this.result = res;
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Something went wrong!', 'OK', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}
