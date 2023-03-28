import { Component, OnInit } from '@angular/core';
import { SessionService } from "../../_services/session.service";
import { ISessionModel } from "../../_interfaces/isession-model";
import { CandidatureService } from "../../_services/candidature.service";
import { TokenService } from "../../_services/token.service";
import { UsersService } from "../../_services/users.service";
import {ActivatedRoute} from "@angular/router";
import jsPDF from 'jspdf';
import {DatePipe} from "@angular/common";


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
  public  id : null | string = "";
  public  name : string |null = "";
  public  code : string | null = "";

  constructor(
    private sessionService: SessionService,
    private candidatureService: CandidatureService,
    private tokenService: TokenService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
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

    this.id = this.route.snapshot.queryParamMap.get('id');
    this.name = this.route.snapshot.queryParamMap.get('name');
    this.code = this.route.snapshot.queryParamMap.get('code');



  }

  printPDF() {

    const doc =  new jsPDF();
      const text = `Nom du candidant: ${this.name}\n\n\n Code Examen: ${this.code} \n\n\n\n\n Date d'examen: ${this.datePipe.transform(this.session.date_examen, 'fullDate', '', 'fr-FR')}`;
      doc.text(text, 10, 10);
      doc.save('code-examen.pdf');


  }
}


