import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IetrComponent } from './ietr.component';

describe('IetrComponent', () => {
  let component: IetrComponent;
  let fixture: ComponentFixture<IetrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IetrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IetrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
