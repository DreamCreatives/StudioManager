import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { WizardService } from './shared/services/wizardService/wizard.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './shared/components/main-menu/main-menu.component';
import { DataGridComponent } from './shared/components/data-grid/data-grid.component';
import { Page404Component } from './shared/components/page-404/page-404.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { WizardComponent } from './shared/components/wizard/wizard.component';
import { YesNoComponent } from './shared/components/yes-no/yes-no.component';
import { ActionBarComponent } from './shared/components/action-bar/action-bar.component';
import { EditComponent } from './shared/components/edit/edit.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    DataGridComponent,
    Page404Component,
    MainPageComponent,
    UserProfileComponent,
    WizardComponent,
    YesNoComponent,
    ActionBarComponent,
    EditComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
