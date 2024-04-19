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
    statut: "En_Attente",
    cycle: "",
    compteID: Number(localStorage.getItem('idCandidat')),
    nationalite: "",
    genre: "",
    date_naissance: "",
    datePaiement: "",
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
    sessionId: 0,
    serie_bac: '',
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
  constructor() { }

  ngOnInit(): void {
  }

}
