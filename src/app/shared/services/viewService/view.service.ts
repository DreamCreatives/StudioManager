import { Injectable } from '@angular/core';
import { viewsConfig } from '../../config/views.json';
import { actionsConfig } from '../../config/actions.json';
import { DataGrid, Actions, Edit, Wizard } from '../../models/view.models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor() { }

  getDataGridConfig(dataGridID: string): Observable<DataGrid> {
    const dataGridKey = dataGridID as keyof typeof viewsConfig[0]['dataGrid'];
    const dataGridConfig = viewsConfig[0]['dataGrid'][dataGridKey];
    return of(dataGridConfig);
  }

  getWizardConfig(wizardID: string): Observable<Wizard> {
    const wizardKey = wizardID as keyof typeof viewsConfig[0]['wizard']
    const wizardConfig = viewsConfig[0]['wizard'][wizardKey];
    return of(wizardConfig);
  }

  getEditConfig(editID: string): Observable<Edit> {
    const editKey = editID as keyof typeof viewsConfig[0]['edit'];
    const editConfig = viewsConfig[0]['edit'][editKey];
    return of(editConfig);
  }

  getActionsConfig(viewID: string): Actions {
    const actionKey = viewID as keyof typeof actionsConfig[0];
    const actionConfig = actionsConfig[0][actionKey];
    return actionConfig;
  }

}
