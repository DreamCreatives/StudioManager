import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, switchMap, tap, catchError } from 'rxjs';
import { ViewService } from '../viewService/view.service';
import {
  Equipment,
  EquipmentType,
  EquipmentReservation,
  DataGridPaginationConfig,
  CalendarPaginationConfig,
  HttpResponseType
} from '../../models/apiService.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private vs: ViewService) { }

  getDataGridData(url: string): Observable<DataGridPaginationConfig | EquipmentType[] | null> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + String(localStorage.getItem('token')));
    return this.http.get(url, { headers: headers }).pipe(
      switchMap(response => of(response as DataGridPaginationConfig | EquipmentType[])),
      catchError(error => {
        this.vs.handleError(error);
        return of(null);
      })
    )
  }

  getEditObjectByID(url: string, params: HttpParams, objectID?: string): Observable<Equipment | EquipmentType | null> {
    const finalUrl = objectID !== undefined ? `${url}/${objectID}` : url;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + String(localStorage.getItem('token')));
    return this.http.get(finalUrl, { headers: headers, params: params }).pipe(
      switchMap(response => of(response as Equipment | EquipmentType)),
      catchError(error => {
        this.vs.handleError(error);
        return of(null);
      })
    )
  }

  getCalendarDataByDate(url: string, params: HttpParams): Observable<CalendarPaginationConfig | null> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + String(localStorage.getItem('token')));
    return this.http.get(url, { headers: headers, params: params }).pipe(
      switchMap(response => of(response as CalendarPaginationConfig)),
      catchError(error => {
        this.vs.handleError(error);
        return of(null);
      })
    )
  }

  saveRecord(
    url: string,
    body: Equipment | EquipmentType | EquipmentReservation,
    params: HttpParams,
    objectID?: string
  ): Observable<HttpResponseType | null> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + String(localStorage.getItem('token')));
    if (objectID !== undefined) 
      return this.http.put(`${url}/${objectID}`, body, { headers: headers, params: params, observe: 'response' }).pipe(
        tap(response => {
          if (response.status === 200) this.vs.showToast('Updated successfully', 'success');
        }),
        switchMap(response => of(response as HttpResponseType)),
        catchError(error => {
          this.vs.handleError(error);
          return of(null);
        })
      );
    return this.http.post(url, body, { headers: headers, params: params, observe: 'response' }).pipe(
      tap(response => {
        if(response.status === 200) this.vs.showToast('Created successfully', 'success');
      }),
      switchMap(response => of(response as HttpResponseType)),
      catchError(error => {
        this.vs.handleError(error);
        return of(null);
      })
    );
  }

  deleteRecord(url: string, objectID: string): Observable<HttpResponseType | null> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + String(localStorage.getItem('token')));
    return this.http.delete(`${url}/${objectID}`, { headers: headers, observe: 'response' }).pipe(
      tap(response => {
        if (response.status === 200) this.vs.showToast('Deleted successfully', 'success');
      }),
      switchMap(response => of(response as HttpResponseType)),
      catchError(error => {
        this.vs.handleError(error);
        return of(null);
      })
    );
  }
}
