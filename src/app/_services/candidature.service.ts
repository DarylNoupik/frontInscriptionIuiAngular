import { Injectable } from '@angular/core';
import { ICandidature } from "../_interfaces/icandidature";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";
import { UsersService } from "./users.service";
import { ICandidatureResponse } from "../_interfaces/icandidature-response";
import { ICodeValidatorModels } from '../_interfaces/icode-validator-models';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  //url:string = 'http://localhost:9090/candidature/Candidats';
  url: string = 'https://inscription.ucac-icam.com:9090/candidature/Candidats';
  urlhasCandidature: string = 'https://inscription.ucac-icam.com:9090/candidature/';
  //urlhasCandidature:string = 'http://localhost:9090/candidature/';
  idCcompte: string = "";
  //urlCodeTest : string = 'http://localhost:9090/candidature/all-codes';
  urlCodeTest: string = 'https://inscription.ucac-icam.com:9090/candidature/all-codes';

  urlUploadImage : string = "https://inscription.ucac-icam.com:9090/file/uploadFile/";

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UsersService
  ) { }

  addCandidature(candidature: ICandidature): Observable<ICandidature> {
    return this.http.post<ICandidature>(this.url, candidature);
  }

  uploadImage(file: File, candidatureId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.urlUploadImage+candidatureId, formData);
  }

  allCodes(): Observable<ICodeValidatorModels> {
    return this.http.get<ICodeValidatorModels>(this.urlCodeTest);
  }

  hasCandidature(compteID: string): Observable<ICandidatureResponse[]> {
    return this.http.get<ICandidatureResponse[]>(this.urlhasCandidature + compteID);
  }
  /*  hasCandidatureAuto(): Observable<any>{
      let token: string | null = this.tokenService.getToken();
      let email :string= "";
      let iDCandidat : string = "";
      if (!!token) {
        email = this.tokenService.decodeToken(token).sub;
      }
      console.log(email+" le mail");
      this.userService.getUserByEmail(email).subscribe(
         data => {
                 iDCandidat = String(data.id);
              }, error => {
          console.log(error);
        }
        );
        console.log("CompteID"+this.idCcompte);
      return  this.http.get<any>(this.urlhasCandidature+this.idCcompte);
  
    }*/

  savecompteID(id: string): void {
    localStorage.setItem('idCandidat', id);
  }

}
