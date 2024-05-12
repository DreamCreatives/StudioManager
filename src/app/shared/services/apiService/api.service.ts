import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  getDataGridData(url: string) {
    return this.http.get(url);
  }

  getEditObjectByID(url: string, params: any) {
    return this.http.get(url, { params: params }).pipe(
      switchMap(response => of(response))
    )
  }

  saveEdit(url: string, body: any, params: any, objectID: string): Observable<HttpResponse<Object>> {
    return this.http.put(`${url}/${objectID}`, body, { params: params, observe: 'response' }).pipe(
      switchMap(response => of(response))
    );
  }

  saveWizard(url: string, body: any, params: any): Observable<HttpResponse<Object>> {
    return this.http.post(url, body, { params: params, observe: 'response' }).pipe(
      switchMap(response => of(response))
    );
  }

  deleteRecord(url: string, objectID: string): Observable<HttpResponse<Object>> {
    return this.http.delete(`${url}/${objectID}`, { observe: 'response' }).pipe(
      switchMap(response => of(response))
    );
  }

}
