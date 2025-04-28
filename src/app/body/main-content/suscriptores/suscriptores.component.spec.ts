import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscriptoresComponent } from './suscriptores.component';

describe('SuscriptoresComponent', () => {
  let component: SuscriptoresComponent;
  let fixture: ComponentFixture<SuscriptoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscriptoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscriptoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
