import { Injectable } from '@angular/core';
import { MainMenuPosition } from '../../models/mainMenu.models';
import { menusConfig } from '../../config/mainMenu.json';

@Injectable({
  providedIn: 'root'
})

export class MainMenuService {
  private equipmentMenuPositions: MainMenuPosition[] = [];

  constructor() { }

  getMenus() {
    this.getEquipmentMenus()
  }

  getEquipmentMenus() {
    this.equipmentMenuPositions = [];
    for (const key in menusConfig[0]['equipment']) {
      const jsonKey = key as keyof typeof menusConfig[0]['equipment'];
      this.equipmentMenuPositions.push({"name": key, routerPath: menusConfig[0]['equipment'][jsonKey]});
    }
    return this.equipmentMenuPositions;
  }

  returnMenusPositions() {
    // return this.menuPositions;
  }

}
