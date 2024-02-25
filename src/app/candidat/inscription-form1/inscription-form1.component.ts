import { Component, HostListener, OnInit } from '@angular/core';
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
import { createCamerounianNumberValidator, createInternationalNumberValidator, createStringValidatior, dateValidator, emailValidatior } from 'src/app/shared/validators/number_validator';

@Component({
  selector: 'app-inscription-form1',
  templateUrl: './inscription-form1.component.html',
  styleUrls: ['./inscription-form1.component.css']
})
export class InscriptionForm1Component implements OnInit {
  public site!: ISite[];
  public indices: string[] = [
    "+237", "+30", "+31", "+32", "+33", "+34", "+36", "+39", "+40", "+41", "+43", "+44", "+45", "+46", "+47", "+48", "+49", "+350", "+351", "+352", "+353", "+354", "+355", "+356", "+357", "+358", "+359", "+370", "+371", "+372", "+373", "+374", "+375", "+376", "+377", "+378", "+379", "+380", "+381", "+382", "+383", "+385", "+386", "+387", "+389", "+420", "+421", "+423", "+213", "+244", "+229", "+267", "+226", "+257", "+238", "+236", "+235", "+269", "+242", "+243", "+225", "+253", "+20", "+240", "+291", "+251", "+266", "+261", "+223", "+356", "+222", "+230", "+222", "+258", "+212", "+258", "+234", "+227", "+47", "+256", "+250", "+239", "+221", "+248", "+232", "+421", "+386", "+252", "+27", "+211", "+249", "+232", "+228", "+216", "+90", "+256", "+255", "+256", "+260"
  ];
  public lieux = [
    "Douala", "Yaoundé", "Garoua", "Bafoussam", "Maroua", "Bamenda", "Ngaoundéré", "Bertoua", "Ébolowa", "Loum", "Kumba", "Mbouda", "Dschang", "Foumban", "Kribi", "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Saint-Étienne", "Toulon", "Brazzaville", "Pointe-Noire", "Dolisie", "Nkayi", "Owando", "Impfondo", "Madingou", "Sibiti", "Gamboma", "Kinkala", "Kindamba", "Mossendjo", "Makoua", "Ewo", "Ouesso", "N'Djamena", "Moundou", "Sarh", "Abéché", "Kélo", "Doba", "Koumra", "Pala", "Am Timan", "Bongor", "Mongo", "Ati", "Fada", "Massakory", "Biltine", "Bangui", "Bimbo", "Berbérati", "Carnot", "Bria", "Bossangoa", "Bozoum", "Nola", "Kaga-Bandoro", "Sibut", "Mbaïki", "Damara", "Mobaye", "Grimari", "Dékoa",
    "Rio de Janeiro", "São Paulo", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre", "Belém", "Goiânia", "Guarulhos", "Campinas", "São Luís", "Libreville", "Port-Gentil", "Franceville", "Oyem", "Moanda", "Mouila", "Lambaréné", "Tchibanga", "Koulamoutou", "Makokou", "Lastoursville", "Mounana", "Gamba", "Bitam", "Ndendé", "Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru", "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow", "Surat", "Kanpur", "Nagpur", "Indore", "Thane", "Quito", "Guayaquil", "Cuenca", "Santo Domingo de los Colorados", "Machala", "Manta", "Portoviejo", "Ambato", "Durán", "Loja", "Esmeraldas", "Quevedo", "Ibarra", "Riobamba", "Latacunga"
  ];

  public nationalities: string[] = [
    "Français(e)",
    "Équatorien(e)",
    "Camerounais(e)",
    "Brésilien(e)",
    "Congolais(e) (RC)",
    "Indien(e)",
    "Congolais(e) (RDC)",
];

  public hasActiveSession!: boolean;
  uploadedFile!: string;
  selectedFile! : File;
  public actualDate = new Date();
  selectZone!: IZone;
  public centreBySite: any;
  public step: number = 1;
  public indiceTelephoneCandidat: string = "+237";
  public indiceTelephonePere: string = "+237";
  public indiceTelephoneMere: string = "+237";
  public indiceTelephoneTuteur: string = "+237";
  public indiceTelephoneTransaction: string = "+237";
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
  public dateBefore15Date: Date = new Date();

