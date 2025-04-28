import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileSidebarMenuComponent } from '../mobile-sidebar-menu/mobile-sidebar-menu.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MobileSidebarMenuComponent, AccountMenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuOpen = false; // Controla la visibilidad del menú lateral móvil.
  accountMenuOpen = false; // Controla la visibilidad del menú de la cuenta.
  @Output() toggleSidebar = new EventEmitter<void>(); // Emite un evento para indicar que se debe mostrar u ocultar la barra lateral.

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Invierte el estado de visibilidad del menú lateral móvil.
    this.toggleSidebar.emit(); // Emite el evento para notificar al componente padre sobre el cambio de estado del menú lateral.
  }

  onMenuClose() {
    this.menuOpen = false; // Establece el estado del menú lateral móvil a cerrado.
    this.updateBodyScroll(); // Actualiza el desplazamiento del body al cerrar el menú.
  }

  toggleAccountMenu() {
    this.accountMenuOpen = !this.accountMenuOpen; // Invierte el estado de visibilidad del menú de la cuenta.
    this.updateBodyScroll(); // Actualiza el desplazamiento del body al abrir o cerrar el menú de la cuenta.
  }

  onAccountMenuClose() {
    this.accountMenuOpen = false; // Establece el estado del menú de la cuenta a cerrado.
    this.updateBodyScroll(); // Actualiza el desplazamiento del body al cerrar el menú de la cuenta.
  }

  updateBodyScroll() {
    // Esta función maneja el comportamiento del scroll del body cuando el menú de la cuenta está abierto.
    if (this.accountMenuOpen) {
      document.body.style.position = 'fixed'; // Fija la posición del body para evitar el scroll.
      document.body.style.top = `-${window.scrollY}px`; // Guarda la posición actual del scroll y la aplica como un desplazamiento superior negativo.
      document.body.style.width = '100%'; // Asegura que el body ocupe todo el ancho.
    } else {
      const scrollY = document.body.style.top; // Obtiene la posición del scroll guardada.
      document.body.style.position = ''; // Restablece la posición del body a su valor predeterminado (static o relative).
      document.body.style.top = ''; // Restablece la propiedad top.
      document.body.style.width = ''; // Restablece el ancho del body.
      window.scrollTo(0, parseInt(scrollY || '0') * -1); // Restaura la posición del scroll al valor guardado.
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    // Este listener escucha el evento de la tecla Escape en todo el documento.
    if (this.accountMenuOpen) {
      this.onAccountMenuClose(); // Cierra el menú de la cuenta si está abierto al presionar la tecla Escape.
    }
  }
}
