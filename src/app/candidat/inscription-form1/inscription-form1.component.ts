import { Component, OnInit } from '@angular/core';
import { SitesService } from "../../_services/sites.service";
import { ISite } from "../../_interfaces/site";
import { ICandidature } from "../../_interfaces/icandidature";
import { CandidatureService } from "../../_services/candidature.service";
import { Route, Router } from "@angular/router";
import { SessionService } from "../../_services/session.service";
import { ISessionModel } from 'src/app/_interfaces/isession-model';
import { HttpClient } from "@angular/common/http";
import { ICentre } from "../../_interfaces/icentre";
import { ToastrService } from 'ngx-toastr';
import { IUtilisateur } from "../../_interfaces/utilisateur";
import { AuthenticationService } from "../../_services/authentication.service";
import { TokenService } from 'src/app/_services/token.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-inscription-form1',
  templateUrl: './inscription-form1.component.html',
  styleUrls: ['./inscription-form1.component.css']
})
export class InscriptionForm1Component implements OnInit {
  public site!: ISite[];
  uploadedFile!: string;
  public centreBySite: any;
  public step: number = 1;
  public showForm: boolean = false;
  public showCentre: boolean = true;
  public candidatureForm: ICandidature = {
    langue: "",
    email_parents: "",
    statut: "En_Attente",
    cycle: "",
    compteID: Number(localStorage.getItem('idCandidat')),
    nationalite: "",
    genre: "",
    tel_parents: "",
    date_naissance: "",
    image: "",
    formation2: "",
    formation3: "",
    paiement: "",
    formation1: "",
    reference_paiement: "",
    telephone_paiement: "",
    dernier_Etablissement: "",
    lieu_de_naissance: "",
    ville: "",
    nombre_choix: 0,
    centre: "",
    candidatureActif: true
  };
  public compteform: IUtilisateur = {
    name: "",
    prenom: "",
    password: "",
    email: "",
    role: "CANDIDAT",
    id_disponibilite: 0
  };
  public session: ISessionModel = {
    id: 0,
    nom: "",
    date_debut: new Date(),
    date_limite: new Date(),
    date_examen: new Date(),
    statut: false
  };
  public listCentre: any;
  public msgPaiement: string = "";
  public showNumberPaiement: boolean = false;
  public showPersonnalForm: boolean = false;
  public allcodes: any;
  public codeExists: boolean = false;
  public exitscode: any;
  public codeValid: boolean = false;
  public disableOption1 = false;
  public disableOption2 = false;
  public disableOption3 = false;
  public siteSelected!: ISite;


  constructor(
    private siteService: SitesService,
    private candidatureService: CandidatureService,
    private router: Router,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private http: HttpClient,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.sessionService.getActiveSession().subscribe({
      next: data => {
        this.session = data;
      },
      error: err => console.log(err)
    });
    this.siteService.getAllSite().subscribe({
      next: data => {
        this.site = data;
        console.log("###################Voci les sites");
        console.log(data);
      },
      error: err => console.log(err)
    });

    this.siteService.getCenterBySite(1).subscribe({
      next: data => {
        this.centreBySite = data
        for (let i = 0; i < data.length; i++) {
          this.listCentre[i] = data.nom;
        }
      },
    });
  }

  setStep(step: number) {
    this.step = step;
  }

  updateSelections() {
    if ((this.candidatureForm.formation1 && !this.candidatureForm.formation2 && !this.candidatureForm.formation3) || (!this.candidatureForm.formation1 && this.candidatureForm.formation2 && !this.candidatureForm.formation3) || (!this.candidatureForm.formation1 && !this.candidatureForm.formation2 && this.candidatureForm.formation3)) {
      console.log("##############Op1");
      this.candidatureForm.nombre_choix = 1;
      this.disableOption1 = false;
      this.disableOption2 = true;
      this.disableOption3 = true;

    } else if ((this.candidatureForm.formation1 && this.candidatureForm.formation2 && !this.candidatureForm.formation3) || (this.candidatureForm.formation1 && !this.candidatureForm.formation2 && this.candidatureForm.formation3) || (!this.candidatureForm.formation1 && this.candidatureForm.formation2 && this.candidatureForm.formation3)) {
      console.log("##############Op2");
      this.candidatureForm.nombre_choix = 2;
      this.disableOption1 = true;
      this.disableOption2 = false;
      this.disableOption3 = true;
    } else if (this.candidatureForm.formation1 && this.candidatureForm.formation2 && this.candidatureForm.formation3) {
      console.log("##############Op3");
      this.candidatureForm.nombre_choix = 3;
      this.disableOption1 = true;
      this.disableOption2 = true;
      this.disableOption3 = false;
    } else {
      console.log("##############Else");
      this.disableOption1 = false;
      this.disableOption2 = false;
      this.disableOption3 = false;
      this.candidatureForm.nombre_choix = 0;
    }
  }

