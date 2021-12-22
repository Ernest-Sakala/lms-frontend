import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule} from './material/material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientComponent } from './components/client/client.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AntModule } from './material/ant/ant.module';
import { LoansComponent } from './components/loans/loans.component';
import { ApplicationInfoComponent } from './components/application-info/application-info.component'
import { ApplicationGuard } from './guard/application.guard';
import { AuthGuard } from './guard/auth.guard';
import { PschometricAnalysisComponent } from './components/pschometric-analysis/pschometric-analysis.component';
import { TokenIntercepterService } from './security/token-intercepter.service';
import { UsersComponent } from './components/users/users.component';
import { ApplyLoanComponent } from './components/apply-loan/apply-loan.component';
import { AddSubscriptionComponent } from './components/add-subscription/add-subscription.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    ClientComponent,
    LoansComponent,
    ApplicationInfoComponent,
    PschometricAnalysisComponent,
    UsersComponent,
    ApplyLoanComponent,
    AddSubscriptionComponent,
    SubscriptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    AntModule,
    RouterModule.forRoot(
      [
        {path : '', component : HomeComponent },
        {path : 'register' , component : RegisterComponent},
        {
          path : 'register/application-info/:id' ,
          component : ApplicationInfoComponent,
          canActivate : [ApplicationGuard]
        },
        {path : 'login' , component : LoginComponent},
        {
          path : 'admin' , 
          component : AdminComponent,
          'children' : [

            {path : '', component :UsersComponent},
            {path : 'add-subscription', component :AddSubscriptionComponent}

          ],
           canActivate : [AuthGuard]
           
        },
        {
          path : 'client' , 
          component : ClientComponent,
          'children' : [

            {path : '', component :LoansComponent},

            {path : 'analysis', component :PschometricAnalysisComponent}


          ],
          canActivate : [AuthGuard]
        }
   
      ]
    ),
    NgbModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule
  ],
  providers: [ApplicationGuard,AuthGuard,{ provide: NZ_I18N, useValue: en_US },
    {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenIntercepterService,
    multi : true
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
