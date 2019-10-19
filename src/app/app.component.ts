import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  @ViewChild('postForm', {static: true}) postForm: NgForm;
  error=null;

  constructor(private postServ: PostServiceService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // post Http request
   this.postServ.createPost(postData.title, postData.content);
   this.postForm.reset();
  }

  onFetchPosts() {
    // get Http request
    this.isFetching=true;
    this.subscribeReadPost();
  }

  onClearPosts() {
    // delete Http request
    if(confirm('Are you sure to delete all posts?')){
      this.postServ.deleteAllPosts().subscribe(()=>{
        this.loadedPosts = [];
      });
    }
    
  }

  listGrpClr(i: number){
    return{
      'list-group-item-success': i%2==0,
      'list-group-item-info': i%2!=0
    };
  }

  private subscribeReadPost(){
    this.postServ.readPosts().subscribe(
      allPosts=>{
        // console.log(posts);
        this.loadedPosts = allPosts;
        this.isFetching = false;
      }, error =>{
        this.error = error.error['error'];
        console.log(error);
      });
  }

}
