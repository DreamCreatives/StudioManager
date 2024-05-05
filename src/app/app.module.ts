import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
