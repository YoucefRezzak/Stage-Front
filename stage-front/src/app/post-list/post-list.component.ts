import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../post.model';
import {Subscription, Observable} from 'rxjs';
import {PostConService} from '../services/con.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(public postService: PostConService) { }

  public posts: Post[] = [];
  private postSub: Subscription;
  ngOnInit() {
    this.getList();
    this.postService.message$.subscribe(post => {
        this.posts.push(post);
    });
    this.postService.dmessage$.subscribe(post => {
        const i: number = this.posts.indexOf(post);
        this.posts.splice(i, 1);
    });
  /*  this.postService.getPostUpdateListener().subscribe((post: Post[]) => {
      this.posts = post;
    });*/
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
  public getList() {
    this.postService.getPosts().subscribe(res => {
      this.posts = res;
    });
  }
  onDelete(post: Post) {
    this.postService.deletePost(post);
    console.log('delete : ' + post.title);
  }
}
