import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeVideosComponent } from './lista-de-videos.component';

describe('ListaDeVideosComponent', () => {
  let component: ListaDeVideosComponent;
  let fixture: ComponentFixture<ListaDeVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeVideosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
