import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/loginService/login.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  username: string | undefined;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.checkIfUserIsLogged();
    this.username=this.loginService.getUsername();
  }

  logout(){
    this.loginService.logout()
  }
}
