import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('Request is on the way!');
    // const modifiedReq = req.clone({url: 'www.new-url.com'});
    const modifiedReq = req.clone({headers: req.headers.append('Auth','xyz')});
    return next.handle(modifiedReq).pipe(
      tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Response){
          console.log('Event Arrived'+ event.body);
          console.log(event.body);
        }
      })
    );
  }

}
