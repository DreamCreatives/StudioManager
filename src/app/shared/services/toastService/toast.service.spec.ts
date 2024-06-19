import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('ToastService', () => {
  let service: ToastService;
  let toastrSpy: jasmine.SpyObj<ToastrService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ToastrService', ['success', 'error', 'warning', 'info', 'show']);

    TestBed.configureTestingModule({
      imports: [ToastrModule],
      providers: [
        ToastService,
        { provide: ToastrService, useValue: spy }
      ]
    });

    service = TestBed.inject(ToastService);
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open success toast', () => {
    service.show('Success toast', 'success');
    expect(toastrSpy.success).toHaveBeenCalled();
    expect(service.lastToastTime).toBeLessThanOrEqual(Date.now());
  });

  it('should open error toast', () => {
    service.show('Error toast', 'error');
    expect(toastrSpy.error).toHaveBeenCalled();
    expect(service.lastToastTime).toBeLessThanOrEqual(Date.now());
  });

  it('should open warning toast', () => {
    service.show('Warning toast', 'warning');
    expect(toastrSpy.warning).toHaveBeenCalled();
    expect(service.lastToastTime).toBeLessThanOrEqual(Date.now());
  });

  it('should open info toast', () => {
    service.show('Info toast', 'info');
    expect(toastrSpy.info).toHaveBeenCalled();
    expect(service.lastToastTime).toBeLessThanOrEqual(Date.now());
  });

  it('should open show toast', () => {
    service.show('Show toast', 'other');
    expect(toastrSpy.show).toHaveBeenCalled();
    expect(service.lastToastTime).toBeLessThanOrEqual(Date.now());
  });
});
