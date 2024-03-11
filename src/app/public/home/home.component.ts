import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  matters: {
    title: string;
    formation?: string;
    content: { title: string; duration: string; coef: number }[];
  }[] = [
    {
      title: '1er Cycle',
      content: [
        {
          title: 'Mathématiques',
          duration: '2H',
          coef: 4,
        },
        {
          title: 'Logique',
          duration: '1H',
          coef: 2,
        },
        {
          title: 'Physique-chimie  ou IT',
          duration: '2H',
          coef: 3,
        },
      ],
    },
    {
      title: '2ème Cycle',
      formation: 'X',
      content: [
        {
          title: 'Mathématiques',
          duration: '2H',
          coef: 4,
        },
        {
          title: 'Anglais ',
          duration: '1H',
          coef: 1.5,
        },
        {
          title: 'Informatique',
          duration: '2H',
          coef: 4,
        },
        {
          title: 'Culture générale',
          duration: '1H',
          coef: 2,
        },
      ],
    },
    {
      title: '2ème Cycle',
      formation: 'I',
      content: [
        {
          title: 'Mathématiques',
          duration: '2H',
          coef: 4,
        },
        {
          title: 'Anglais',
          duration: '1H',
          coef: 1.5,
        },
        {
          title: ' Electrotechnique / Thermodynamique ',
          duration: '2H',
          coef: 3,
        },
        {
          title: 'Culture générale ',
          duration: '1H',
          coef: 2,
        },
      ],
    },
    {
      title: '2ème Cycle',
      formation: 'IP',
      content: [
        {
          title: 'Mathématiques',
          duration: '2H',
          coef: 4,
        },
        {
          title: 'Anglais ',
          duration: '1H',
          coef: 1.5,
        },
        {
          title: 'Chimie',
          duration: '2H',
          coef: 4,
        },
        {
          title: 'Culture générale',
          duration: '1H',
          coef: 2,
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  goTopPage(): void {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
