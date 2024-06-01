import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.get(url).pipe(
      switchMap(response => of(response as DataGridPaginationConfig | EquipmentType[])),
      catchError(error => {
        this.vs.handleError(error);
        return of(null);
      })
    )
  }

  getEditObjectByID(url: string, params: HttpParams, objectID?: string): Observable<Equipment | EquipmentType | null> {
    const finalUrl = objectID !== undefined ? `${url}/${objectID}` : url;
    return this.http.get(finalUrl, { params: params }).pipe(
      switchMap(response => of(response as Equipment | EquipmentType)),
      catchError(error => {
        this.vs.handleError(error);
        return of(null);
      })
    )
  }

  getCalendarDataByDate(url: string, params: HttpParams): Observable<CalendarPaginationConfig | null> {
    return this.http.get(url, { params: params }).pipe(
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
    console.log(objectID)
    console.log(body);
    if (objectID !== undefined) 
      return this.http.put(`${url}/${objectID}`, body, { params: params, observe: 'response' }).pipe(
        tap(response => {
          if (response.status === 200) this.vs.showToast('Updated successfully', 'success');
        }),
        switchMap(response => of(response as HttpResponseType)),
        catchError(error => {
          this.vs.handleError(error);
          return of(null);
        })
      );
    return this.http.post(url, body, { params: params, observe: 'response' }).pipe(
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
    return this.http.delete(`${url}/${objectID}`, { observe: 'response' }).pipe(
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
