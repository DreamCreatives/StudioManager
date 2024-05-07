import { Injectable } from '@angular/core';
import { WizardService } from '../wizardService/wizard.service';
import { switchMap, of, tap, filter, defaultIfEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private wizardService: WizardService) { }

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
}
