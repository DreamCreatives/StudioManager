import { Injectable } from '@angular/core';
import { dataGridConfig } from '../../config/views/dataGrid.json';
import { editConfig } from '../../config/views/edit.json';
import { wizardConfig } from '../../config/views/wizard.json';
import { actionsConfig } from '../../config/actions.json';
import { DataGrid, Actions, Edit, Wizard } from '../../models/view.models';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../toastService/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(private router: Router, private toast: ToastService) { }

  public objID: string | null = null;

  getDataGridConfig(dataGridID: string): Observable<DataGrid> {
    const dataGridKey = dataGridID as keyof typeof dataGridConfig[0];
    return of(dataGridConfig[0][dataGridKey]);
  }

  getWizardConfig(wizardID: string): Observable<Wizard> {
    const wizardKey = wizardID as keyof typeof wizardConfig[0];
    return of(wizardConfig[0][wizardKey]);
  }

  getEditConfig(editID: string): Observable<Edit> {
    const editKey = editID as keyof typeof editConfig[0];
    return of(editConfig[0][editKey]);
  }

  getActionsConfig(viewID: string): Actions {
    const actionKey = viewID as keyof typeof actionsConfig[0];
    const actionConfig = actionsConfig[0][actionKey];
    return actionConfig;
  }

  refresh() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  showToast(message: string, toastType: string) {
    this.toast.show(message, toastType);
  }

}
