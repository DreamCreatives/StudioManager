import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WizardService } from '../../services/wizardService/wizard.service';
import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WizardField } from '../../models/wizard.models';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class WizardComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private wizardService: WizardService,
    private formBuilder: FormBuilder
  ) { }

  public wizardForm = this.formBuilder.group({});
  public fields: WizardField[] = [];

  ngOnInit() {
    this.wizardForm = this.wizardService.wizardForm;
    this.fields = this.wizardService.fields;
    console.log(this.wizardForm);
    console.log(this.fields);
  }

  save() {
    console.log(this.wizardForm.value);
    this.wizardService.isSaved = true;
    this.wizardService.destroy();
  }

  cancel() {
    this.wizardService.isSaved = false;
    this.wizardService.destroy();
  }

}
