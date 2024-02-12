import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-matter-display',
  templateUrl: './matter-display.component.html',
  styleUrls: ['./matter-display.component.css']
})
export class MatterDisplayComponent implements OnInit {

  @Input() title!: string;
  @Input() public id!: number;
  @Input() subtitle!: string;
  @Input() evaluations!: {title: string, duration: string, coef: number}[];
lesson: any;

  constructor() { }

  ngOnInit(): void {
  }

}
