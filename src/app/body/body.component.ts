/* Componente del cuerpo principal de la aplicación */
import {
  Component,
  Input,
  Inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MobileSidebarMenuComponent } from '../mobile-sidebar-menu/mobile-sidebar-menu.component';
import { FiltroCategoriasComponent } from './filtro-categorias/filtro-categorias.component';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    RouterModule,
    RouterOutlet,
    MobileSidebarMenuComponent,
    FiltroCategoriasComponent,
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class BodyComponent implements OnInit, OnDestroy {
  @Input() isSidebarVisible = true; // Controla la visibilidad de la barra lateral.
  isMobile: boolean = false; // Indica si la pantalla es de tipo móvil.
  isDesktop: boolean = true; // Indica si la pantalla es de tipo escritorio.
  private isBrowser: boolean; // Booleano para verificar si la aplicación se está ejecutando en el navegador.
  private resizeListener?: () => void; // Listener para el evento de redimensionamiento de la ventana.

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId); // Determina si la plataforma actual es un navegador.
  }

  ngOnInit() {
    // Se ejecuta al inicializar el componente.
    if (this.isBrowser) {
      this.checkScreenSize(); // Verifica el tamaño de la pantalla al inicio.

      this.resizeListener = () => {
        this.checkScreenSize(); // Vuelve a verificar el tamaño de la pantalla al redimensionar la ventana.
      };

      window.addEventListener('resize', this.resizeListener); // Agrega el listener para el evento de redimensionamiento.
    }
  }

  ngOnDestroy() {
    // Se ejecuta al destruir el componente.
    if (this.isBrowser && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener); // Remueve el listener del evento de redimensionamiento para evitar fugas de memoria.
    }
  }

  checkScreenSize() {
    // Verifica si la pantalla es de escritorio basándose en el ancho mínimo.
    this.isDesktop = window.matchMedia('(min-width: 769px)').matches;

    // Si la aplicación se visualiza en un dispositivo móvil, la barra lateral se oculta.
    if (this.isMobile) {
      this.isSidebarVisible = false;
    }
  }
}
