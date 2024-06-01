import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleEditFormComponent } from './title-edit-form.component';

describe('TitleEditFormComponent', () => {
  let component: TitleEditFormComponent;
  let fixture: ComponentFixture<TitleEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
