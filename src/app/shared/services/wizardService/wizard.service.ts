import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WizardComponent } from '../../components/wizard/wizard.component';


@Injectable({
  providedIn: 'root'
})
export class WizardService {

  constructor(private dialog: MatDialog) { }

  openDialog(title: string, message: string): void {
    this.dialog.open(WizardComponent, {
      width: '250px',
      data: { title, message }
    });
  }

}