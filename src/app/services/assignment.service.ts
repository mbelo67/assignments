import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/environments/environment";
import { Assignment } from "../models/assignment.model";
import { LoggingService } from "./logging.service";
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AssignmentService {
    baseUrl = environment.apiUrl;
    constructor(private loggingService: LoggingService, private http: HttpClient, private cookieService: CookieService, private router: Router) {

    }

    getAssignments(page: number, limit: number): Observable<any> {
        // normalement on doit envoyer une requête HTTP
        // sur un web service, et ça peut prendre du temps
        // On a donc besoin "d'attendre que les données arrivent".
        // Angular utilise pour cela la notion d'Observable
        return this.http.get<Assignment[]>(this.baseUrl + "/assigments?page=" + page + "&limit=" + limit);

    }

    getAssignment(id: number): Observable<Assignment | undefined> {
        // Plus tard on utilisera un Web Service et une BD
        return this.http.get<Assignment | undefined>(`${this.baseUrl}/${id}`)

            .pipe(
                map(a => {
                    if (a) {
                        a.nom += " MAP MAP MAP";
                    }
                    return a;
                }),
                tap(a => {
                    if (a)
                        console.log("ICI DANS LE TAP " + a.nom)
                }),
                map(a => {
                    if (a) {
                        a.nom += " TOTOTOTO";
                    }
                    return a;
                }),
                catchError(this.handleError<Assignment>("Erreur dans le traitement de assignment avec id = " + id))
            )

            }

    private handleError<T>(operation: any, result?: T) {
        return (error: any): Observable<T> => {
            console.log(error); // pour afficher dans la console
            console.log(operation + ' a échoué ' + error.message);

            return of(result as T);
        }
    };

    addAssignment(assignment: Assignment): Observable<any> {
        this.loggingService.log(assignment.nom, 'ajouté');

        // plus tard on utilisera un web service pour l'ajout dans une vraie BD
        return this.http.post<Assignment>(this.baseUrl, assignment);

    }

    updateAssignment(assignment: Assignment): Observable<any> {
        // Normalement : on appelle un web service pour l'update des
        // données
        return this.http.put<Assignment>(this.baseUrl, assignment);

    }

    deleteAssignment(assignment: Assignment): Observable<any> {
        return this.http.delete(this.baseUrl + "/" + assignment._id)

    }
}