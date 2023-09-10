import { Component, OnInit } from '@angular/core';
import { ISite } from "../../_interfaces/site";
import { ICandidature } from "../../_interfaces/icandidature";
import { IUtilisateur } from "../../_interfaces/utilisateur";
import { ISessionModel } from "../../_interfaces/isession-model";
import { SitesService } from "../../_services/sites.service";
import { CandidatureService } from "../../_services/candidature.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SessionService } from "../../_services/session.service";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "../../_services/authentication.service";
import { ICentre } from "../../_interfaces/icentre";
import { query } from "@angular/animations";
import { IZone } from 'src/app/_interfaces/izone';

@Component({
  selector: 'app-public-form-inscription',
  templateUrl: './public-form-inscription.component.html',
  styleUrls: ['./public-form-inscription.component.css']
})
export class PublicFormInscriptionComponent implements OnInit {
  public site!: ISite[];
  uploadedFile!: string;
  selectZone!: IZone;
  public centreBySite: any;
  public step: number = 1;
  public showForm: boolean = false;
  public showCentre: boolean = true;
  public candidatureForm: ICandidature = {
    langue: "",
    hasExchange: "",
    email_parents: "",
    statut: "En_Attente",
    cycle: "",
    compteID: Number(localStorage.getItem('idCandidat')),
    code_examen: 0,
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
    centreExamenId: 0,
    candidatureActif: true
  };
  public compteform: IUtilisateur = {
    name: "",
    prenom: "",
    password: "pass",
    email: "",
    telephone: "",
    role: "CANDIDAT",
    id_disponibilite: 0,
    idZone: 1
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
  private currentDate: Date = new Date();



  constructor(
    private siteService: SitesService,
    private candidatureService: CandidatureService,
    private router: Router,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private http: HttpClient,
    private authService: AuthenticationService
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

  selectCenter(center: ICentre, zone: IZone) {
    this.candidatureForm.centre = center.nom;
    this.candidatureForm.centreExamenId = center.id;
    this.selectZone = zone;
  }

  setStep(step: number) {
    this.step = step;
  }

  updateSelections() {
    if ((this.candidatureForm.formation1 && !this.candidatureForm.formation2 && !this.candidatureForm.formation3) || (!this.candidatureForm.formation1 && this.candidatureForm.formation2 && !this.candidatureForm.formation3) || (!this.candidatureForm.formation1 && !this.candidatureForm.formation2 && this.candidatureForm.formation3)) {
      this.candidatureForm.nombre_choix = 1;
      this.disableOption1 = false;
      this.disableOption2 = true;
      this.disableOption3 = true;

    } else if ((this.candidatureForm.formation1 && this.candidatureForm.formation2 && !this.candidatureForm.formation3) || (this.candidatureForm.formation1 && !this.candidatureForm.formation2 && this.candidatureForm.formation3) || (!this.candidatureForm.formation1 && this.candidatureForm.formation2 && this.candidatureForm.formation3)) {
      this.candidatureForm.nombre_choix = 2;
      this.disableOption1 = true;
      this.disableOption2 = false;
      this.disableOption3 = true;
    } else if (this.candidatureForm.formation1 && this.candidatureForm.formation2 && this.candidatureForm.formation3) {
      this.candidatureForm.nombre_choix = 3;
      this.disableOption1 = true;
      this.disableOption2 = true;
      this.disableOption3 = false;
    } else {
      this.disableOption1 = false;
      this.disableOption2 = false;
      this.disableOption3 = false;
      this.candidatureForm.nombre_choix = 0;
    }
  }

  toggleForm(): void {
    for (let i = 0; i < this.site.length; i++) {
      if (this.isInCentre(this.candidatureForm.centre, this.site[i].centreExamenList) == true) {
        this.siteSelected = this.site[i];
      }
    }
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

    //this.candidatureForm.code_examen = this.generateCode(this.currentDate, this.candidatureForm.centre, this.candidatureForm.compteID.toString());

    // this.compteform.idZone = this.siteSelected.zone_id;
    this.compteform.idZone = this.selectZone.id;
    this.authService.register(this.compteform).subscribe({
      next: value => {
        this.candidatureForm.compteID = value.id;
        this.addCandidature()
      },
      error: err => {
        console.log(err);
        if (err.status === 200) {
          this.addCandidature()
        }
      }
    });
    return true;
  }

  addCandidature() {
    this.candidatureService.addCandidature(this.candidatureForm).subscribe({
      next: (data) => {
        localStorage.setItem('haveCandidature', 'true');
        this.toastr.success("Candidature prise en compte avec success", 'Candidature insérée');
        this.router.navigate(['/confirm'], { queryParams: { id: this.candidatureForm.compteID, name: this.compteform.name + "  " + this.compteform.prenom, code: data.code_examen, password: this.compteform.password } });
      },
      error: (err) => {
        let msgError = "Une erreur s'est produite ! \n Cette candidature n'a pas pu être prise en compte. \ Veillez vérifier vos informatons, votre connexion internet et réessayez!!!";
        this.toastr.error(msgError, 'Inscription échouée');
      }
    })
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


  generateCode(currentDate: Date, userCity: string, userId: string): string {
    const year = currentDate.getFullYear().toString().slice(-2); // prend les deux derniers caractères de l'année
    const city = userCity.substring(0, 2).toUpperCase(); // prend les deux premiers caractères de la ville et les convertit en majuscules
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // ajoute un zéro au mois s'il est inférieur à 10
    const day = currentDate.getDate().toString().padStart(2, '0'); // ajoute un zéro au jour s'il est inférieur à 10
    const dateString = `${year}${month}${day}`;
    const code = `${city}-${dateString}-${userId}`;
    return code;
  }



  createAccount(step: number) {
    this.step = step;
  }

}
