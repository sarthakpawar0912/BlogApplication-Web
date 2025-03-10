import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  constructor(private http: HttpClient) {}


  createComment(postId: number, postedBy: string, content: string): Observable<any> {
    const params = { postId: postId.toString(), postedBy: postedBy };
    const body = { content }; // Use an object for the body
    return this.http.post<any>(`${BASIC_URL}api/comments/create`, body, { params });
  }


  getAllCommentsByPost(postId: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/comments/${postId}`);
  }

  
}