import { TestBed } from '@angular/core/testing';

import { YesNoService } from './yes-no.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { YesNoComponent } from '../../components/yes-no/yes-no.component';

describe('YesNoService', () => {
  let service: YesNoService;
  let dialogSpy: jasmine.SpyObj<MatDialog>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

    TestBed.configureTestingModule({
      imports: [MatDialogModule, OverlayModule],
      providers: [
        YesNoService,
        { provide: MatDialog, useValue: spy }
      ]
    });

    service = TestBed.inject(YesNoService);
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the dialog with the correct parameters', () => {
    service.run('Are you sure?').subscribe();
    expect(dialogSpy.open).toHaveBeenCalledWith(YesNoComponent, {
      width: '25%',
      data: {
        question: 'Are you sure?'
      },
      panelClass: 'custom-modalbox',
      disableClose: true
    })
  });

  it('should close the dialog and emit isSaved value on button click', () => {
    const event = new Event('click');

    const buttons = document.getElementsByClassName('btn-yes-no');
    let button = buttons[0] as HTMLElement;

    if (!button) {
      const btn = document.createElement('button');
      btn.className = 'btn-yes-no';
      document.body.appendChild(btn);

      const createdButtons = document.getElementsByClassName('btn-yes-no');
      button = createdButtons[0] as HTMLElement;
    }

    service.isSaved = true;

    service.run('Are you sure?').subscribe(result => {
      expect(result).toBeTrue();
    });

    button.dispatchEvent(event);

    expect(dialogSpy.closeAll).toHaveBeenCalled();
  })
});
