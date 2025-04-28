import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnChanges,
  SimpleChanges,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-mobile-sidebar-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-sidebar-menu.component.html',
  styleUrls: ['./mobile-sidebar-menu.component.scss'],
})
export class MobileSidebarMenuComponent implements OnChanges {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();
  private desktopBreakpoint = 1314;
  private scrollY = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  ngOnDestroy() {
    this.unlockScroll();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.lockScroll();
      } else {
        this.unlockScroll();
      }
    }
  }

  private lockScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollY = window.scrollY;
      document.body.style.top = `-${this.scrollY}px`;
      document.body.classList.add('block-scroll');
    }
  }

  private unlockScroll() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('block-scroll');
      document.body.style.top = '';
      window.scrollTo(0, this.scrollY);
    }
  }

  private checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth >= this.desktopBreakpoint && this.isOpen) {
        this.closeMenu.emit();
      }
    }
  }
}
