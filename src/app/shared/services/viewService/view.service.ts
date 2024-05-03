import { Injectable } from '@angular/core';
import { viewsConfig } from '../../config/views.json';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor() { }

  getDataGridConfig(dataGridID: string) {
    const dataGridKey = dataGridID as keyof typeof viewsConfig[0]['dataGrid']
    const dataGridConfig = viewsConfig[0]['dataGrid'][dataGridKey];
    return dataGridConfig
  }

  getWizardConfig(wizardID: string) {
    const wizardKey = wizardID as keyof typeof viewsConfig[0]['wizard']
    const wizardonfig = viewsConfig[0]['wizard'][wizardKey];
    return wizardonfig
  }

  getEditConfig(editID: string) {
    const editKey = editID as keyof typeof viewsConfig[0]['edit']
    const editConfig = viewsConfig[0]['edit'][editKey];
    return editConfig
  }
}
