import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGridComponent } from './shared/components/data-grid/data-grid.component';
import { Page404Component } from './shared/components/page-404/page-404.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'data-grid', component: DataGridComponent },
  { path: 'user', component: UserProfileComponent },
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
