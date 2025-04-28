/* Componente para la barra lateral de navegación */
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebarRef!: ElementRef<HTMLDivElement>; // Referencia al elemento div de la barra lateral en el template.

  ngAfterViewInit(): void {
    // Se ejecuta después de que la vista del componente y sus hijos han sido inicializados.
    const sidebar = this.sidebarRef.nativeElement; // Obtiene la referencia al elemento de la barra lateral.

    sidebar.addEventListener(
      'wheel',
      (e) => {
        // Agrega un listener para el evento 'wheel' (scroll con la rueda del ratón o similar).
        const { scrollTop, scrollHeight, clientHeight } = sidebar; // Obtiene las propiedades de scroll del elemento.
        const delta = e.deltaY; // Obtiene la cantidad de desplazamiento vertical.

        // Previene el comportamiento de scroll predeterminado si se intenta desplazar más allá del inicio o el final del contenido.
        if (
          (delta > 0 && scrollTop + clientHeight >= scrollHeight) || // Si se desplaza hacia abajo y se alcanza el final.
          (delta < 0 && scrollTop <= 0) // Si se desplaza hacia arriba y se alcanza el inicio.
        ) {
          e.preventDefault(); // Evita el scroll de la página principal.
        }
      },
      { passive: false } // 'passive: false' es necesario para poder llamar a 'preventDefault'.
    );
  }
}