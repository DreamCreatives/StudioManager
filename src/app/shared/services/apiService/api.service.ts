import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ViewService } from '../viewService/view.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private vs: ViewService) { }


  getDataGridData(url: string): Observable<Object> {
    return this.http.get(url).pipe(
      switchMap(response => of(response))
    )
  }

  getEditObjectByID(url: string, params: any, objectID?: string): Observable<Object> {
    const finalUrl = objectID !== undefined ? `${url}/${objectID}` : url;
    return this.http.get(finalUrl, { params: params }).pipe(
      switchMap(response => of(response))
    )
  }

  getCalendarDataByDate(url: string, params:any): Observable<Object> {
    return this.http.get(url, { params: params }).pipe(
      switchMap(response => of(response))
    )
  }

  saveRecord(url: string, body: any, params: any, objectID?: string): Observable<HttpResponse<Object>> {
    if (objectID !== undefined) 
      return this.http.put(`${url}/${objectID}`, body, { params: params, observe: 'response' }).pipe(
        tap(response => {
          response.status === 200 ? this.vs.showToast('Updated successfully', 'success') : this.vs.showToast('Something went wrong', 'error');
        }),
        switchMap(response => of(response))
      );
    return this.http.post(url, body, { params: params, observe: 'response' }).pipe(
      tap(response => {
        response.status === 200 ? this.vs.showToast('Created successfully', 'success') : this.vs.showToast('Something went wrong', 'error');
      }),
      switchMap(response => of(response))
    );
  }

  deleteRecord(url: string, objectID: string): Observable<HttpResponse<Object>> {
    return this.http.delete(`${url}/${objectID}`, { observe: 'response' }).pipe(
      tap(response => {
        response.status === 200 ? this.vs.showToast('Deleted successfully', 'success') : this.vs.showToast('Something went wrong', 'error');
      }),
      switchMap(response => of(response))
    );
  }

}
