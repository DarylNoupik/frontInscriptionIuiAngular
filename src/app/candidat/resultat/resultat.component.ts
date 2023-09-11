import { Component, OnInit } from '@angular/core';
import { ICandidature } from "../../_interfaces/icandidature";

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit {

  public candidatureStatut: ICandidature = {
    langue: "",
    hasExchange: "",
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
    candidatureActif: true,
    sessionId: 0
  };
  constructor() { }

  ngOnInit(): void {
  }

}
