import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blog_Application'; // ✅ Add this property

  constructor(private router: Router) {}

  // ✅ Navigate to Create Post Page
  navigateToCreatePost() {
    this.router.navigate(['/create-post']);
  }

  // ✅ Navigate to View All Posts Page
  navigateToGetAllPosts() {
    this.router.navigate(['/view-all']);
  }

  // ✅ Navigate to Search by Name Page
  navigateToSearchByPost() {
    this.router.navigate(['/search-by-name']);
  }

  // ✅ Navigate to Most Liked Posts Page
  showMostLikedPosts() {
    this.router.navigate(['/most-liked-posts']);
  }
  

  // ✅ Share Website Link
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
