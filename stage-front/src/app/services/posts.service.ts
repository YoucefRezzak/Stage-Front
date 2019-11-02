import {Post} from '../post.model';
import { Injectable } from '@angular/core';
import {Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] =  [] ;
  private postUpdated = new Subject<Post[]>();
  getPosts() {
 //   return this.http.get<Post []>('http://localhost:3000/api/cats')
  }
  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }
  addPost(tit: string, smt: string) {
//    const post: Post = {title: tit, smth: smt};
//    this.posts.push(post);
  //  this.postUpdated.next([...this.posts]);
  }
}
