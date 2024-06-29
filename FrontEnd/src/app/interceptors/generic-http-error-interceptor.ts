import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UiMessagesNotifierService } from '../services/ui-messages-notifier.service';

@Injectable()
export class GenericHttpErrorInterceptor implements HttpInterceptor {

  constructor(private uiMessagesNotifierService: UiMessagesNotifierService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                event => this.handleResponse(req, event),
                error => this.handleError(req, error)
            )
        );
    }

    handleResponse(req: HttpRequest<any>, event) {
        if (event instanceof HttpResponse) {
            // console.log('Request for ', req.url,
            // ' Response Status ', event.status,
            // ' With body ', event.body);
        }
    }

    handleError(req: HttpRequest<any>, event) {
        // console.error('Request for ', req.url,
        //     ' Response Status ', event.status,
        //     ' With error ', event.error);

        if (event instanceof HttpErrorResponse) {
            console.log(event);
            if (event.status === 401 || event.status === 403) {
                this.uiMessagesNotifierService.notifyWarning('Доступ закрыт');
            } else {
                this.uiMessagesNotifierService.notifyError(event.message);
            }
        }
    }
}
