import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ViewService } from '../../services/viewService/view.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditField } from '../../models/edit.models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor(
    private viewService: ViewService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  public editForm = this.formBuilder.group({});

  private viewID = '';
  private rerouteOnCancel = '';
  public fields: EditField[] = [];

  ngOnInit(): void {
    this.route.data.subscribe(view => {
      this.viewID = view['viewID'];
    });  

    const editFormBuilderGroup: { [key: string]: any } = {};
    const editConfig = this.viewService.getEditConfig(this.viewID);
  
    this.rerouteOnCancel = editConfig.rerouteOnCancel;
  
    for (const formBuilderGroupField of editConfig.formBuilderGroupFields) {
      editFormBuilderGroup[formBuilderGroupField.fieldKey] = formBuilderGroupField.fieldValue;
    }

    this.editForm = this.formBuilder.group(editFormBuilderGroup);

    for (const field of editConfig.fields) {
      this.fields.push({
        label: field.fieldLabel,
        type: field.fieldType,
        name: field.fieldName,
      })
    }

  }

  cancel(): void {
    this.router.navigate([this.rerouteOnCancel]);
  }

  onSubmit(): void {
    console.log(this.editForm.value);
    this.router.navigate([this.rerouteOnCancel])
  }


}
