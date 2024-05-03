import { Component, OnInit } from '@angular/core';
import { MainMenuPosition } from '../../models/mainMenu.models';
import { menusConfig } from '../../config/mainMenu.json';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  constructor () { }
  public equipmentMenus: MainMenuPosition[] = [];
  public podcastMenus: MainMenuPosition[] = [];
  public printersMenus: MainMenuPosition[] = [];

  ngOnInit() {
    this.equipmentMenus = this.getMenusByCategoryName('equipment');
    this.podcastMenus = this.getMenusByCategoryName('podcast');
    this.printersMenus = this.getMenusByCategoryName('printers')
  }

  getMenusByCategoryName(categoryName: string) {
    let categoryMenuPositions: MainMenuPosition[] = [];
    const categoryKey = categoryName as keyof typeof menusConfig[0];

    for (const key in menusConfig[0][categoryKey]) {
      const jsonKey = key as keyof typeof menusConfig[0][typeof categoryKey];
      categoryMenuPositions.push({"name": key, routerPath: menusConfig[0][categoryKey][jsonKey]});
    }
    return categoryMenuPositions;
  }
}
