import { Component } from '@angular/core';
import { ViewService } from '../../services/viewService/view.service';
import { ActivatedRoute } from '@angular/router';
import { EditField } from '../../models/edit.models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor(private viewService: ViewService, private route: ActivatedRoute) { }

  private viewID = '';
  public fields: EditField[] = [];

  ngOnInit(): void {
    this.route.data.subscribe(view => {
      this.viewID = view['viewID'];
    });

    const editConfig = this.viewService.getEditConfig(this.viewID);

    for (const field of editConfig.fields) {
      this.fields.push({
        name: field.fieldName,
        type: field.fieldType
      })
    }
  }
}
