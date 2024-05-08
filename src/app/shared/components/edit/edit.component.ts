import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ViewService } from '../../services/viewService/view.service';
import { ApiService } from '../../services/apiService/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditField } from '../../models/edit.models';
import { switchMap, tap,of } from 'rxjs';
import { HttpParams } from '@angular/common/http';

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
    private formBuilder: FormBuilder
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
        const params = new HttpParams().set('ft', String(this.objectID));
        return this.apiService.getEditObjectByID(editConfig.baseUrl, params).pipe(
          switchMap(response => {
            const editFormBuilderGroup: { [key: string]: any } = {};
            for (const formBuilderGroupField of editConfig.formBuilderGroupFields) {
              let fieldValue = '';

              for (const responseData in response) {
                const responseDataKey = responseData as keyof typeof response;
                const fieldKey = formBuilderGroupField.fieldKey as keyof typeof response[typeof responseDataKey];

                fieldValue = response[responseDataKey][fieldKey];
              }

              editFormBuilderGroup[formBuilderGroupField.fieldKey] = fieldValue;
            }

            this.editForm = this.formBuilder.group(editFormBuilderGroup);

            for (const field of editConfig.fields) {
              this.fields.push({
                label: field.fieldLabel,
                type: field.fieldType,
                name: field.fieldName,
              })
            }
            return of(null);
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
    this.apiService.saveEdit(this.baseUrl, this.editForm.value, params, String(this.objectID)).pipe(
      tap(response => this.router.navigate([this.rerouteOnCancel]))
    ).subscribe();
  }


}
