import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LogInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('Incoming Req: '+ req.url);
    return next.handle(req).pipe(
      tap(event=>{
        if(event.type === HttpEventType.Response){
          console.log('Even body: '+ event.body);
          console.log(event.body);
        }
      })
    );
  }
}
