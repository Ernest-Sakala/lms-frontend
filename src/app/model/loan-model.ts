import { QuestionsModel } from './questions-model';
import { Subscription } from './subscription';
import { UserModel } from './user-model';

export class LoanModel {
  id!: number;
  loanAmount!: number;
  borrowedDate!: string;
  paymentDate!: string;
  payments!: number;
  interest!: number;
  totalAmount!: number;
  isPaid!: boolean;
  user!: UserModel;
  subscriptionModel!: Subscription;
  loanStatus!: string;
  question! : QuestionsModel;
}
