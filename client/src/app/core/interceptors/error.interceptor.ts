import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { BackendError } from "../models/error";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
              if(error instanceof HttpErrorResponse) {
                if(error.status == 400) {
                  let httpError = error.error;
                  return throwError(() => new BackendError(httpError.message));
                }
              }
              console.log('dsadsa00');
              return throwError(() => error);
            }));
    }
}