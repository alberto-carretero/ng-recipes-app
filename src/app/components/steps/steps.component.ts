import { Component, Input, OnInit } from '@angular/core';
// import { RecipeI } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  @Input() title: string;
  @Input() ingredients: string[];
  @Input() steps: string[];

  // public slideOpts = {
  //   coverflowEffect: {
  //     slideShadows: true,
  //   }
  // }

  constructor() {}

  ngOnInit() {
    console.log(this.title);
    console.log(this.ingredients);
    console.log(this.steps); 
  }
}
