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

  ngOnInit(): void {
    this.wizardForm = this.wizardService.wizardForm;
    this.fields = this.wizardService.fields;
  }

  save(): void {
    this.wizardService.savedFields = this.wizardForm.value;
    this.wizardService.isSaved = true;
    this.wizardService.destroy();
  }

  cancel(): void {
    this.wizardService.isSaved = false;
    this.wizardService.destroy();
  }

}
