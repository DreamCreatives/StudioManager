import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ViewService } from '../viewService/view.service';
import { MatDialog } from '@angular/material/dialog';
import { WizardComponent } from '../../components/wizard/wizard.component';
import { WizardDestroyed } from '../../models/wizard.models';
import { Observable, of, switchMap, fromEvent, tap, map, forkJoin, iif } from 'rxjs';
import { WizardField } from '../../models/wizard.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WizardService {
  buttonClick$: Observable<Event> = fromEvent(document.getElementsByClassName('btn-wizard'), 'click');

  constructor(
    private viewService: ViewService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  public isSaved = false;
  public savedFields = {};
  public wizardForm = this.formBuilder.group({});
  public fields: WizardField[] = [];
  
  save: () => boolean = () => false;

  allowSave(condition: () => boolean): void {
    this.save = condition;
  }

  getValue(fieldID: string) {
    return this.wizardForm.get(fieldID)?.value;
  }
  
  
  create(wizardID: string): Observable<null> {
    return this.viewService.getWizardConfig(wizardID).pipe(
      switchMap(wizardConfig => {
        const toReturn: {[key: string]: any;} = {};
        for (const field of wizardConfig.fields) {
          if (field.isClass) toReturn[field.fieldName] = this.http.get(field.classDataUrl);
        }

        return iif(() => Object.keys(toReturn).length !== 0, forkJoin(toReturn), of(null)).pipe(
          tap(data => {
            this.fields = [];
            const wizardFormBuilderGroup: { [key: string]: any } = {};
            for (const formBuilderGroupField of wizardConfig.formBuilderGroupFields) {
              wizardFormBuilderGroup[formBuilderGroupField.fieldKey] = formBuilderGroupField.fieldValue;
            }
    
            this.wizardForm = this.formBuilder.group(wizardFormBuilderGroup);
    
            for (const field of wizardConfig.fields) {
              let options: {id: string, name: string}[] = [];
              if (data !== null && Object.prototype.hasOwnProperty.call(data, field.fieldName))
                options = data[field.fieldName] as any;

              this.fields.push({
                label: field.fieldLabel,
                type: field.fieldType,
                name: field.fieldName,
                isClass: field.isClass,
                options: options
              })
            }
            this.dialog.open(WizardComponent, {
              data: {
                title: wizardConfig.title,
                formGroup: this.wizardForm,
                fields: this.fields
              },
              panelClass: 'custom-modalbox',
              disableClose: true,
            });
          }),
        );
      }),
      map(() => null)
    );
  }

  destroy(): Observable<WizardDestroyed> {
    return this.buttonClick$.pipe(
      switchMap(() => {
        if (this.save()) {
          this.dialog.closeAll();
          return of({ save: this.isSaved, savedFields: this.savedFields });
        }
        return of({ save: this.isSaved, savedFields: this.savedFields });
      })
    );
    
  }
}