import { Injectable } from '@angular/core';
import { dataGridConfig } from '../../config/views/dataGrid.json';
import { editConfig } from '../../config/views/edit.json';
import { wizardConfig } from '../../config/views/wizard.json';
import { actionsConfig } from '../../config/actions.json';
import { calendarConfig } from '../../config/views/calendar.json';
import { tabsConfig } from '../../config/tabs.json';
import { DataGrid, Actions, Edit, Wizard, Calendar, Tabs } from '../../models/view.models';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../toastService/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(private router: Router, private toast: ToastService) { }

  public objID: string[] = [];

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

  getActionsConfig(viewID: string): Observable<Actions> {
    const actionKey = viewID as keyof typeof actionsConfig[0];
    return of(actionsConfig[0][actionKey]);
  }

  getCalendarConfig(viewID: string): Observable<Calendar> {
    const calendarKey = viewID as keyof typeof calendarConfig[0];
    return of(calendarConfig[0][calendarKey]);
  }

  getTabsConfig(viewID: string): Observable<Tabs> {
    const tabsKey = viewID as keyof typeof tabsConfig[0];
    return of(tabsConfig[0][tabsKey]);
  }

  refresh(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  showToast(message: string, toastType: string): void {
    this.toast.show(message, toastType);
  }

  handleError(error: HttpErrorResponse) {
    const errorMessage = error.error.detail;
    this.showToast(errorMessage, 'error');
  }

}
