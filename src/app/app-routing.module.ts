import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGridComponent } from './shared/components/data-grid/data-grid.component';
import { Page404Component } from './shared/components/page-404/page-404.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { EditComponent } from './shared/components/edit/edit.component';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [

  //Data grids
  { path: 'equipment-list', title: 'Equipment List', component: DataGridComponent, data: { viewID: 'equipmentList' } },
  { path: 'equipment-types-list', title: 'Equipment Types', component: DataGridComponent, data: { viewID: 'equipmentTypes' } },
  { path: 'printers-list', title: 'Printers List', component: DataGridComponent, data: { viewID: 'printersList' } },
  { path: 'stl-files-list', title: 'STL Files List', component: DataGridComponent, data: { viewID: 'stlFilesList' } },

  //Edits
  { path: 'equipment-list/:id', title: 'Equipment details', component: EditComponent, data: { viewID: 'equipmentDetail' } },
  { path: 'equipment-types-list/:id', title: 'Equipment Type details', component: EditComponent, data: {viewID: 'equipmentTypeDetail' } },
  { path: 'equipment-reservations-calendar/:id', title: 'Equipment Reservation details', component: EditComponent, data: { viewID: 'equipmentReservationDetail' } },
  { path: 'printers-list/:id', title: 'Printer details', component: EditComponent, data: { viewID: 'printerDetail' } },
  { path: 'stl-files-list/:id', title: 'STL File details', component: EditComponent, data: { viewID: 'stlFileDetail' } },

  //Calendars
  { path: 'equipment-reservations-calendar', title: 'Equipment Reservations', component: CalendarComponent, data: { viewID: 'equipmentReservationsCalendar' } },

  { path: 'user', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: MainPageComponent },
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
