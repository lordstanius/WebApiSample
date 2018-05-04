import { HttpInterceptor, HttpUserEvent, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req.headers.set('Content-Type', 'application/json');
    const authReq = req.clone({ headers: req.headers });

    return next.handle(authReq);
  }
}
