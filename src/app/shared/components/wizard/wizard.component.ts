import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WizardService } from '../../services/wizardService/wizard.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WizardField, WizardData } from '../../models/wizard.models';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class WizardComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: WizardData,
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
    if (this.wizardService.save()) {
      this.wizardService.savedFields = this.wizardForm.value;
      this.wizardService.isSaved = true;
      this.wizardService.destroy();
    }
  }

  cancel(): void {
    this.wizardService.allowSave(() => {return true});
    this.wizardService.isSaved = false;
    this.wizardService.destroy();
  }

}
