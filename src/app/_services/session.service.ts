import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ISessionModel } from "../_interfaces/isession-model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  //url: string = 'https://inscription.ucac-icam.com:8080/session/active';
  url: string = 'http://51.178.136.105:8080/session/active';

  constructor(private http: HttpClient) { }

  getActiveSession(): Observable<ISessionModel> {
    return this.http.get<ISessionModel>(this.url);
  }



}
