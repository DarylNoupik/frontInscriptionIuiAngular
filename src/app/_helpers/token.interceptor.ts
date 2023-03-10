import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { TokenService } from "../_services/token.service";
import { LoaderService } from '../_services/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private loaderService: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    this.loaderService.isLoading.next(true);

    if (token != null) {
      let cloneRequest = request.clone({
        headers: request.headers.set('Authorization', ' bearer ' + token)
      })
      console.log(cloneRequest);
      return next.handle(cloneRequest).pipe(
        catchError(
          err => {
            console.log(err);

            if (err.stats === 401) {
              this.tokenService.tokenExpired();
            }
            return throwError('Session Expired');
          }
        ),
        finalize(() => {
          this.loaderService.isLoading.next(false);
        })
      );
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }
}
export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}
