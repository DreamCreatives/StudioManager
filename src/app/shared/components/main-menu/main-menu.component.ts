import { Component, OnInit } from '@angular/core';
import { MainMenuPosition } from '../../models/mainMenu.models';
import { menusConfig } from '../../config/mainMenu.json';
import { LoginService } from '../../services/loginService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  public isLogged = false;

  public equipmentMenus: MainMenuPosition[] = [];
  public podcastMenus: MainMenuPosition[] = [];
  public printersMenus: MainMenuPosition[] = [];
  public devMenus: MainMenuPosition[] = [];

  constructor (private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if(!this.loginService.getIsLogged()) {
      this.router.navigate(['/login']);
    } else {
      this.isLogged = true;
      this.equipmentMenus = this.getMenusByCategoryName('equipment');
      this.podcastMenus = this.getMenusByCategoryName('podcast');
      this.printersMenus = this.getMenusByCategoryName('printers');
      this.devMenus = this.getMenusByCategoryName('testing')
    } 
  }

  getMenusByCategoryName(categoryName: string): MainMenuPosition[] {
    const categoryMenuPositions: MainMenuPosition[] = [];
    const categoryKey = categoryName as keyof typeof menusConfig[0];

    for (const key in menusConfig[0][categoryKey]) {
      const jsonKey = key as keyof typeof menusConfig[0][typeof categoryKey];
      categoryMenuPositions.push({"name": key, routerPath: menusConfig[0][categoryKey][jsonKey]});
    }
    return categoryMenuPositions;
  }
}
