import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ViewService } from '../viewService/view.service';

describe('ApiService', () => {
  let service: ApiService;
  let viewService: jasmine.SpyObj<ViewService>;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const viewSpyObject = jasmine.createSpyObj('ViewService', ['handleError', 'showToast']);
    const httpClientSpyObject = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: HttpClient, useValue: httpClientSpyObject },
        { provide: ViewService, useValue: viewSpyObject },
      ]
    });

    service = TestBed.inject(ApiService);
    viewService = TestBed.inject(ViewService) as jasmine.SpyObj<ViewService>;
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
