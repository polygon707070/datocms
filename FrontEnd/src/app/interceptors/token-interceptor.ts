import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) { }

    intercept(req, next) {
        let token = '';
        const userSessionData = this.storageService.getUserSessionData();
        if (userSessionData) {
            token = userSessionData.token;
        }

        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(tokenizedReq);
    }
}
