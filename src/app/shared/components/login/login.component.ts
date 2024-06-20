import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/loginService/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'keycloak-angular';
  public form!: FormGroup;
  error = false

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }

    login(){
        this.loginService.login(this.form.value.username,this.form.value.password)
        .subscribe({
            next: (res: any) => {
              localStorage.setItem("token", res.access_token);
              const body = document.body;
              const className = 'toggle-sidebar';
              
              if (body.classList.contains(className)) {
                this.renderer.removeClass(body, className);
    }
              this.router.navigate(['/']);
            },
            error: (err) => {
              this.error=true
            },
          });
    }
}