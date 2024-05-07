import { Injectable } from '@angular/core';
import { WizardService } from '../wizardService/wizard.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private wizardService: WizardService) { }

  executeFunction(functionName: string) {
    (this as any)[functionName]();
  }

  testAction() {
    console.log('testing123');
  }

  testAction1() {
    this.wizardService.openDialog('test title', 'test message');
    console.log('testing1');
  }

  equListTestAction() {
    console.log('equ list');
  }
}
