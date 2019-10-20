import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  servError = new Subject<string>();

  constructor(private http: HttpClient) { }

  createPost(title: string, content: string){
    const postData: Post={title: title, content: content};
    this.http.post(
      'https://angular-study-http.firebaseio.com/posts.json', 
    postData,
    {
      // params: new HttpParams().set('print', 'pretty')
      // observe: 'body'
      observe: 'response',
      responseType: 'json'
    })
    .subscribe(responseData =>{
      console.log(responseData)
    }, error =>{
      console.log(error);
      this.servError.next(error.error['error']);
    });
  }

  readPosts(){
    //setting multiple query params
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print','pretty');
    searchParams = searchParams.append('timeout','50ms');
    
   return this.http.get<{[key: string]: Post}>('https://angular-study-http.firebaseio.com/posts.json', 
   {
    headers: new HttpHeaders({'custom-header': 'Hello firebase'}),
    params: searchParams
   })
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
deleteAllPosts(){
  return this.http.delete('https://angular-study-http.firebaseio.com/posts.json',
  {
    observe: 'events'
  })
  .pipe(
    tap(event =>{
      console.log(event);
      if(event.type === HttpEventType.Response){
        console.log(event.body);
      }
    })
  );
}

}
