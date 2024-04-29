import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoComponent } from './yes-no.component';

describe('YesNoComponent', () => {
  let component: YesNoComponent;
  let fixture: ComponentFixture<YesNoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YesNoComponent]
    });
    fixture = TestBed.createComponent(YesNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
