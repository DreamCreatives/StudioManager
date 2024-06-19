import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/loginService/login.service';
import { ViewService } from '../../services/viewService/view.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Tab } from '../../models/tabs.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private viewService: ViewService
  ) { }

  public tabs: Tab[] = [];

  ngOnInit(): void {
    this.loginService.checkIfUserIsLogged();
    this.route.data.pipe(
      switchMap(view => this.viewService.getTabsConfig(view['viewID'])),
      tap(tabsConfig => {
        this.tabs = tabsConfig.tabs;
      })
    )
    .subscribe();
  }
}
