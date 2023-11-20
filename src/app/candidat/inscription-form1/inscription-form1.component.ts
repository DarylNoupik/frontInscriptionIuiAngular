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
import { IZone } from 'src/app/_interfaces/izone';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { createNumberValidator } from 'src/app/shared/validators/number_validator';

@Component({
  selector: 'app-inscription-form1',
  templateUrl: './inscription-form1.component.html',
  styleUrls: ['./inscription-form1.component.css']
})
export class InscriptionForm1Component implements OnInit {
  public site!: ISite[];
  uploadedFile!: string;
  public actualDate = new Date();
  selectZone!: IZone;
  public centreBySite: any;
  public step: number = 1;
  public showForm: boolean = false;
  public showCentre: boolean = true;
  public candidatureForm: ICandidature = {
    langue: "",
    hasExchange: "",
    serie_bac: "",
    statut: "En_Attente",
    cycle: "",
    compteID: Number(localStorage.getItem('idCandidat')),
    code_examen: 0,
    sessionId: 0,
    nationalite: "",
    genre: "",
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
    candidatureActif: true,
    nom_parent1: '',
    nom_parent2: '',
    diplome_universitaire: '',
    email_pere: '',
    telephone_pere: '',
    email_tuteur: '',
    telephone_tuteur: '',
    telephone_mere: '',
    email_mere: '',
    formation_principal: ''
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
  public currentDate: Date = new Date();

  formStep1: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.minLength(8), Validators.required, createNumberValidator()]),
    email: new FormControl('', [Validators.required, Validators.email,]),
  });

  formStep2: FormGroup = new FormGroup({
    date_naissance: new FormControl('', [Validators.required]),
    nationalite: new FormControl('', [Validators.required]),
    ville: new FormControl('', [Validators.required]),
    lieu_naissance: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
  });

  formStep3: FormGroup = new FormGroup({
    email_pere: new FormControl('', []),
    telephone_pere: new FormControl('', [Validators.required, Validators.minLength(8), createNumberValidator()]),
    email_tuteur: new FormControl('', []),
    telephone_tuteur: new FormControl('', [Validators.required, Validators.minLength(8), createNumberValidator()]),
    email_mere: new FormControl('', []),
    telephone_mere: new FormControl('', [Validators.required, Validators.minLength(8), createNumberValidator()]),
    nom_parent2: new FormControl('', [Validators.required]),
    nom_parent1: new FormControl('', [Validators.required]),
  });

  formStep4: FormGroup = new FormGroup({
    dernier_etablissement: new FormControl('', [Validators.required]),
    langue: new FormControl('', [Validators.required]),
    paiement: new FormControl({ value: "", disabled: true }, []),
    cycle: new FormControl('', [Validators.required]),
    diplome_universitaire: new FormControl('', []),
    image: new FormControl('', []),
    hasExchange: new FormControl('', [Validators.required]),
    serie_bac: new FormControl('', [Validators.required]),
    formation2: new FormControl('', []),
    formation3: new FormControl('', []),
    formation1: new FormControl('', []),
  });

  formStep5: FormGroup = new FormGroup({
    telephone_paiement: new FormControl('', [Validators.required, Validators.minLength(8), createNumberValidator()]),
    reference_paiement: new FormControl('', [Validators.required]),
  });

  constructor(
    private tokenService: TokenService,
    private userService: UsersService,
    private siteService: SitesService,
    private candidatureService: CandidatureService,
    private router: Router,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.currentDate = new Date();
    this.currentDate.setFullYear(new Date().getFullYear() - 15);
  }


  get form1Controls(): { [key: string]: AbstractControl } {
    return this.formStep1.controls;
  }

  get form2Controls(): { [key: string]: AbstractControl } {
    return this.formStep2.controls;
  }

  get form3Controls(): { [key: string]: AbstractControl } {
    return this.formStep3.controls;
  }

  get form4Controls(): { [key: string]: AbstractControl } {
    return this.formStep4.controls;
  }

  get form5Controls(): { [key: string]: AbstractControl } {
    return this.formStep5.controls;
  }

  checkIf2Cycle() {
    if (this.formStep4.get('cycle')?.value == '2nd cycle') {
      this.formStep4.get('diplome_universitaire')?.addValidators(Validators.required);
    } else {
      this.formStep4.get('diplome_universitaire')?.removeValidators(Validators.required);
    }
    this.formStep4.updateValueAndValidity();
  }

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

    let email = this.tokenService.getEmail();
    this.userService.getUserByEmail(email).subscribe({
      next: data => {
        this.compteform = {
          name: data.name,
          prenom: data.prenom,
          password: data.prenom,
          email: data.email,
          telephone: data.telephone.toString(),
          role: data.role,
          id_disponibilite: data.id_disponibilite,
          idZone: data.idZone,
        };

        this.formStep1 = new FormGroup({
          nom: new FormControl(data.name, [Validators.required]),
          prenom: new FormControl(data.prenom, [Validators.required]),
          telephone: new FormControl(data.telephone.toString(), [Validators.minLength(8), Validators.required, createNumberValidator()]),
          email: new FormControl(data.email, [Validators.required, Validators.email,]),
        });

        this.step = this.step + 1;

        this.candidatureForm.compteID = data.id;
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
    if ((this.formStep4.get('formation1')?.value && !this.formStep4.get('formation2')?.value && !this.formStep4.get('formation3')?.value) || (!this.formStep4.get('formation1')?.value && this.formStep4.get('formation2')?.value && !this.formStep4.get('formation3')?.value) || (!this.formStep4.get('formation1')?.value && !this.formStep4.get('formation2')?.value && this.formStep4.get('formation3')?.value)) {
      this.candidatureForm.nombre_choix = 1;
      this.disableOption1 = false;
      this.disableOption2 = true;
      this.disableOption3 = true;

    } else if ((this.formStep4.get('formation1')?.value && this.formStep4.get('formation2')?.value && !this.formStep4.get('formation3')?.value) || (this.formStep4.get('formation1')?.value && !this.formStep4.get('formation2')?.value && this.formStep4.get('formation3')?.value) || (!this.formStep4.get('formation1')?.value && this.formStep4.get('formation2')?.value && this.formStep4.get('formation3')?.value)) {
      this.candidatureForm.nombre_choix = 2;
      this.disableOption1 = true;
      this.disableOption2 = false;
      this.disableOption3 = true;
    } else if (this.formStep4.get('formation1')?.value && this.formStep4.get('formation2')?.value && this.formStep4.get('formation3')?.value) {
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
      this.msgPaiement = ""
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
    this.candidatureForm = {
      dernier_Etablissement: this.formStep4.get('dernier_etablissement')?.value,
      langue: this.formStep4.get('langue')?.value,
      paiement: this.formStep4.get('paiement')?.value,
      cycle: this.formStep4.get('cycle')?.value,
      diplome_universitaire: this.formStep4.get('diplome_universitaire')?.value,
      image: this.formStep4.get('image')?.value,
      hasExchange: this.formStep4.get('hasExchange')?.value,
      serie_bac: this.formStep4.get('serie_bac')?.value,
      formation1: this.formStep4.get('formation1')?.value,
      formation2: this.formStep4.get('formation2')?.value,
      formation3: this.formStep4.get('formation3')?.value,
      formation_principal: this.formStep4.get('formation_principal')?.value,

      reference_paiement: this.formStep5.get('reference_paiement')?.value,
      telephone_paiement: this.formStep5.get('telephone_paiement')?.value,

      email_pere: this.formStep3.get('email_pere')?.value,
      telephone_pere: this.formStep3.get('telephone_pere')?.value,
      email_tuteur: this.formStep3.get('email_tuteur')?.value,
      telephone_tuteur: this.formStep3.get('telephone_tuteur')?.value,
      email_mere: this.formStep3.get('email_mere')?.value,
      telephone_mere: this.formStep3.get('telephone_mere')?.value,
      nom_parent2: this.formStep3.get('nom_parent2')?.value,
      nom_parent1: this.formStep3.get('nom_parent1')?.value,

      date_naissance: this.formStep2.get('date_naissance')?.value,
      nationalite: this.formStep2.get('nationalite')?.value,
      ville: this.formStep2.get('ville')?.value,
      lieu_de_naissance: this.formStep2.get('lieu_naissance')?.value,
      genre: this.formStep2.get('genre')?.value,

      sessionId: this.session.id,
      statut: "En_Attente",
      compteID: this.candidatureForm.compteID,
      code_examen: 0,
      nombre_choix: this.candidatureForm.nombre_choix,
      centre: this.candidatureForm.centre,
      centreExamenId: this.candidatureForm.centreExamenId,
      candidatureActif: true,
    };

    this.compteform.idZone = this.selectZone.id;
    this.candidatureForm.sessionId = this.session.id;
    this.addCandidature()
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
