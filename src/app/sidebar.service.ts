import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private isSidebarVisible = new BehaviorSubject<boolean>(true);
  sidebarVisible$ = this.isSidebarVisible.asObservable();

  toggleSidebar() {
    this.isSidebarVisible.next(!this.isSidebarVisible.value);
  }

  setSidebarVisibility(value: boolean) {
    this.isSidebarVisible.next(value);
  }
}
