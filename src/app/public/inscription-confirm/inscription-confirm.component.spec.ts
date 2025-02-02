import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionConfirmComponent } from './inscription-confirm.component';

describe('InscriptionConfirmComponent', () => {
  let component: InscriptionConfirmComponent;
  let fixture: ComponentFixture<InscriptionConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
