import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ViewService } from '../viewService/view.service';
import { MatDialog } from '@angular/material/dialog';
import { WizardComponent } from '../../components/wizard/wizard.component';
import { WizardDestroyed } from '../../models/wizard.models';
import { Observable, of, switchMap, fromEvent, tap } from 'rxjs';
import { WizardField } from '../../models/wizard.models';


@Injectable({
  providedIn: 'root'
})
export class WizardService {
  buttonClick$: Observable<Event> = fromEvent(document.getElementsByClassName('btn-wizard'), 'click');

  constructor(
    private viewService: ViewService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  public isSaved: boolean = false;
  public wizardForm = this.formBuilder.group({});
  public fields: WizardField[] = [];
  
  create(wizardID: string): Observable<null> {
    return this.viewService.getWizardConfig(wizardID).pipe(
      switchMap(wizardConfig => {
        this.fields = [];
        const wizardFormBuilderGroup: { [key: string]: any } = {};
        for (const formBuilderGroupField of wizardConfig.formBuilderGroupFields) {
          wizardFormBuilderGroup[formBuilderGroupField.fieldKey] = formBuilderGroupField.fieldValue;
        }

        this.wizardForm = this.formBuilder.group(wizardFormBuilderGroup);

        for (const field of wizardConfig.fields) {
          this.fields.push({
            label: field.fieldLabel,
            type: field.fieldType,
            name: field.fieldName,
          })
        }
        this.dialog.open(WizardComponent, {
          width: '25%',
          data: { title: wizardConfig.title },
          panelClass: 'custom-modalbox'
        });
        return of(null);
      })
    );
  }

  destroy(): Observable<WizardDestroyed> {
    return this.buttonClick$.pipe(
      switchMap(() => {
        this.dialog.closeAll();
        return of({ save: this.isSaved });
      })
    );
    
  }
}