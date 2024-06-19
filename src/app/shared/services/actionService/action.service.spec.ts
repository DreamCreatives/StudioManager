import { TestBed } from '@angular/core/testing';

import { ActionService } from './action.service';
import { WizardService } from '../wizardService/wizard.service';
import { YesNoService } from '../yesNoService/yes-no.service';
import { ApiService } from '../apiService/api.service';
import { ViewService } from '../viewService/view.service';

describe('ActionService', () => {
  let service: ActionService;
  let wizardSpy: jasmine.SpyObj<WizardService>;
  let yesNoSpy: jasmine.SpyObj<YesNoService>;
  let apiSpy: jasmine.SpyObj<ApiService>;
  let viewSpy: jasmine.SpyObj<ViewService>;

  beforeEach(() => {
    const wizardSpyObject = jasmine.createSpyObj('WizardService', ['create', 'destroy', 'allowSave', 'getValue']);
    const yesNoSpyObject = jasmine.createSpyObj('YesNoService', ['run']);
    const apiSpyObject = jasmine.createSpyObj('ApiService', ['saveRecord', 'deleteRecord']);
    const viewSpyObject = jasmine.createSpyObj('ViewService', ['showToast', 'refresh']);

    TestBed.configureTestingModule({
      providers: [
        ActionService,
        { provide: WizardService, useValue: wizardSpyObject },
        { provide: YesNoService, useValue: yesNoSpyObject },
        { provide: ApiService, useValue: apiSpyObject },
        { provide: ViewService, useValue: viewSpyObject },
      ]
    });

    service = TestBed.inject(ActionService);
    wizardSpy = TestBed.inject(WizardService) as jasmine.SpyObj<WizardService>;
    yesNoSpy = TestBed.inject(YesNoService) as jasmine.SpyObj<YesNoService>;
    apiSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    viewSpy = TestBed.inject(ViewService) as jasmine.SpyObj<ViewService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
