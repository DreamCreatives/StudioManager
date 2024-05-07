import { Component, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})

export class WizardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
