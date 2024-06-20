import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from '../../services/loginService/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private renderer: Renderer2, private loginService: LoginService) {}

  public isLogged = this.loginService.getIsLogged();

  ngOnInit(): void{
    if (!this.isLogged) {
      const body = document.body;
      const className = 'toggle-sidebar';
      this.renderer.addClass(body, className);
    }
  }

  toggleSidebar(): void {
    if (!this.loginService.getIsLogged()) return;
    const body = document.body;
    const className = 'toggle-sidebar';
    
    if (body.classList.contains(className)) {
      this.renderer.removeClass(body, className);
    } else {
      this.renderer.addClass(body, className);
    }
  }
}
