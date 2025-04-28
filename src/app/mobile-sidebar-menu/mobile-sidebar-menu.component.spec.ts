import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSidebarMenuComponent } from './mobile-sidebar-menu.component';

describe('MobileSidebarMenuComponent', () => {
  let component: MobileSidebarMenuComponent;
  let fixture: ComponentFixture<MobileSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSidebarMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
