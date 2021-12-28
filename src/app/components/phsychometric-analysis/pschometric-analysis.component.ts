import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/service/application.service';
import { QuestionsService } from 'src/app/service/questions.service';
import { SubscriptionService } from 'src/app/service/subscription.service';

@Component({
  selector: 'app-pschometric-analysis',
  templateUrl: './pschometric-analysis.component.html',
  styleUrls: ['./pschometric-analysis.component.scss'],
})
export class PschometricAnalysisComponent implements OnInit {
  favoriteSeason!: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  expenses = [
    { name: 'Entertainment', value: 'Entertainment', checked: false },
    { name: 'Food', value: 'Food', checked: false },
    { name: 'Clothing', value: 'Clothing', checked: false },
    { name: 'School Fees', value: 'School Fees', checked: false },
    { name: 'Rent', value: 'Rent', checked: false },
    {
      name: 'Miscellaneous expenses',
      value: 'Miscellaneous expenses',
      checked: false,
    },
  ];

  socials = [
    { name: 'Twitter', value: 'Twitter', checked: false },
    { name: 'Instagram', value: 'Instagram', checked: false },
    { name: 'Facebook', value: 'Facebook', checked: false },
    {
      name: 'I am not on social media',
      value: 'I am not on social media',
      checked: false,
    },
  ];

  credits = [
    { name: 'Emergency expenses', value: 'Emergency expenses', checked: false },
    { name: 'Building', value: 'Building', checked: false },
    { name: 'School Fees', value: 'School Fees', checked: false },
    {
      name: 'Invsetment in business',
      value: 'Investment in business',
      checked: false,
    },
    { name: 'Fanily Obligations', value: 'Family Obligations', checked: false },
    { name: 'Other', value: 'Other', checked: false },
  ];

  id!: number;
  constructor(
    private router: ActivatedRoute,
    private questionsService: QuestionsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  submitInfo(data: any) {
    data.creditReason = this.credits
      .filter((expense) => expense.checked)
      .map((expense) => expense.name);

    data.socialMedia = this.socials
      .filter((asset) => asset.checked)
      .map((socials) => socials.name);
    data.user = {
      id: this.id,
    };

    data.canAcquireLoan = false;
    console.log(data);
    this.questionsService.addAnswer(data).subscribe((response) => {
      console.log(response);
      this.route.navigateByUrl(`/client/apply/${response.id}`);
    });
  }
}
