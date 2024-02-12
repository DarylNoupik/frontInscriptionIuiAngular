import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filieres = [
    {
    title: "Ingénieur nformatique",
    description: "à ce niveau, vous pourvez faire le concour pour le niveau 1 ou 3"
  },
    {
    title: "Génie des procédés",
    description: "à ce niveau, vous pourvez faire le concour pour le niveau 1 ou 3"
  },
    {
    title: "Ingénieur Géneraliste",
    description: "à ce niveau, vous pourvez faire le concour pour le niveau 1 ou 3"
  },
]
  matters: {title: string, formation: string, content: {title: string, duration: string, coef: number}[] }[] = [
    {
    title: '1er Cycle',
    formation: '',
    content: [
      {
        title: 'Mathématiques',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Physique - Chimie',
        duration: '2H',
        coef: 3
      },
      {
        title: 'Logique',
        duration: '2H',
        coef: 4
      },
    ]
  },
    {
    title: '2ème Cycle',
    formation: 'Informatique',
    content: [
      {
        title: 'Mathématiques',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Physique - Chimie',
        duration: '2H',
        coef: 3
      },
      {
        title: 'Logique',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Culture générale',
        duration: '2H',
        coef: 4
      },
    ]
  },
    {
    title: '2ème Cycle',
    formation: 'Génie des procédés',
    content: [
      {
        title: 'Mathématiques',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Chimie',
        duration: '2H',
        coef: 3
      },
      {
        title: 'Anglais',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Culture générale',
        duration: '2H',
        coef: 4
      },
    ]
  },
    {
    title: '2ème Cycle',
    formation: 'IP',
    content: [
      {
        title: 'Mathématiques',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Thermodynamique',
        duration: '2H',
        coef: 3
      },
      {
        title: 'Anglais',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Mécanique générale',
        duration: '2H',
        coef: 4
      },
    ]
  }
];
  
  constructor() { }

  ngOnInit(): void {
  }

  goTopPage(): void {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

}
