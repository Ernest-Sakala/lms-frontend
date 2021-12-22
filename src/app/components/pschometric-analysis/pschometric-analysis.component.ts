import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'src/app/service/application.service';

@Component({
  selector: 'app-pschometric-analysis',
  templateUrl: './pschometric-analysis.component.html',
  styleUrls: ['./pschometric-analysis.component.scss']
})
export class PschometricAnalysisComponent implements OnInit {

  favoriteSeason!: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];


  expenses = [
    {name : 'Rent', value : 'Rent' , checked : false},
    {name : 'TV', value : 'TV' , checked : false},
    {name : 'Entertainment', value : 'Entertainment' , checked : false}
  ]

  assets = [
    {name : 'Land', value : 'Land' , checked : false},
    {name : 'House', value : 'House' , checked : false},
    {name : 'Motor vehicle', value : 'Motor Vehicle' , checked : false},
    {name : 'Business', value : 'Business' , checked : false},
    {name : 'Other', value : 'Other' , checked : false}
  ]


  

  id! : number
  constructor(private router : ActivatedRoute, private applicationService : ApplicationService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params.id
    })
  }

  submitInfo(data : any){
  
    data.monthlyExpenses = this.expenses.filter(expense => expense.checked).map(expense => expense.name)

   data.assetsOwned = this.assets.filter(asset => asset.checked).map(asset => asset.name)
   data.user = {
     "id" : this.id
   }

   this.applicationService.addApplication(data).subscribe(response => {
     console.log(response)
   })

  }

  

}
