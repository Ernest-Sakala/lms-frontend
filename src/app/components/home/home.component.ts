import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/model/subscription';
import { NavbarService } from 'src/app/service/navbar.service';
import { SubscriptionService } from 'src/app/service/subscription.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  loan : String = "4000"
  monthNumber! : Number 
   payments : number = 0;
  loanAmount : number = 0;
  interest : number = 0;
  selectedValue! : Subscription;
  amount : number = 0;
  subscriptions! : Subscription[]



  constructor(public nav : NavbarService,   private subscriptionService : SubscriptionService) {
    nav.show()
   }

  ngOnInit(): void {
    this.getSubscription()
  }



   getSubscription(){
      this.subscriptionService.getSubscriptions().subscribe(response=> {
        console.log(response)
        this.subscriptions = response

      })
    }

     calculateLoan(){
       //console.log(data)
       console.log(this.amount)
       console.log(this.selectedValue)

       this.interest = (this.amount * Number.parseInt(this.selectedValue.interest))/100
       this.loanAmount = Number.parseInt(this.amount.toString())  + Number.parseInt(this.interest.toString())
       this.payments = this.loanAmount/Number.parseInt(this.selectedValue.period)
       
     }



  changed(){
    console.log(this.monthNumber, this.loan);
  }

}
