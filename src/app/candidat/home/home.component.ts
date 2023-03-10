import { Component, OnInit } from '@angular/core';
import { SessionService } from "../../_services/session.service";
import { ISessionModel } from "../../_interfaces/isession-model";
import { CandidatureService } from "../../_services/candidature.service";
import { TokenService } from "../../_services/token.service";
import { UsersService } from "../../_services/users.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public session: ISessionModel = {
    id: 0,
    nom: "",
    date_debut: new Date(),
    date_limite: new Date(),
    date_examen: new Date(),
    statut: false
  };

  public candidature: any;

  public compteID: string | null = "";
  public showSession: boolean = false;
  public showLien: boolean = false;
  isLoading: boolean = false;

  constructor(
    private sessionService: SessionService,
    private candidatureService: CandidatureService,
    private tokenService: TokenService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.sessionService.getActiveSession().subscribe({
      next: data => {
        console.log(data);
        this.session = data;
      },
      error: err => console.log(err)
    });
    let token: string | null = this.tokenService.getToken();
    let email: string = "";
    if (!!token) {
      email = this.tokenService.decodeToken(token).sub;
    }
    this.userService.getUserByEmail(email).subscribe({
      next: data => {
        this.candidatureService.hasCandidature(String(data.id)).subscribe(
          data2 => {
            if (data2.length > 0) {
              for (let iCandidatureRespons of data2) {
                if (iCandidatureRespons.candidatureActif === true) {
                  this.candidature = iCandidatureRespons;
                  this.showSession = true;
                  localStorage.setItem('haveCandidature', 'true');
                  this.showLien = false;
                }
              }
            }
            else {
              this.showSession = false;
              this.showLien = true;
            }
            if (this.showSession === false && this.showLien === false) {
              this.showSession = false;
              this.showLien = true;
            }
            this.isLoading = false;

          },
          error => console.log(error.status)
        )
      },
      error: err => {
        console.log(err);
      }
    });

    /* console.log("#########"+this.compteID);
     if (!!this.compteID) {
       this.candidatureService.hasCandidature(this.compteID).subscribe(
         data =>{
           console.log(data);
         }, error => {
           console.log(error.status);
         }
       );

     }*/
  }

}
