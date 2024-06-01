import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Observable, switchMap, of, tap } from 'rxjs';
import { YesNoComponent } from '../../components/yes-no/yes-no.component';

@Injectable({
  providedIn: 'root'
})
export class YesNoService {
  buttonClicks$: Observable<Event> = fromEvent(document.getElementsByClassName('btn-yes-no'), 'click');
  
  constructor(private dialog: MatDialog) { }

  public isSaved = false;

  run(question: string): Observable<boolean> {
    this.dialog.open(YesNoComponent, {
      width: '25%',
      data: {
        question: question,
      },
      panelClass: 'custom-modalbox',
      disableClose: true,
    });
    return this.buttonClicks$.pipe(
      tap(() => { this.dialog.closeAll() }),
      switchMap(() => of(this.isSaved))
    );
  }
}
