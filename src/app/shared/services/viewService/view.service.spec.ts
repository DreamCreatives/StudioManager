import { TestBed } from '@angular/core/testing';

import { ViewService } from './view.service';
import { Router } from '@angular/router';
import { ToastService } from '../toastService/toast.service';
import { CID } from '../../config/constants.json';

describe('ViewService', () => {
  let service: ViewService;
  let toastSpy: jasmine.SpyObj<ToastService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const toastSpyObject = jasmine.createSpyObj('ToastService', ['show']);
    const routerSpyObject = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])

    TestBed.configureTestingModule({
      providers: [
        ViewService,
        { provide: ToastService, useValue: toastSpyObject },
        { provide: Router, useValue: routerSpyObject }
      ]
    });

    service = TestBed.inject(ViewService);
    toastSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return dataGrid config using viewID', () => {
    service.getDataGridConfig('testsDataGrid').subscribe(result => {
      expect(result).toEqual({
        dataGridName: 'Test data grid',
        reroutePath: 'test-data-grid',
        headers: ["ID", "Data grid"],
        dataGridFieldsNames: ['id', 'dataGrid'],
        data: [[1, "Data grid 1"], [2, "Data grid 2"]],
        getUrl: ''
      });
    });
  });

  it('should return undefined for invalid dataGrid viewID', () => {
    service.getDataGridConfig('indavlidDataGrid').subscribe(result => {
      expect(result).toBeUndefined();
    });
  });

  it('should return wizard config using viewID', () => {
    service.getWizardConfig('testsWizard').subscribe(result => {
      expect(result).toEqual({
        title: 'Test wizard',
        fields: [
            {
                fieldLabel: "Name",
                fieldType: "text",
                fieldName: "name",
                isClass: false,
                isRequired: false,
                classDataUrl: '',
            },
        ],
        formBuilderGroupFields: [
            {
                fieldKey: 'name',
                fieldValue: ''
            },
        ]
    });
    });
  });

  it('should return undefined for invalid wizard viewID', () => {
    service.getWizardConfig('indavlidWizard').subscribe(result => {
      expect(result).toBeUndefined();
    });
  });

  it('should return edit config using viewID', () => {
    service.getEditConfig('testsEdit').subscribe(result => {
      expect(result).toEqual({
        fields: [
            {
                fieldLabel: "Name",
                fieldType: "text",
                fieldName: "name",
                isClass: false,
                isRequired: false,
                classDataUrl: '',
            }
        ],
        rerouteOnCancel: 'edit-tests-list',
        baseUrl: CID.EQUIPMENT_TYPE,
        formBuilderGroupFields: [
            {
                fieldKey: 'name',
                fieldValue: ''
            },
        ]
    });
    });
  });

  it('should return undefined for invalid edit viewID', () => {
    service.getEditConfig('indavlidEdit').subscribe(result => {
      expect(result).toBeUndefined();
    });
  });

  it('should return actions config using viewID', () => {
    service.getActionsConfig('testsActions').subscribe(result => {
      expect(result).toEqual({
        actions: [
            {
                displayName: 'Test action',
                actionName: 'test'
            }
        ]
    });
    });
  });

  it('should return undefined for invalid actions viewID', () => {
    service.getActionsConfig('indavlidDataGrid').subscribe(result => {
      expect(result).toBeUndefined();
    });
  });

  it('should refresh', () => {
    const url = '/equipment-list';
    routerSpy.navigateByUrl.and.returnValue(Promise.resolve(true));
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    routerSpy.navigate([url]);
    service.refresh();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/', { skipLocationChange: true });

    setTimeout(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith([url]);
    });
  });

  it('should show toast', () => {
    service.showToast('Test message', 'success');
    expect(toastSpy.show).toHaveBeenCalled();
  });
});
