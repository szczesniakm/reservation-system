import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { catchError, Observable, throwError } from "rxjs";
import { BackendError } from "../models/error";
import { ToastService } from "../services/toast.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toastService: ToastService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
              if(error instanceof HttpErrorResponse) {
                if(error.status == 400) {
                  let httpError = error.error;

                  this.toastService.error(httpError.message);
                  return throwError(() => new BackendError(httpError.message));
                }
                this.toastService.error('Wystąpił nieoczekiwany błąd.');
              }
              return throwError(() => error);
            }));
    }
}
