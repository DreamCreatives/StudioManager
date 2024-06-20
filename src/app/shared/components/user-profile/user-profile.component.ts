import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/loginService/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  constructor (private loginService: LoginService) { }

  username: string | undefined;

  ngOnInit(): void {
    this.loginService.checkIfUserIsLogged();
    this.username=this.loginService.getUsername();
  }
}
