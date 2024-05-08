import { Injectable } from '@angular/core';
import { WizardService } from '../wizardService/wizard.service';
import { YesNoService } from '../yesNoService/yes-no.service';
import { ApiService } from '../apiService/api.service';
import { ViewService } from '../viewService/view.service';
import { switchMap, of, tap, filter, defaultIfEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
    private wizardService: WizardService,
    private yesNoService: YesNoService,
    private apiService: ApiService,
    private viewService: ViewService,
  ) { }

  executeFunction(functionName: string) {
    (this as any)[functionName]().subscribe();
  }

  testWizardAction() {
    return this.wizardService.create('addEquipmentList').pipe(
      switchMap(wizardCreated => this.wizardService.destroy()),
      filter(wizardDestroyed => wizardDestroyed.save),
      tap(result => {
        console.log(result);
      }),
      defaultIfEmpty(null)
    );
  }

  equListTestAction() {
    console.log('equ list');
  }

  testYesNoAction() {
    return this.yesNoService.run('test question').pipe(
      switchMap(response => {
        return of(null);
      })
    );
  }

  createEquipmentType() {
    return this.wizardService.create('addEquipmentList').pipe(
      switchMap(() => this.wizardService.destroy()),
      filter(wizardDestroyed => wizardDestroyed.save),
      switchMap(wizardDestroyed => {
        return this.apiService.saveWizard(
          'http://localhost:5001/api/v1/Equipment/Types',
          wizardDestroyed.savedFields,
          {}
        );
      }),
      defaultIfEmpty(null)
    );
  }

  deleteEquipmentType() {
    return of(this.viewService.objID).pipe(
      filter(objID => objID !== null),
      switchMap(() => this.yesNoService.run('Are you sure?')),
      filter(response => response),
      switchMap(() => {
        return this.apiService.deleteRecord(
          'http://localhost:5001/api/v1/Equipment/Types',
          String(this.viewService.objID)
        );
      }),
      defaultIfEmpty(null)
    );
  }
}
