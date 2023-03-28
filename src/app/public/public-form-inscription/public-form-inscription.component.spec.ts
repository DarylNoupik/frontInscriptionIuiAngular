import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFormInscriptionComponent } from './public-form-inscription.component';

describe('PublicFormInscriptionComponent', () => {
  let component: PublicFormInscriptionComponent;
  let fixture: ComponentFixture<PublicFormInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicFormInscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicFormInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
