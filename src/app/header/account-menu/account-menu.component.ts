import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  PLATFORM_ID,
  Inject,
  Renderer2,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-account-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnDestroy, OnChanges {
  @Input() isOpen = false; // Indica si el menú de la cuenta está abierto o cerrado.
  isDarkMode = false; // Controla el estado del modo oscuro.
  @Output() closeMenu = new EventEmitter<void>(); // Emite un evento cuando se solicita cerrar el menú.

  private scrollListener: (() => void) | null = null; // Almacena la función listener para el evento de scroll.
  private initialScrollTop = 0; // Almacena la posición inicial del scroll al abrir el menú.

  constructor(
    private elementRef: ElementRef, // Referencia al elemento del componente.
    private renderer: Renderer2, // Servicio para manipular el DOM de forma segura.
    @Inject(PLATFORM_ID) private platformId: Object // Identificador de la plataforma (navegador o servidor).
  ) {}

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode; // Invierte el estado del modo oscuro.
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode'); // Agrega la clase 'dark-mode' al body para activar el modo oscuro.
    } else {
      document.body.classList.remove('dark-mode'); // Remueve la clase 'dark-mode' del body para desactivar el modo oscuro.
    }
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement): void {
    // Escucha los clics en el documento para cerrar el menú si se hace clic fuera de él.
    if (this.isOpen && !this.elementRef.nativeElement.contains(target)) {
      this.close(); // Llama a la función para cerrar el menú.
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(): void {
    // Escucha la tecla Escape para cerrar el menú si está abierto.
    if (this.isOpen) {
      this.close(); // Llama a la función para cerrar el menú.
    }
  }

  close(): void {
    this.closeMenu.emit(); // Emite el evento para notificar al componente padre que se debe cerrar el menú.
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Se ejecuta cuando cambian las propiedades de entrada del componente.
    if (changes['isOpen']) {
      // Si la propiedad 'isOpen' ha cambiado.
      if (this.isOpen && isPlatformBrowser(this.platformId)) {
        // Si el menú se está abriendo y estamos en el navegador.
        this.initialScrollTop =
          window.scrollY || document.documentElement.scrollTop; // Guarda la posición actual del scroll.
        this.attachScrollListener(); // Adjunta el listener para controlar el scroll mientras el menú está abierto.
        this.preventBodyScroll(); // Evita el scroll del body mientras el menú está abierto.
      } else if (isPlatformBrowser(this.platformId)) {
        // Si el menú se está cerrando y estamos en el navegador.
        this.detachScrollListener(); // Remueve el listener de scroll.
        this.restoreBodyScroll(); // Restaura el scroll del body a su estado original.
      }
    }
  }

  ngOnDestroy(): void {
    // Se ejecuta cuando el componente se destruye.
    this.detachScrollListener(); // Asegura que el listener de scroll se remueva.
    this.restoreBodyScroll(); // Asegura que el scroll del body se restaure.
  }

  private attachScrollListener(): void {
    // Adjunta un listener al evento de scroll de la ventana para evitar el desplazamiento mientras el menú está abierto.
    if (!this.scrollListener) {
      this.scrollListener = this.renderer.listen('window', 'scroll', () => {
        // Si el usuario intenta desplazarse más allá de una pequeña tolerancia.
        if (window.scrollY > this.initialScrollTop + 1) {
          window.scrollTo({ top: this.initialScrollTop, behavior: 'instant' }); // Fuerza el scroll a la posición inicial.
        }
      });
    }
  }

  private detachScrollListener(): void {
    // Remueve el listener del evento de scroll si existe.
    if (this.scrollListener) {
      this.scrollListener(); // Llama a la función de cancelación del listener.
      this.scrollListener = null; // Limpia la referencia al listener.
    }
  }

  private preventBodyScroll(): void {
    // Evita el scroll del body estableciendo su posición a 'relative' y 'top' a '0'.
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setStyle(document.body, 'position', 'relative');
      this.renderer.setStyle(document.body, 'top', '0px');
      this.renderer.setStyle(document.body, 'width', '100%');
    }
  }

  private restoreBodyScroll(): void {
    // Restaura el scroll del body a su estado original removiendo los estilos que lo prevenían.
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.removeStyle(document.body, 'position');
      this.renderer.removeStyle(document.body, 'top');
      this.renderer.removeStyle(document.body, 'width');
    } 
  } 
} 
  