import { Injectable } from '@angular/core';
import { WizardService } from '../wizardService/wizard.service';
import { YesNoService } from '../yesNoService/yes-no.service';
import { switchMap, of, tap, filter, defaultIfEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private wizardService: WizardService, private yesNoService: YesNoService) { }

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
        console.log(response);
        return of(null);
      })
    );
  }
}
