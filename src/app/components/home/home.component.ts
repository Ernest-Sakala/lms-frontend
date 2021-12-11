import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loan : String = "4000"
  monthNumber! : Number 
  months = [
    {id: 1, months: "5"},
    {id: 2, months: "6"},
    {id: 3, months: "7"},
    {id: 4, months: "8"},
    {id: 5, months: "9"}
 ];


  constructor() { }

  ngOnInit(): void {
  }


  changed(){
    console.log(this.monthNumber, this.loan);
  }

}
