import { Component, OnInit } from '@angular/core';

import { Post } from './post.model';
import { PostServiceService } from './post-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(private postServ: PostServiceService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // post Http request
   this.postServ.createPost(postData.title, postData.content); 
  }

  onFetchPosts() {
    // get Http request
    this.isFetching=true;
    this.subscribeReadPost();
  }

  onClearPosts() {
    // Send Http request
  }

  listGrpClr(i: number){
    return{
      'list-group-item-success': i%2==0,
      'list-group-item-info': i%2!=0
    };
  }

  private subscribeReadPost(){
    this.postServ.readPost().subscribe(
      allPosts=>{
        // console.log(posts);
        this.loadedPosts = allPosts;
        this.isFetching = false;
      });
  }

}
