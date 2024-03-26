import { Injectable } from '@angular/core';
import { ICandidature } from "../_interfaces/icandidature";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";
import { UsersService } from "./users.service";
import { ICandidatureResponse } from "../_interfaces/icandidature-response";
import { ICodeValidatorModels } from '../_interfaces/icode-validator-models';
import { IMailRequest } from '../_interfaces/imail-request';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  url:string = 'http://51.178.136.105:9090/candidature/Candidats';
  //url: string = 'https://inscription.ucac-icam.com:9090/candidature/Candidats';
  //urlhasCandidature: string = 'https://inscription.ucac-icam.com:9090/candidature/';
  urlhasCandidature:string = 'http://51.178.136.105:9090/candidature/';
  idCcompte: string = "";
  //urlCodeTest : string = 'http://51.178.136.105:9090/candidature/all-codes';
  urlCodeTest: string = 'https://inscription.ucac-icam.com:9090/candidature/all-codes';

  urlUploadImage : string = "http://51.178.136.105:9090/file/uploadFile/";
  //urlUploadImage : string = "https://inscription.ucac-icam.com:9090/file/uploadFile/";

  urlSendEmail : string = "http://51.178.136.105:9090/email/send";
  //urlSendEmail : string = "https://inscription.ucac-icam.com:9090/email/send";

  urlVerifiyEmail : string = "http://51.178.136.105:9090/email/verify"
  //urlVerifiyEmail : string = "https://inscription.ucac-icam.com:9090/email/verify"

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UsersService
  ) { }

  addCandidature(candidature: ICandidature): Observable<ICandidature> {
    return this.http.post<ICandidature>(this.url, candidature);
  }

  verifyEmail(email: string): Observable<HttpResponse<string>> {
    return this.http.post(this.urlVerifiyEmail, email, { observe: 'response', responseType: 'text' });
  }
  sendEmail(mailRequest: IMailRequest): Observable<string> {
    return this.http.post(this.urlSendEmail, mailRequest, { responseType: 'text' });
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