  mobileView = false;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.checkDevice();
  }

  formStep1: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(3), createStringValidatior()]),
    prenom: new FormControl('', [Validators.required, createStringValidatior()]),
    telephone: new FormControl('', [Validators.minLength(8), Validators.required, createCamerounianNumberValidator()]),
    email: new FormControl('', [Validators.required, Validators.email,emailValidatior()]),
  });

  changeValidator(indice: string, libelle: string, indiceElement: string) {
    if (indiceElement == "indiceTelephoneCandidat") {
    this.indiceTelephoneCandidat = indice;
    }
    if (indiceElement == "indiceTelephonePere") {
    this.indiceTelephonePere = indice;
    }
    if (indiceElement == "indiceTelephoneMere") {
    this.indiceTelephoneMere = indice;
    }
    if (indiceElement == "indiceTelephoneTuteur") {
    this.indiceTelephoneTuteur = indice;
    }
    if (indiceElement == "indiceTelephoneTransaction") {
    this.indiceTelephoneTransaction = indice;
    }
console.log("indice:",indice);
console.log("step:",this.step);


    if (this.step == 1) {
      if (indice == "+237") {
        this.formStep1.get(libelle)!.removeValidators(createInternationalNumberValidator());
        this.formStep1.get(libelle)!.addValidators(createCamerounianNumberValidator());
        } else {
          this.formStep1.get(libelle)!.removeValidators(createCamerounianNumberValidator());
        this.formStep1.get(libelle)!.addValidators(createInternationalNumberValidator());
        }

        this.formStep1.updateValueAndValidity();
    }

    if (this.step == 3) {
      if (indice == "+237") {
        this.formStep3.get(libelle)!.removeValidators(createInternationalNumberValidator());
        this.formStep3.get(libelle)!.addValidators(createCamerounianNumberValidator());
        } else {
          this.formStep3.get(libelle)!.removeValidators(createCamerounianNumberValidator());
        this.formStep3.get(libelle)!.addValidators(createInternationalNumberValidator());
        }
        this.formStep3.updateValueAndValidity();
    }

    if (this.step == 5) {
      if (indice == "+237") {
        this.formStep5.get(libelle)!.removeValidators(createInternationalNumberValidator());
        this.formStep5.get(libelle)!.addValidators(createCamerounianNumberValidator());
        } else {
          this.formStep5.get(libelle)!.removeValidators(createCamerounianNumberValidator());
        this.formStep5.get(libelle)!.addValidators(createInternationalNumberValidator());
        }
        this.formStep5.updateValueAndValidity();
    }
  }

  formStep2: FormGroup = new FormGroup({
    date_naissance: new FormControl('', [Validators.required, dateValidator()]),
    nationalite: new FormControl('', [Validators.minLength(2), Validators.required, createStringValidatior()]),
    ville: new FormControl('', [Validators.minLength(3), Validators.required, createStringValidatior()]),
    lieu_naissance: new FormControl('', [Validators.minLength(5), Validators.required, createStringValidatior()]),
    genre: new FormControl('', [Validators.required]),
  });

  formStep3: FormGroup = new FormGroup({
    email_pere: new FormControl('', [Validators.email, emailValidatior()]),
    telephone_pere: new FormControl('', [Validators.required, Validators.minLength(8), createCamerounianNumberValidator()]),
    email_tuteur: new FormControl('', []),
    telephone_tuteur: new FormControl('', []),
    email_mere: new FormControl('', [Validators.email, emailValidatior()]),
    hasTutor: new FormControl('', []),
    telephone_mere: new FormControl('', [Validators.required, Validators.minLength(8), createCamerounianNumberValidator()]),
    nom_parent2: new FormControl('', [Validators.required, Validators.minLength(3), createStringValidatior()]),
    nom_parent1: new FormControl('', [Validators.required, Validators.minLength(3),createStringValidatior()]),
  });

  formStep4: FormGroup = new FormGroup({
    dernier_etablissement: new FormControl('', [Validators.required]),
    nombre_formation: new FormControl('', [Validators.required]),
    formation_principal: new FormControl('', []),
    langue: new FormControl('', [Validators.required]),
    paiement: new FormControl({ value: "", disabled: true }, []),
    cycle: new FormControl('', [Validators.required]),
    diplome_universitaire: new FormControl('', []),
    image: new FormControl('', []),
    hasExchange: new FormControl('', [Validators.required]),
    serie_bac: new FormControl('', [Validators.required]),
    serie_bac_input: new FormControl('', []),
    formation2: new FormControl('', []),
    formation3: new FormControl('', []),
    formation1: new FormControl('', []),
  });

  formStep5: FormGroup = new FormGroup({
    telephone_paiement: new FormControl('', [Validators.required, Validators.minLength(8), createCamerounianNumberValidator()]),
    reference_paiement: new FormControl('', [Validators.required]),
  });

  changeValidatorOfTutor(answer: string) {
    if (answer == 'Oui') {
      this.formStep3.get('telephone_tuteur')?.addValidators([Validators.required, Validators.minLength(8), createCamerounianNumberValidator()]);
      this.formStep3.get('email_tuteur')?.addValidators([Validators.email, emailValidatior()]);
      
      this.formStep3.get('telephone_tuteur')?.updateValueAndValidity();
      this.formStep3.get('email_tuteur')?.updateValueAndValidity();
      
    } else {
      this.formStep3.get('telephone_tuteur')?.clearValidators();
      this.formStep3.get('email_tuteur')?.clearValidators();

      this.formStep3.get('telephone_tuteur')?.updateValueAndValidity();
      this.formStep3.get('email_tuteur')?.updateValueAndValidity();
    }

    this.formStep3.updateValueAndValidity()
  }

  changeValidatorFormation(){
    if (this.formStep4.get('nombre_formation')?.value == "01")
    {
      this.formStep4.get('formation1')?.setValidators([Validators.required]);

      this.formStep4.get('formation2')?.clearValidators();
      this.formStep4.get('formation3')?.clearValidators();

      this.formStep4.get('formation2')?.setValue("")
      this.formStep4.get('formation3')?.setValue("")

      this.formStep4.get('formation1')?.updateValueAndValidity();
      this.formStep4.get('formation2')?.updateValueAndValidity();
      this.formStep4.get('formation3')?.updateValueAndValidity();

      console.log("formation1 "+this.formStep4.get('formation1')?.value)
      console.log("formation2 "+this.formStep4.get('formation2')?.value)
      console.log("formation3 "+this.formStep4.get('formation3')?.value)
    }

    if (this.formStep4.get('nombre_formation')?.value == "02")
    {
      this.formStep4.get('formation1')?.setValidators([Validators.required]);
      this.formStep4.get('formation2')?.setValidators([Validators.required]);

      this.formStep4.get('formation3')?.clearValidators();

      this.formStep4.get('formation3')?.setValue("")

      this.formStep4.get('formation1')?.updateValueAndValidity();
      this.formStep4.get('formation2')?.updateValueAndValidity();
      this.formStep4.get('formation3')?.updateValueAndValidity();

      console.log("formation1 "+this.formStep4.get('formation1')?.value)
      console.log("formation2 "+this.formStep4.get('formation2')?.value)
      console.log("formation3 "+this.formStep4.get('formation3')?.value)
    }

    if (this.formStep4.get('nombre_formation')?.value == "03")
    {
      this.formStep4.get('formation1')?.setValidators([Validators.required]);
      this.formStep4.get('formation2')?.setValidators([Validators.required]);
      this.formStep4.get('formation3')?.setValidators([Validators.required]);

      this.formStep4.get('formation1')?.updateValueAndValidity();
      this.formStep4.get('formation2')?.updateValueAndValidity();
      this.formStep4.get('formation3')?.updateValueAndValidity();

      console.log("formation1 "+this.formStep4.get('formation1')?.value)
      console.log("formation2 "+this.formStep4.get('formation2')?.value)
      console.log("formation3 "+this.formStep4.get('formation3')?.value)
    }
    
    this.formStep4.updateValueAndValidity();
  }

  constructor(
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

  checkIfSerieBacc() {
    if (this.formStep4.get('serie_bac')?.value == 'Autre') {
      this.formStep4.get('serie_bac_input')?.addValidators(Validators.required);
    } else {
      this.formStep4.get('serie_bac_input')?.removeValidators(Validators.required);
    }
    this.formStep4.updateValueAndValidity();
  }

  checkDevice() {
    if (window.innerWidth <= 587) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }
  }

  ngOnInit(): void {
    this.dateBefore15Date.setFullYear(this.currentDate.getFullYear() - 15);
    this.checkDevice();

    this.sessionService.getActiveSession().subscribe({
      next: data => {
        this.session = data;
        if (data?.id) {
          this.hasActiveSession = true;
        }
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
    if (this.candidatureForm.centre.length > 0) {
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
    } else {
      let msgError = "Veuillez selectionner le centre au préalable avant de continuer.";
      this.toastr.error(msgError, 'Centre non sélectionné');
    }
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
        console.log("allcodes", this.allcodes);
        console.log("exitscode", this.exitscode);
        console.log("reference_paiement", this.formStep5.get('reference_paiement')?.value);

        if (this.allcodes.includes(this.formStep5.get('reference_paiement')?.value) === true) {
          if (this.exitscode.includes(this.formStep5.get('reference_paiement')?.value) === true) {
            this.codeExists = true;
            this.codeValid = false;
          } else {
            this.codeExists = false;
            this.codeValid = true;
          }
        }
      });
  }

  generateRandomPassword(length: number): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  onSubmit() {
    this.compteform = {
      name: this.formStep1.get('nom')?.value,
      prenom: this.formStep1.get('prenom')?.value,
      password: this.generateRandomPassword(8),
      email: this.formStep1.get('email')?.value,
      telephone: this.indiceTelephoneCandidat + "" + this.formStep1.get('telephone')?.value,
      role: "CANDIDAT",
      id_disponibilite: 0,
      idZone: this.selectZone.id
    };
    this.candidatureForm = {
      dernier_Etablissement: this.formStep4.get('dernier_etablissement')?.value,
      langue: this.formStep4.get('langue')?.value,
      paiement: this.formStep4.get('paiement')?.value,
      cycle: this.formStep4.get('cycle')?.value,
      diplome_universitaire: this.formStep4.get('diplome_universitaire')?.value,
      image: this.formStep4.get('image')?.value,
      hasExchange: this.formStep4.get('hasExchange')?.value,
      serie_bac: this.formStep4.get('serie_bac')?.value === 'Autre' ? this.formStep4.get('serie_bac_input')?.value : this.formStep4.get('serie_bac')?.value,
      formation1: this.formStep4.get('formation1')?.value,
      formation2: this.formStep4.get('formation2')?.value,
      formation3: this.formStep4.get('formation3')?.value,
      formation_principal: this.formStep4.get('formation_principal')?.value,

      reference_paiement: this.formStep5.get('reference_paiement')?.value,
      telephone_paiement: this.indiceTelephoneTransaction + "" + this.formStep5.get('telephone_paiement')?.value,

      email_pere: this.formStep3.get('email_pere')?.value,
      telephone_pere: this.indiceTelephonePere + "" + this.formStep3.get('telephone_pere')?.value,
      email_tuteur: this.formStep3.get('email_tuteur')?.value,
      telephone_tuteur: this.indiceTelephoneTuteur + "" + this.formStep3.get('telephone_tuteur')?.value,
      email_mere: this.formStep3.get('email_mere')?.value,
      telephone_mere: this.indiceTelephoneMere + "" + this.formStep3.get('telephone_mere')?.value,
      nom_parent2: this.formStep3.get('nom_parent2')?.value,
      nom_parent1: this.formStep3.get('nom_parent1')?.value,

      date_naissance: this.formStep2.get('date_naissance')?.value,
      nationalite: this.formStep2.get('nationalite')?.value,
      ville: this.formStep2.get('ville')?.value,
      lieu_de_naissance: this.formStep2.get('lieu_naissance')?.value,
      genre: this.formStep2.get('genre')?.value,

      sessionId: this.session.id,
      statut: "En_Attente",
      compteID: Number(localStorage.getItem('idCandidat')) || 0,
      code_examen: 0,
      nombre_choix: this.candidatureForm.nombre_choix,
      centre: this.candidatureForm.centre,
      centreExamenId: this.candidatureForm.centreExamenId,
      candidatureActif: true,
    };

    /*this.authService.register(this.compteform).subscribe({
      next: value => {
        this.candidatureForm.compteID = value.id;
        this.addCandidature()
      },
      error: err => {
        let msgError = "Une erreur s'est produite ! \n Cette candidature n'a pas pu être prise en compte. \ Veillez vérifier vos informatons, votre connexion internet et réessayez!!!";
        this.toastr.error(msgError, 'Inscription échouée');
        console.log(err);
      }
    });*/
    this.addCandidature();
    return true;
  }

  addCandidature() {
    this.candidatureService.addCandidature(this.candidatureForm).subscribe({
      next: (data) => {
        const formData = new FormData();
        formData.append('image', this.selectedFile);

        this.candidatureService.uploadImage(this.selectedFile, data.id!).subscribe(
          (response) => {
            console.log('Image uploaded successfully:', response);
            // Traitez la réponse comme nécessaire
          },
          (error) => {
            console.error('Error uploading image:', error);
            // Traitez les erreurs comme nécessaire
          }
        );

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
    this.selectedFile = event!.target!.files[0] as File;
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

