import { Component, OnInit } from '@angular/core';
import { SessionService } from "../../_services/session.service";
import { ISessionModel } from "../../_interfaces/isession-model";
import { CandidatureService } from "../../_services/candidature.service";
import { TokenService } from "../../_services/token.service";
import { UsersService } from "../../_services/users.service";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from "@angular/common";
import { PLayoutComponent } from '../p-layout/p-layout.component';


@Component({
  selector: 'app-inscription-confirm',
  templateUrl: './inscription-confirm.component.html',
  styleUrls: ['./inscription-confirm.component.css'],
  providers: [DatePipe]
})
export class InscriptionConfirmComponent implements OnInit {
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
  isLoadingPDF: boolean = false;
  public id: null | string = "";
  public name: string | null = "";
  public password: string | null = "";
  public code: string | null = "";
  public nav: any;

  userIsConnected: boolean = false;

  constructor(
    private sessionService: SessionService,
    private candidatureService: CandidatureService,
    private tokenService: TokenService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private pLayoutComponent: PLayoutComponent
  ) {
      this.nav = router.getCurrentNavigation()?.extras.state;
   }

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
    if (token != null) {
      if (this.tokenService.isLogged()) {
        this.userIsConnected = true;
      }
    }
    
    this.id = this.nav?.['id'];
    this.name = this.nav?.['name'];
    this.password = this.nav?.['password'];
    this.code = this.nav?.['code'];
    //this.id = this.route.snapshot.queryParamMap.get('id');
    //this.name = this.route.snapshot.queryParamMap.get('name');
    //this.password = this.route.snapshot.queryParamMap.get('password');
    //this.code = this.route.snapshot.queryParamMap.get('code');



  }

  printPDF() {
    console.log(this.password);
    const doc = new jsPDF();
    const text = `Nom du candidant: ${this.name}\n\n\n Code Examen: ${this.code} \n\n\n Mot de passe: ${this.password}  \n\n\n\n\n Date d'examen: ${this.datePipe.transform(this.session.date_examen, 'fullDate', '', 'fr-FR')}`;
    doc.text(text, 10, 10);
    doc.save('code-examen.pdf');


  }

  public convertToPDF()
  {
    this.isLoadingPDF = true;
    var dataBody = document.getElementById('contact')!;
    var dataNav = document.getElementById('navPublic')!;

    var boutonPrint = document.getElementById('print')!;
    var boutonAccueil = document.getElementById('backHome')!;
    var menu = document.getElementById('nav2')!;
    //var message = document.getElementById('message')!;
    var note = document.getElementById('note')!;
    
    boutonPrint.style.display = 'none';
    boutonAccueil.style.display = 'none';    
    menu.style.display = 'none';    
    //message.style.display = 'none';    
    note.style.display = 'none';    

    console.log("Height" + window.innerHeight);
    console.log("Width" + window.innerWidth);

    // Obtenir la largeur de l'écran
    const screenWidth = window.innerWidth;

    // Variable à contrôler en fonction de la taille de l'écran
    let scale: number;
    let position: number;

    // Contrôler la valeur de la variable en fonction de la taille de l'écran
    if (screenWidth >= 1400) {
      scale = 1.5; //-73.75
      position = -73.75
    } else if (screenWidth >= 1200 && screenWidth < 1400) {
      scale = 1.3;//-73.75 0
      position = -45
    }else if (screenWidth >= 992 && screenWidth < 1200) {
      scale = 1;//-73.75 0
      position = -0
    } else if (screenWidth >= 768 && screenWidth < 992) {
      scale = 0.9;//0
      position = 15
    }else if (screenWidth >= 600 && screenWidth < 768) {
      scale = 0.6; //60
      position = 60
    } else if (screenWidth >= 450 && screenWidth < 600) {
      scale = 0.4; //90
      position = 90
    }else if (screenWidth >= 350 && screenWidth < 450) {
      scale = 0.35; //90
      position = 90
    } else {
      scale = 0.27; //100
      position = 100
    }

    html2canvas(dataNav).then(canvas1 => {
      // Capture du second élément
      html2canvas(dataBody).then(canvas2 => {
          // Calcul des dimensions pour le format paysage
          var imgWidth = 295; // Largeur de la page en mode paysage
          var imgHeight1 = canvas1.height * imgWidth / canvas1.width;
          var imgHeight2 = canvas2.height * imgWidth / canvas2.width;

          // Création d'un PDF avec une orientation paysage
          let pdf = new jsPDF('l', 'mm', 'a4'); // 'l' pour paysage, 'mm' pour millimètres, 'a4' pour le format A4

          // Ajout du second élément au PDF juste en dessous du premier
          const contentDataURL2 = canvas2.toDataURL('image/png');
          pdf.addImage(contentDataURL2, 'PNG', position, 15, imgWidth*scale, imgHeight2*scale);

          // Ajout du premier élément au PDF
          const contentDataURL1 = canvas1.toDataURL('image/png');
          pdf.addImage(contentDataURL1, 'PNG', 15, 10, imgWidth*scale, imgHeight1*scale);

    
          boutonPrint.style.display = '';
          boutonAccueil.style.display = '';
          menu.style.display = '';
          //message.style.display = '';
          note.style.display = '';
          // Sauvegarde du PDF en mode paysage
          pdf.save('candidat.pdf');

          this.isLoadingPDF = false;
      });
  });
  }
}


