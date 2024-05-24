import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAddFormComponent } from './emp-add-form.component';

describe('EmpAddFormComponent', () => {
  let component: EmpAddFormComponent;
  let fixture: ComponentFixture<EmpAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpAddFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
