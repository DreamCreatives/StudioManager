import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor() { }

  executeFunction(functionName: string) {
    (this as any)[functionName]();
  }

  testAction() {
    console.log('testing123');
  }

  testAction1() {
    console.log('testing1');
  }

  equListTestAction() {
    console.log('equ list');
  }
}
