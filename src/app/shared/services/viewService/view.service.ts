import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { viewsConfig } from '../../config/views.json';
import { actionsConfig } from '../../config/actions.json';
import { DataGrid, Actions, Edit } from '../../models/view.models';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(private http: HttpClient) { }

  getDataGridConfig(dataGridID: string): DataGrid {
    const dataGridKey = dataGridID as keyof typeof viewsConfig[0]['dataGrid'];
    const dataGridConfig = viewsConfig[0]['dataGrid'][dataGridKey];
    return dataGridConfig;
  }

  getWizardConfig(wizardID: string) {
    const wizardKey = wizardID as keyof typeof viewsConfig[0]['wizard']
    const wizardConfig = viewsConfig[0]['wizard'][wizardKey];
    return wizardConfig;
  }

  getEditConfig(editID: string): Edit {
    const editKey = editID as keyof typeof viewsConfig[0]['edit'];
    const editConfig = viewsConfig[0]['edit'][editKey];
    return editConfig;
  }

  getActionsConfig(viewID: string): Actions {
    const actionKey = viewID as keyof typeof actionsConfig[0];
    const actionConfig = actionsConfig[0][actionKey];
    return actionConfig;
  }

  getDataGridData(url: string, parameters: string) {
    console.log(url);
    console.log(parameters);
    return this.http.get(url);
  }
}
