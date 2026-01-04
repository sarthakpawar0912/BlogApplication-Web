# BlogSpace - Angular Frontend

A modern, responsive blog application built with Angular 17+ and Angular Material. Features a beautiful purple-gradient UI with live search, post management, and interactive commenting system.

![Angular](https://img.shields.io/badge/Angular-17+-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![Material](https://img.shields.io/badge/Angular%20Material-17+-purple?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Components Documentation](#components-documentation)
- [Services Documentation](#services-documentation)
- [Routing](#routing)
- [API Integration](#api-integration)
- [Styling Guide](#styling-guide)
- [Scripts](#scripts)

---

## Features

### Core Features
| Feature | Description |
|---------|-------------|
| Create Posts | Rich form with title, content, image URL, author, and tags |
| View All Posts | Beautiful card-based grid layout with hover effects |
| View Single Post | Full post view with comments section |
| Like Posts | Interactive like button with real-time count update |
| Comment System | Add and view comments on posts |
| Search Posts | Live search with instant dropdown results |

### UI/UX Features
| Feature | Description |
|---------|-------------|
| Live Search | Results appear as you type (300ms debounce) |
| Responsive Design | Mobile-first, works on all screen sizes |
| Hover Effects | Cards lift up, images zoom on hover |
| Loading States | Spinners and skeleton loaders |
| Empty States | Friendly messages when no content |
| Purple Gradient Theme | Modern, consistent color scheme |

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 17+ | Frontend Framework |
| Angular Material | 17+ | UI Component Library |
| TypeScript | 5.0+ | Programming Language |
| RxJS | 7.8+ | Reactive Programming |
| CSS3 | - | Styling |

---

## Project Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── create-post/              # Post creation form
│   │   │   ├── create-post.component.ts
│   │   │   ├── create-post.component.html
│   │   │   └── create-post.component.css
│   │   │
│   │   ├── view-all/                 # Home page with all posts
│   │   │   ├── view-all.component.ts
│   │   │   ├── view-all.component.html
│   │   │   └── view-all.component.css
│   │   │
│   │   ├── view-post/                # Single post detail view
│   │   │   ├── view-post.component.ts
│   │   │   ├── view-post.component.html
│   │   │   └── view-post.component.css
│   │   │
│   │   └── search-by-name/           # Search results page
│   │       ├── search-by-name.component.ts
│   │       ├── search-by-name.component.html
│   │       └── search-by-name.component.css
│   │
│   ├── service/
│   │   ├── post.service.ts           # Post API service
│   │   └── comment.service.ts        # Comment API service
│   │
│   ├── app.component.ts              # Root component with navbar
│   ├── app.component.html            # Main layout template
│   ├── app.component.css             # Global navbar styles
│   ├── app.module.ts                 # Main module
│   ├── app-routing.module.ts         # Route configuration
│   └── AngularMaterialsModule.ts     # Material imports
│
├── assets/                           # Static assets
└── styles.css                        # Global styles
```

---

## Installation

### Prerequisites
- Node.js 18+
- npm 9+ or yarn
- Angular CLI 17+

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/sarthakpawar0912/BlogApplication-Web.git
cd BlogApplication-Web

# 2. Install dependencies
npm install

# 3. Start development server
ng serve

# 4. Open browser
# Navigate to http://localhost:4200
```

---

## Configuration

### Backend API URL

The application connects to a Spring Boot backend. Update the base URL in service files if needed:

**`src/app/service/post.service.ts`**
```typescript
private BASE_URL = 'http://localhost:8080/';
```

**`src/app/service/comment.service.ts`**
```typescript
private BASE_URL = 'http://localhost:8080/';
```

---

## Components Documentation

### 1. AppComponent (Navbar & Live Search)

**Location:** `src/app/app.component.ts`

The root component containing the navigation bar with integrated live search functionality.

#### Template Structure
```html
<mat-toolbar>
  <span class="app-title">BlogSpace</span>
  <div class="search-wrapper">
    <input [(ngModel)]="searchQuery" (input)="onSearchInput()">
    <div class="search-dropdown"><!-- Live results --></div>
  </div>
  <button routerLink="/create-post">New Post</button>
  <button routerLink="/view-all">Home</button>
</mat-toolbar>
<router-outlet></router-outlet>
```

#### Properties
| Property | Type | Description |
|----------|------|-------------|
| `searchQuery` | `string` | Current search input value |
| `searchResults` | `any[]` | Array of matching posts |
| `isSearching` | `boolean` | Loading state flag |
| `showDropdown` | `boolean` | Dropdown visibility |

#### Methods
| Method | Description |
|--------|-------------|
| `onSearchInput()` | Triggers debounced search on input |
| `performSearch(query)` | Calls API and updates results |
| `clearSearch()` | Clears search and closes dropdown |
| `shareWebsite()` | Shares current URL via Web Share API |

#### Search Flow
1. User types in search box
2. `onSearchInput()` triggers with 300ms debounce
3. API call to `/api/posts/search/{query}`
4. Results display in dropdown (max 5)
5. Click result navigates to post detail

---

### 2. ViewAllComponent (Home Page)

**Location:** `src/app/pages/view-all/`

Displays all blog posts in a responsive 3-column grid layout.

#### Template Sections
| Section | Description |
|---------|-------------|
| Hero Section | Welcome banner with "BlogSpace" title and CTA button |
| Stats Bar | Shows total posts, likes, and views count |
| Posts Grid | Responsive grid of post cards |
| Empty State | Shown when no posts exist |
| Footer | Simple footer with branding |

#### Properties
| Property | Type | Description |
|----------|------|-------------|
| `allPosts` | `any[]` | Array of all posts from API |

#### Methods
| Method | Return | Description |
|--------|--------|-------------|
| `ngOnInit()` | `void` | Lifecycle hook - fetches all posts |
| `getAllPosts()` | `void` | Calls PostService.getAllPosts() |
| `getTotalLikes()` | `number` | Calculates sum of all likes |
| `getTotalViews()` | `number` | Calculates sum of all views |
| `getUniqueTags()` | `string[]` | Returns unique tags from all posts |

#### Post Card Structure
```html
<mat-card class="post-card">
  <div class="card-image">
    <img [src]="post.img">
    <div class="image-overlay"><!-- Hover overlay --></div>
  </div>
  <div class="card-body">
    <div class="tags"><!-- Post tags --></div>
    <h3 class="card-title">{{ post.name }}</h3>
    <p class="card-content">{{ post.content | truncate }}</p>
    <div class="card-meta">
      <div class="author"><!-- Avatar + name --></div>
      <span class="date">{{ post.date }}</span>
    </div>
  </div>
  <div class="card-footer">
    <div class="stats"><!-- Likes & views --></div>
    <button>Read More</button>
  </div>
</mat-card>
```

---

### 3. ViewPostComponent (Post Detail)

**Location:** `src/app/pages/view-post/`

Full view of a single blog post with complete content and comments section.

#### Template Sections
| Section | Description |
|---------|-------------|
| Header | Purple gradient with post title |
| Featured Image | Full-width post image |
| Content | Complete post content |
| Meta Info | Author, date, view count |
| Tags | All post tags as chips |
| Like Button | Interactive like with count |
| Comment Form | Input for new comments |
| Comments List | All comments for the post |

#### Properties
| Property | Type | Description |
|----------|------|-------------|
| `post` | `any` | Current post data |
| `comments` | `any[]` | Array of comments |
| `commentContent` | `string` | New comment text |
| `commentAuthor` | `string` | New comment author |

#### Methods
| Method | Description |
|--------|-------------|
| `ngOnInit()` | Gets post ID from route, fetches post & comments |
| `getPostById()` | Fetches post data from API |
| `getCommentsByPost()` | Fetches all comments for post |
| `likePost()` | Increments like count via API |
| `publishComment()` | Submits new comment to API |

---

### 4. CreatePostComponent (Create Post Form)

**Location:** `src/app/pages/create-post/`

Form for creating new blog posts with validation.

#### Form Fields
| Field | Control | Validation | Description |
|-------|---------|------------|-------------|
| Post Title | `input` | Required | Blog post title |
| Author | `input` | Required | Author name |
| Image URL | `input` | Required | Featured image URL |
| Content | `textarea` | Required, Max 5000 | Post body content |
| Tags | `mat-chip-grid` | Optional | Categorization tags |

#### Properties
| Property | Type | Description |
|----------|------|-------------|
| `postForm` | `FormGroup` | Reactive form group |
| `tags` | `string[]` | Array of added tags |

#### Methods
| Method | Description |
|--------|-------------|
| `ngOnInit()` | Initializes form with validators |
| `add(event)` | Adds new tag from chip input |
| `remove(tag)` | Removes tag from array |
| `getContentLength()` | Returns current content character count |
| `createPost()` | Submits form data to API |

#### Form Template
```html
<form [formGroup]="postForm">
  <mat-form-field>
    <input formControlName="name" placeholder="Post Title">
  </mat-form-field>
  <mat-form-field>
    <input formControlName="postedBy" placeholder="Author">
  </mat-form-field>
  <mat-form-field>
    <input formControlName="img" placeholder="Image URL">
  </mat-form-field>
  <mat-form-field>
    <textarea formControlName="content"></textarea>
    <mat-hint>{{ getContentLength() }} / 5000</mat-hint>
  </mat-form-field>
  <mat-form-field>
    <mat-chip-grid #chipGrid>
      <mat-chip-row *ngFor="let tag of tags">{{ tag }}</mat-chip-row>
      <input [matChipInputFor]="chipGrid">
    </mat-chip-grid>
  </mat-form-field>
  <button [disabled]="!postForm.valid" (click)="createPost()">Publish</button>
</form>
```

---

### 5. SearchByNameComponent (Search Results)

**Location:** `src/app/pages/search-by-name/`

Displays search results when navigating from navbar or direct URL.

#### Properties
| Property | Type | Description |
|----------|------|-------------|
| `result` | `any[]` | Search results array |
| `searchQuery` | `string` | Current search term |
| `isLoading` | `boolean` | Loading state |

#### Methods
| Method | Description |
|--------|-------------|
| `ngOnInit()` | Subscribes to query params, triggers search |
| `searchByName()` | Calls API with current query |

---

## Services Documentation

### PostService

**Location:** `src/app/service/post.service.ts`

Handles all HTTP requests related to blog posts.

#### Configuration
```typescript
@Injectable({ providedIn: 'root' })
export class PostService {
  private BASE_URL = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}
}
```

#### Methods

| Method | HTTP | Endpoint | Parameters | Returns | Description |
|--------|------|----------|------------|---------|-------------|
| `createNewPost(data)` | POST | `/api/posts` | `data: Post` | `Observable<any>` | Creates new blog post |
| `getAllPosts()` | GET | `/api/posts` | None | `Observable<Post[]>` | Fetches all posts |
| `getPostById(id)` | GET | `/api/posts/{id}` | `id: number` | `Observable<Post>` | Fetches single post |
| `likePost(id)` | PUT | `/api/posts/{id}/like` | `id: number` | `Observable<any>` | Likes a post |
| `searchByName(name)` | GET | `/api/posts/search/{name}` | `name: string` | `Observable<Post[]>` | Searches posts |

#### Usage Examples

```typescript
// Inject service
constructor(private postService: PostService) {}

// Create a new post
const postData = {
  name: 'My Post',
  content: 'Content here...',
  img: 'https://example.com/image.jpg',
  postedBy: 'John',
  tags: ['Tech', 'Angular']
};
this.postService.createNewPost(postData).subscribe(
  response => console.log('Post created:', response)
);

// Get all posts
this.postService.getAllPosts().subscribe(
  posts => this.allPosts = posts
);

// Search posts
this.postService.searchByName('angular').subscribe(
  results => this.searchResults = results
);
```

---

### CommentService

**Location:** `src/app/service/comment.service.ts`

Handles all HTTP requests related to comments.

#### Methods

| Method | HTTP | Endpoint | Parameters | Returns | Description |
|--------|------|----------|------------|---------|-------------|
| `createComment(postId, postedBy, content)` | POST | `/api/comments/create` | Query params | `Observable<Comment>` | Creates comment |
| `getAllCommentsByPost(postId)` | GET | `/api/comments/{postId}` | `postId: number` | `Observable<Comment[]>` | Gets comments |

#### Usage Examples

```typescript
// Inject service
constructor(private commentService: CommentService) {}

// Create comment
this.commentService.createComment(1, 'Jane', 'Great post!').subscribe(
  comment => console.log('Comment added:', comment)
);

// Get comments for post
this.commentService.getAllCommentsByPost(1).subscribe(
  comments => this.comments = comments
);
```

---

## Routing

**Location:** `src/app/app-routing.module.ts`

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Redirect | Redirects to `/view-all` |
| `/view-all` | ViewAllComponent | Home page with all posts |
| `/create-post` | CreatePostComponent | Create new post form |
| `/view-post/:id` | ViewPostComponent | Single post detail view |
| `/search-by-name` | SearchByNameComponent | Search results page |

#### Route Configuration
```typescript
const routes: Routes = [
  { path: '', redirectTo: 'view-all', pathMatch: 'full' },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'view-all', component: ViewAllComponent },
  { path: 'search-by-name', component: SearchByNameComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
];
```

---

## API Integration

### Request/Response Examples

#### Create Post
```http
POST /api/posts
Content-Type: application/json

{
  "name": "My First Blog Post",
  "content": "This is the content of my post...",
  "img": "https://example.com/image.jpg",
  "postedBy": "John Doe",
  "tags": ["Technology", "Angular"]
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "My First Blog Post",
  "content": "This is the content of my post...",
  "img": "https://example.com/image.jpg",
  "postedBy": "John Doe",
  "date": "2024-01-15T10:30:00",
  "likeCount": 0,
  "viewCount": 0,
  "tags": ["Technology", "Angular"]
}
```

#### Get All Posts
```http
GET /api/posts
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "My First Blog Post",
    "content": "This is the content...",
    "img": "https://example.com/image.jpg",
    "postedBy": "John Doe",
    "date": "2024-01-15T10:30:00",
    "likeCount": 5,
    "viewCount": 100,
    "tags": ["Technology"]
  }
]
```

#### Like Post
```http
PUT /api/posts/1/like
```

**Response (200 OK):**
```json
{
  "message": "Post liked Successfully.."
}
```

#### Create Comment
```http
POST /api/comments/create?postId=1&postedBy=Jane
Content-Type: application/json

{
  "content": "This is a great post!"
}
```

---

## Styling Guide

### Color Palette

| Color Name | Hex Code | CSS Variable | Usage |
|------------|----------|--------------|-------|
| Primary Purple | `#667eea` | `--primary` | Buttons, links, accents |
| Secondary Purple | `#764ba2` | `--secondary` | Gradient end |
| Gold Accent | `#ffd700` | `--accent` | Hover states, highlights |
| Text Dark | `#333333` | `--text-dark` | Headings |
| Text Light | `#666666` | `--text-light` | Body text |
| Background | `#f8f8f8` | `--bg` | Page background |

### Gradient Theme
```css
/* Primary gradient used throughout the app */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Responsive Breakpoints

| Breakpoint | Width | Grid Columns |
|------------|-------|--------------|
| Desktop | > 900px | 3 columns |
| Tablet | 600px - 900px | 2 columns |
| Mobile | < 600px | 1 column |

### CSS Classes

| Class | Description |
|-------|-------------|
| `.hero-section` | Purple gradient banner |
| `.post-card` | Individual post card |
| `.card-image` | Image container with hover effect |
| `.search-dropdown` | Live search results dropdown |
| `.empty-state` | Empty content placeholder |

---

## Scripts

| Command | Description |
|---------|-------------|
| `ng serve` | Start development server on port 4200 |
| `ng build` | Build for production |
| `ng build --configuration production` | Production build with optimizations |
| `ng test` | Run unit tests |
| `ng lint` | Run linting |
| `ng generate component name` | Generate new component |

---

## Author

**Sarthak Pawar**
- GitHub: [@sarthakpawar0912](https://github.com/sarthakpawar0912)

---

## License

This project is licensed under the MIT License.
