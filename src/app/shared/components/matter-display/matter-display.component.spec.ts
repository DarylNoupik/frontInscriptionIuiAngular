import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDisplayComponent } from './matter-display.component';

describe('MatterDisplayComponent', () => {
  let component: MatterDisplayComponent;
  let fixture: ComponentFixture<MatterDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
