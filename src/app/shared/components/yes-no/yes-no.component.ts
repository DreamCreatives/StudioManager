import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YesNoService } from '../../services/yesNoService/yes-no.service';
import { YesNoData } from '../../models/yesNo.model';

@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class YesNoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: YesNoData,
    private yesNoService: YesNoService,
  ) {}

  yes(): void {
    this.yesNoService.isSaved = true;
  }

  no(): void {
    this.yesNoService.isSaved = false;
  }
}
