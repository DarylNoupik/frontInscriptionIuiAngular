import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  matters: {title: string, formation?: string, content: {title: string, duration: string, coef: number}[] }[] = [
    {
    title: '1er Cycle',
    content: [
      {
        title: 'Matématiques',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Physique - Chimie',
        duration: '2H',
        coef: 3
      },
      {
        title: 'Anglais - IT',
        duration: '2H',
        coef: 4
      },
    ]
  },
    {
    title: '2ème Cycle',
    formation: 'X',
    content: [
      {
        title: 'Matématiques',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Matématiques',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Matématiques',
        duration: '2H',
        coef: 4
      },
    ]
  },
    {
    title: '2ème Cycle',
    formation: 'I',
    content: [
      {
        title: 'Matématiques',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Matématiques',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Matématiques',
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
        title: 'Matématiques',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Matématiques',
        duration: '2H',
        coef: 4
      },
      {
        title: 'Matématiques',
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
