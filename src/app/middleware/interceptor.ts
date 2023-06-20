import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken: string = this.cookieService.get(GlobalConstants.cookieKeys.currentUser);
        const userProject: string = this.cookieService.get(GlobalConstants.cookieKeys.currentProject);
        let modifiedReq: HttpRequest<any>;
        if (userToken) {
            modifiedReq = req.clone({
                headers: req.headers.set(GlobalConstants.headerKeys.accessToken, `${userToken}`).set(GlobalConstants.headerKeys.projectId, `${userProject}`),
            });
        } else {
            modifiedReq = req.clone();
        }
        return next.handle(modifiedReq).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.authService.isLoggedIn.next(false);
                        this.cookieService.delete(GlobalConstants.cookieKeys.currentUser);
                        this.cookieService.delete(GlobalConstants.cookieKeys.currentProject);
                        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
                        return;
                    }
                    if (err.status === 403) {
                        /*this.cookieService.delete("currentUser");
                        this.cookieService.delete("project");*/
                        this.router.navigate(['/403'], { queryParams: { returnUrl: this.router.url } });
                        return;
                    }
                    if (err.status === 500 || err.status === 0) {
                        this.router.navigate(['/500'], { queryParams: { returnUrl: this.router.url } });
                        return;
                    }
                    return;
                }
            })
        );
    }
}