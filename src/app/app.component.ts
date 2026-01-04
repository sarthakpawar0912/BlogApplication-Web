import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from './service/post.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blog_Application';
  searchQuery: string = '';
  searchResults: any[] = [];
  isSearching: boolean = false;
  showDropdown: boolean = false;

  private searchSubject = new Subject<string>();

  constructor(private router: Router, private postService: PostService) {
    // Debounce search to avoid too many API calls
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  onSearchInput() {
    if (this.searchQuery.trim()) {
      this.isSearching = true;
      this.showDropdown = true;
      this.searchSubject.next(this.searchQuery);
    } else {
      this.searchResults = [];
      this.showDropdown = false;
    }
  }

  performSearch(query: string) {
    this.postService.searchByName(query).subscribe({
      next: (res) => {
        this.searchResults = res;
        this.isSearching = false;
      },
      error: () => {
        this.searchResults = [];
        this.isSearching = false;
      }
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    this.showDropdown = false;
  }

  shareWebsite() {
    const websiteUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Check out BlogSpace!',
        url: websiteUrl
      }).then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(websiteUrl);
      alert('Link copied to clipboard!');
    }
  }
}
