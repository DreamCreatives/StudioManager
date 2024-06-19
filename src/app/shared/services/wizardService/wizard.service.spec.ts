import { TestBed } from '@angular/core/testing';

import { WizardService } from './wizard.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { ViewService } from '../viewService/view.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { WizardComponent } from '../../components/wizard/wizard.component';

describe('WizardService', () => {
  let service: WizardService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let viewServiceSpy: jasmine.SpyObj<ViewService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let formBuilderSpy: jasmine.SpyObj<FormBuilder>;

  beforeEach(() => {
    const dialogSpyObj = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
    const viewServiceSpyObj = jasmine.createSpyObj('ViewService', ['getWizardConfig']);
    const httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get'])
    const formBuilderSpyObj = jasmine.createSpyObj('FormBuilder', ['group']);

    TestBed.configureTestingModule({
      imports: [MatDialogModule, OverlayModule],
      providers: [
        WizardService,
        { provide: MatDialog, useValue: dialogSpyObj },
        { provide: ViewService, useValue: viewServiceSpyObj},
        { provide: HttpClient, useValue: httpClientSpyObj },
        { provide: FormBuilder, useValue: formBuilderSpyObj },
      ]
    });

    service = TestBed.inject(WizardService);
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    viewServiceSpy = TestBed.inject(ViewService) as jasmine.SpyObj<ViewService>;
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    formBuilderSpy = TestBed.inject(FormBuilder) as jasmine.SpyObj<FormBuilder>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the wizard with given config', () => {
    const mockConfig = {
      data: {
        title: 'Test wizard',
        formGroup: formBuilderSpy.group({name: ''}),
        fields: [
          {
              label: "Name",
              type: "text",
              name: "name",
              isClass: false,
              options: [],
          },
        ]
      },
      panelClass: 'custom-modalbox',
      disableClose: true
    }
    // viewServiceSpy.getWizardConfig.and.returnValue(of(mockConfig.data));
    // dialogSpy.open.and.returnValue({ afterClosed: () => of(true) });

    service.create('testsWizard').subscribe(() => {
      expect(dialogSpy.open).toHaveBeenCalledWith(WizardComponent, mockConfig);
    });
    
  })
});
