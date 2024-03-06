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

  matters: {
    title: string;
    formation?: string;
    content: { title: string; duration: string; coef: number }[];
  }[] = [
    {
      title: '1er Cycle',
      content: [
        {
          title: 'Mathématiques',
          duration: '2H',
          coef: 4,
        },
        {
          title: 'Physique - Chimie',
          duration: '2H',
          coef: 3,
        },
        {
          title: 'Anglais - IT',
          duration: '2H',
          coef: 4,
        },
      ],
    },
    {
      title: '2ème Cycle',
      formation: 'X',
      content: [
        {
          title: 'Mathématiques',
          duration: '2H',
          coef: 4,
        },
        {
          title: 'Anglais ',
          duration: '1H',
          coef: 1.5,
        },
        {
          title: 'Informatique',
          duration: '2H',
          coef: 4,
        },
        {
          title: 'Culture générale',
          duration: '1H',
          coef: 2,
        },
      ],
    },
    {
      title: '2ème Cycle',
      formation: 'I',
      content: [
        {
          title: 'Mathématiques',
          duration: '2H',
          coef: 4,
        },
        {
          title: 'Anglais',
          duration: '1H',
          coef: 1.5,
        },
        {
          title: ' Electrotechnique / Thermodynamique ',
          duration: '2H',
          coef: 3,
        },
        {
          title: 'Culture générale ',
          duration: '1H',
          coef: 2,
        },
      ],
    },
    {
      title: '2ème Cycle',
      formation: 'IP',
      content: [
        {
          title: 'Mathématiques',
          duration: '2H',
          coef: 4,
        },
        {
          title: 'Anglais ',
          duration: '1H',
          coef: 1.5,
        },
        {
          title: 'Chimie',
          duration: '2H',
          coef: 4,
        },
        {
          title: 'Culture générale',
          duration: '1H',
          coef: 2,
        },
      ],
    },
  ];

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
              localStorage.removeItem('haveCandidature');
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

  goTopPage(): void {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

}
