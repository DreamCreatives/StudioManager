import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';

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

  saveEdit(url: string, body: any, params: any, objectID: string): Observable<boolean> {
    return this.http.put(`${url}/${objectID}`, body, { params: params }).pipe(
      switchMap(response => {
        console.log(response);
        return of(true);
      })
    );
  }

}
