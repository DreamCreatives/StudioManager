import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ViewService } from '../../services/viewService/view.service';
import { ApiService } from '../../services/apiService/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditField } from '../../models/edit.models';
import { switchMap, tap, of, iif, forkJoin } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor(
    private viewService: ViewService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  public editForm = this.formBuilder.group({});

  private objectID: string | null = '';
  private baseUrl = '';
  private rerouteOnCancel = '';
  public fields: EditField[] = [];

  ngOnInit(): void {
    this.route.data.pipe(
      switchMap(view => this.viewService.getEditConfig(view['viewID'])),
      tap(editConfig => {
        this.objectID = this.route.snapshot.paramMap.get('id');
        this.baseUrl = editConfig.baseUrl;
        this.rerouteOnCancel = editConfig.rerouteOnCancel;
      }),
      switchMap(editConfig => {
        const toReturn: {[key: string]: any;} = {};
        for (const field of editConfig.fields) {
          if (field.isClass) toReturn[field.fieldName] = this.http.get(field.classDataUrl);
        }

        return iif(() => Object.keys(toReturn).length !== 0, forkJoin(toReturn), of(null)).pipe(
          switchMap(data => {
            const params = new HttpParams().set('ft', String(this.objectID));
            return this.apiService.getEditObjectByID(editConfig.baseUrl, params).pipe(
              tap(response => {
                let dataHolder;

                if (response.hasOwnProperty('data')) {
                  const dataKey = 'data' as keyof typeof response;
                  dataHolder = response[dataKey];
                } else {
                  dataHolder = response;
                }

                const editFormBuilderGroup: { [key: string]: any } = {};
                for (const formBuilderGroupField of editConfig.formBuilderGroupFields) {
                  let fieldValue;
                  for (const responseData in dataHolder) {
                    const responseDataKey = responseData as keyof typeof dataHolder;
                    
                    let fieldKey;

                    if (formBuilderGroupField.fieldKey.includes('Id')) {
                      fieldKey = formBuilderGroupField.fieldKey.slice(0, -2) as keyof typeof dataHolder[typeof responseDataKey];
                    } else {
                      fieldKey = formBuilderGroupField.fieldKey as keyof typeof dataHolder[typeof responseDataKey];
                    }
                    
                    fieldValue = dataHolder[responseDataKey][fieldKey];
                    fieldValue = this.isObject(fieldValue) ? fieldValue['id'] : fieldValue;
                  }

                  editFormBuilderGroup[formBuilderGroupField.fieldKey] = fieldValue;
                }

                this.editForm = this.formBuilder.group(editFormBuilderGroup);

                for (const field of editConfig.fields) {
                  let options: {id: string, name: string, selected: boolean}[] = [];
                  if (data !== null && data.hasOwnProperty(field.fieldName)) {
                    for (const row of data[field.fieldName] as any) {
                      row['selected'] = row.name === editFormBuilderGroup[field.fieldName];
                      options.push(row);
                    }
                  }

                  this.fields.push({
                    label: field.fieldLabel,
                    type: field.fieldType,
                    name: field.fieldName,
                    isClass: field.isClass,
                    options: options,
                  })
                }
              })
            );
          })
        );
      })
    ).subscribe();
  }

  cancel(): void {
    this.router.navigate([this.rerouteOnCancel]);
  }

  onSubmit(): void {
    const params = {};
    this.apiService.saveRecord(this.baseUrl, this.editForm.value, params, String(this.objectID)).pipe(
      tap(() => this.router.navigate([this.rerouteOnCancel]))
    ).subscribe();
  }

  isObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
}
