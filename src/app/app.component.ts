import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.fetchPosts();

  }

  onCreatePost(postData: Post) {
    // post Http request
    this.http.post(
      'https://angular-study-http.firebaseio.com/posts.json', 
    postData)
    .subscribe(responseData =>{
      console.log(responseData)
    });
  }

  onFetchPosts() {
    // get Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.isFetching=true;

    this.http.get<{[key: string]: Post}>('https://angular-study-http.firebaseio.com/posts.json')
    .pipe(
      map((responseData) =>{
      
     const postArray: Post[] = [];
     for(const key in responseData){

       if(responseData.hasOwnProperty(key)){
         postArray.push({...responseData[key],id: key});
       }

     }
     return postArray;
    }))
    .subscribe(
      allPosts=>{
        // console.log(posts);
        this.loadedPosts = allPosts;
        this.isFetching = false;
      }
    );
  }

  listGrpClr(i: number){
    return{
      'list-group-item-success': i%2==0,
      'list-group-item-info': i%2!=0
    };
  }

}
