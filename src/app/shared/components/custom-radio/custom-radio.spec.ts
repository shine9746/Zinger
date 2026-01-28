import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRadio } from './custom-radio';

describe('CustomRadio', () => {
  let component: CustomRadio;
  let fixture: ComponentFixture<CustomRadio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomRadio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomRadio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
