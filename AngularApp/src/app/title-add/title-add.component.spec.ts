import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleAddComponent } from './title-add.component';

describe('TitleAddComponent', () => {
  let component: TitleAddComponent;
  let fixture: ComponentFixture<TitleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
