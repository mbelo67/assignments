import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/environments/environment";
import { Matiere } from "../models/matiere.model";

@Injectable({
    providedIn: 'root'
})
export class MatiereService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
        //this.loggingService.setNiveauTrace(2);

    }
    getProject(id:string) {
        return this.http.get<Matiere>(this.baseUrl + "/project/"+id);
    }
}