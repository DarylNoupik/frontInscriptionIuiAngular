import { Component, OnInit } from '@angular/core';
import { SitesService } from "../../_services/sites.service";
import { ISite } from "../../_interfaces/site";
import { ICandidature } from "../../_interfaces/icandidature";
import { CandidatureService } from "../../_services/candidature.service";
import { Route, Router } from "@angular/router";
import { SessionService } from "../../_services/session.service";
import { ISessionModel } from 'src/app/_interfaces/isession-model';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inscription-form1',
  templateUrl: './inscription-form1.component.html',
  styleUrls: ['./inscription-form1.component.css']
})
export class InscriptionForm1Component implements OnInit {
  public site: any;
  public centreBySite: any;
  public step: number = 1;
  public showForm: boolean = false;
  public showCentre: boolean = true;
  public candidatureForm: ICandidature = {
    langue: "",
    email_parents: "",
    statut: "En_Attente",
    code_examen: 0,
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
  public allcodes: any;
  public codeExists: boolean = false;
  public exitscode: any;
  public codeValid: boolean = false;
  public disableOption1 = false;
  public disableOption2 = false;
  public disableOption3 = false;


  constructor(
    private siteService: SitesService,
    private candidatureService: CandidatureService,
    private router: Router,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private http: HttpClient
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
    this.showForm = !this.showForm;
    for (let i = 0; i < this.centreBySite.length; i++) {
      if (this.candidatureForm.centre === this.centreBySite[i].nom) {
        this.msgPaiement = "Attention ! Pour valider votre candidature vous devez verser" +
          " le montant correspondant au nombre de formation que" +
          " vous avez choisi ci-dessus, par ORANGE MONEY " +
          "(utilisez le code #150*47# ensuite entrer le code 381721) . " +
          "Après votre paiement, l'opérateur va vous renvoyer automatiquement et" +
          " immédiatement un numéro d'identification de votre transaction qu'il faut noter dans le cadre ci dessous.";
        this.showNumberPaiement = true;
      }
    }
    if (this.msgPaiement === "") {
      this.msgPaiement = "Entrer le code de paiement recu lors du versement des frais de concours,  effectué dans votre centre d'examen ! " +
        "Attention!!! Votre inscription ne sera valide que lorsque ce numéro sera confirmé !"
      this.showNumberPaiement = false;
    }

    this.showCentre = !this.showForm;
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

    this.candidatureService.addCandidature(this.candidatureForm).subscribe({
      next: (data) => {
        localStorage.setItem('haveCandidature', 'true');
        this.toastr.success("Candidature prise en compte avec success", 'Candidature insérée');
        this.router.navigate(['/candidat/home']);
      },
      error: (err) => {
        let msgError = "Une erreur s'est produite ! \n Cette candidature n'a pas pu être prise en compte. \ Veillez vérifier vos informatons, votre connexion internet et réessayez!!!";
        this.toastr.error(msgError, 'Inscription échouée');
      }
    })

    return true;
  }
}
