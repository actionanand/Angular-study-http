import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient) { }

  createPost(title: string, content: string){

    const postData: Post={title: title, content: content};

    this.http.post(
      'https://angular-study-http.firebaseio.com/posts.json', 
    postData)
    .subscribe(responseData =>{
      console.log(responseData)
    });
  }

  readPost(){
   return this.http.get<{[key: string]: Post}>('https://angular-study-http.firebaseio.com/posts.json')
        .pipe(
          map((responseData) =>{
          
        const postArray: Post[] = [];
        for(const key in responseData){

          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key],id: key});
          }

        }
        return postArray;
        }));
  }

}
