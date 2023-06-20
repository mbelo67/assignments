import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/global-constants';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
    isAdminUser = new BehaviorSubject<boolean>(false);

    isAdminUse = false;
    baseUrl = environment.apiUrl;
    logIn(login: string, password: string): Observable<HttpResponse<any>> {
        console.log("login attempt", { email: login, password: password })
        return this.http.post<any>(this.baseUrl + "/user/login", { email: login, password: password }, { observe: 'response' })
            .pipe(
                tap((resp: HttpResponse<any>) => {
                    let xToken = resp.headers.get('x-token')!;

                    if (xToken.length > 0) {
                        //this.cookieService.set(GlobalConstants.cookieKeys.currentUser, xToken);
                        
                        this.isLoggedIn.next(true);
                    }
                    return resp;
                }),
                catchError(this.handleError)
            );

    }

    logOut() {
        this.cookieService.deleteAll();
        this.isLoggedIn.next(false);
        this.router.navigate(['/login']);
    }

    isAdmin() {
        let isUserAdmin = new Promise((resolve, reject) => {
            resolve(this.isAdminUser.next(true));
        });
        //return this.loggedIn;
        return isUserAdmin;
    }

    isLogged() {
        let isLogged = new Promise((resolve, reject) => {
            resolve(this.isLoggedIn.next(true));
        });
        return isLogged;
    }


    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
        console.log("here")
    }

    private hasToken(): boolean {
        return this.cookieService.check('userToken');
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }


}
