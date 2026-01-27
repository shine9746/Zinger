import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomToaster } from './custom-toaster';

describe('CustomToaster', () => {
  let component: CustomToaster;
  let fixture: ComponentFixture<CustomToaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomToaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomToaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