  toggleForm(): void {
    console.log(this.candidatureForm.centre);
    console.log(this.site);

    for (let i = 0; i < this.site.length; i++) {
      if (this.isInCentre(this.candidatureForm.centre, this.site[i].centreExamenList) == true) {
        this.siteSelected = this.site[i];
      }
    }
    console.log(this.siteSelected);
    this.showForm = !this.showForm;

    for (let i = 0; i < this.centreBySite.length; i++) {
      if (this.candidatureForm.centre === this.centreBySite[i].nom) {
        this.msgPaiement = " test ";
        this.showNumberPaiement = true;
      }
    }
    if (this.msgPaiement === "") {
      this.msgPaiement = "testetse"
      this.showNumberPaiement = false;
    }

    this.showCentre = !this.showForm;
  }

  isInCentre(centre: string, listCentre: ICentre[]): boolean {
    let resp: boolean = false;
    for (let i = 0; i < listCentre.length; i++) {
      if (centre === listCentre[i].nom) {
        resp = true;
      }
    }
    return resp;
  }

  checkCode() {
    this.candidatureService.allCodes().subscribe(
      (response) => {
        this.allcodes = response.allCode;
        this.exitscode = response.existCode;

        if (this.showNumberPaiement) {
          if (this.exitscode.includes(this.candidatureForm.reference_paiement) === true) {
            this.codeExists = true;
            this.codeValid = false;
          } else {
            this.codeExists = false;
            this.codeValid = false;
          }
        } else {
          if (this.exitscode.includes(this.candidatureForm.reference_paiement) === true) {
            this.codeExists = true;
            this.codeValid = false;
          } else if (this.exitscode.includes(this.candidatureForm.reference_paiement) === false && this.allcodes.includes(this.candidatureForm.reference_paiement) === false) {
            this.codeExists = true;
            this.codeValid = false;
          } else {
            this.codeExists = false;
            this.codeValid = true;
          }
        }
      });
  }

