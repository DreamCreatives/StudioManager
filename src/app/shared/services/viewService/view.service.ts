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

  }

  getEditConfig(editID: string) {

  }
}
