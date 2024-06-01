import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/loginService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  username:string | undefined;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.checkIfUserIsLogged();
    this.username=this.loginService.getUsername();
  }

  logout(){
    this.loginService.logout()
  }
}
