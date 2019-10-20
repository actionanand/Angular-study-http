import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('Request is on the way!');
    // const modifiedReq = req.clone({url: 'www.new-url.com'});
    const modifiedReq = req.clone({headers: req.headers.append('Auth','xyz')});
    return next.handle(modifiedReq);
  }
}
