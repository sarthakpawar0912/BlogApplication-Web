import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blog_Application';

  constructor(private router: Router) {}


  navigateToCreatePost() {
    this.router.navigate(['/create-post']);
  }


  navigateToGetAllPosts() {
    this.router.navigate(['/view-all']);
  }


  navigateToSearchByPost() {
    this.router.navigate(['/search-by-name']);
  }


  showMostLikedPosts() {
    this.router.navigate(['/most-liked-posts']);
  }
  

  shareWebsite() {
    const websiteUrl = window.location.href; // Gets the current page URL
    if (navigator.share) {
      // Native Web Share API
      navigator.share({
        title: 'Check out this website!',
        url: websiteUrl
      }).then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(websiteUrl);
      alert('Link copied to clipboard! Share it with others.');
    }
  }
  
}
