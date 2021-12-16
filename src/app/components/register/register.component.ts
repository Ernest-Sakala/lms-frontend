import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  fileToUpload : File | null = null;
  submitted: boolean = false;
  image:string = "../../assets/placeholder.png";

  constructor(public nav : NavbarService,private userService :UserService) { 
    nav.hide();
  }

  ngOnInit(): void {
  }


  registerUser(data: any){ 

    data.role = ["USER"];

    this.userService.register(data).subscribe(response => {
      console.log(response);
    })

    console.log(data);
  }

}
