import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url === environment.login) {
            req = this.addHeaderLogin(req);
            return next.handle(req);
        } else if (req.url === environment.marketData) {
            if (this.authService.getAccessToken()) {
                req = this.addToken(req, this.authService.getAccessToken());
                return next.handle(req);
            } else {
                return next.handle(undefined);
                throwError('No logged');
            }
        }
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Accept': 'application/vnd.solid-v1.0+json',
                'Accept-Encoding': 'gzip, deflate',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    private addHeaderLogin(request: HttpRequest<any>) {
        return request.clone({
            setHeaders: {
                'Authorization': 'Basic d2ViZmctdGVzdDpXVzU4WUpqODlsdFI0M0Ny',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    }
}