  onSubmit() {
    if (this.candidatureForm.formation1 && !this.candidatureForm.formation2 && !this.candidatureForm.formation3) {
      this.candidatureForm.formation1 = "FA";
      this.candidatureForm.formation2 = "";
      this.candidatureForm.formation3 = "";
    } if (this.candidatureForm.formation1 && this.candidatureForm.formation2 && !this.candidatureForm.formation3) {
      this.candidatureForm.formation1 = "FA";
      this.candidatureForm.formation2 = "OP";
      this.candidatureForm.formation3 = "";
    } if (this.candidatureForm.formation1 && !this.candidatureForm.formation2 && this.candidatureForm.formation3) {
      this.candidatureForm.formation1 = "FA";
      this.candidatureForm.formation2 = "X";
      this.candidatureForm.formation3 = "";
    }

    if (!this.candidatureForm.formation1 && !this.candidatureForm.formation2 && !this.candidatureForm.formation3) {
      this.candidatureForm.formation1 = "";
      this.candidatureForm.formation2 = "";
      this.candidatureForm.formation3 = "";
    } if (!this.candidatureForm.formation1 && this.candidatureForm.formation2 && !this.candidatureForm.formation3) {
      this.candidatureForm.formation1 = "OP";
      this.candidatureForm.formation2 = "";
      this.candidatureForm.formation3 = "";
    } if (!this.candidatureForm.formation1 && !this.candidatureForm.formation2 && this.candidatureForm.formation3) {
      this.candidatureForm.formation1 = "X";
      this.candidatureForm.formation2 = "";
      this.candidatureForm.formation3 = "";
    }


    if (!this.candidatureForm.formation1 && this.candidatureForm.formation2 && !this.candidatureForm.formation3) {
      this.candidatureForm.formation1 = "";
      this.candidatureForm.formation2 = "";
      this.candidatureForm.formation3 = "";

    } if (!this.candidatureForm.formation1 && this.candidatureForm.formation2 && this.candidatureForm.formation3) {
      this.candidatureForm.formation1 = "OP";
      this.candidatureForm.formation2 = "X";
      this.candidatureForm.formation3 = "";
    }

    switch (this.candidatureForm.nombre_choix) {
      case 1:
        this.candidatureForm.paiement = "20 000";
        break;
      case 2:
        this.candidatureForm.paiement = "25 000";
        break;
      case 3:
        this.candidatureForm.paiement = "30 000";
        break;
      default:
        this.candidatureForm.paiement = "0";
        break;
    }

    console.log(this.candidatureForm);
    console.log(this.compteform);

    // this.authService.register(this.compteform).subscribe({
    //   next: data => {
    //     console.log(data);
    //     console.log("Inscription réussie");
    //   },
    //   error: err => {
    //     console.log(err);
    //     console.log(err.status);
    //     if (err.status === 200) {
    //       console.log("Inscription réussie");
    //     } else {
    //
    //     }
    //   }
    // });


    // this.candidatureService.addCandidature(this.candidatureForm).subscribe({
    //   next: (data) => {
    //     localStorage.setItem('haveCandidature', 'true');
    //     this.toastr.success("Candidature prise en compte avec success", 'Candidature insérée');
    //     this.router.navigate(['/candidat/home']);
    //   },
    //   error: (err) => {
    //     let msgError = "Une erreur s'est produite ! \n Cette candidature n'a pas pu être prise en compte. \ Veillez vérifier vos informatons, votre connexion internet et réessayez!!!";
    //     this.toastr.error(msgError, 'Inscription échouée');
    //   }
    // })



    return true;
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async onFileChanged(event: any) {
    this.uploadedFile = (await this.convertBlobToBase64(event.target.files[0])) as string;
  }

  createAccount(step: number) {
    console.log(this.compteform);
    this.step = step;
    // if (this.compteform) {
    //   if (this.compteform.password == "") {
    //     this.compteform.password = "Ucac-Candidat-" + this.compteform.id_disponibilite;
    //   }

    //   this.authService.register(this.compteform).subscribe({
    //     next: data => {
    //       console.log(data);
    //       console.log("Votre compte a été crée avec success");
    //       this.toastr.success("Votre compte candidat a été crée avec success", 'Création réussie');
    //       this.step = step;
    //       this.login({
    //         username: this.compteform.email || this.compteform.telephone,
    //         password: this.compteform.password
    //       })
    //     },
    //     error: err => {
    //       console.log(err);
    //       console.log(err.status);
    //       if (err.status === 200) {
    //         console.log("Votre compte a été crée avec success");
    //         this.toastr.success("Votre compte candidat a été crée avec success", 'Création réussie');
    //         this.step = step;
    //         this.login({
    //           username: this.compteform.email || this.compteform.telephone,
    //           password: this.compteform.password
    //         })
    //       } else {
    //         let msgError = "Une erreur s'est produite ! \n Cette adresse mail a été déjà utilisée. \ Veillez vérifier vos informatons, votre connexion internet et réessayez!!!";
    //         this.toastr.error(msgError, 'Création de compte échouée');
    //       }
    //     }
    //   });
    // }
  }

  login(form: any) {
    this.authService.login(form).subscribe({
      next: data => {
        this.tokenService.saveToken(data.accessToken);
        this.userService.getUserByEmail(this.tokenService.decodeToken(data.accessToken).sub).subscribe(
          {
            next: data => {
              localStorage.setItem('idCandidat', String(data.id));
            },
            error: err => console.log(err)
          }
        );
        this.toastr.success("Authentification éffectuée avec success", 'Authentification réussie');
      },
    });
  }

}
