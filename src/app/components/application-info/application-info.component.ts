import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss']
})
export class ApplicationInfoComponent implements OnInit {


  favoriteSeason!: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];



  constructor() { }

  ngOnInit(): void {
  }

  submitInfo(data : any){
    console.log(data)
  }

}
