/* Componente para el filtro de categorías horizontalmente scrollable */
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtro-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtro-categorias.component.html',
  styleUrl: './filtro-categorias.component.scss',
})
export class FiltroCategoriasComponent implements AfterViewInit {
  categoriaSeleccionada = 'Todo'; // Almacena la categoría actualmente seleccionada.
  mostrarBotonIzquierda = false; // Controla la visibilidad del botón para scroll hacia la izquierda.

  @ViewChild('lista') lista!: ElementRef; // Referencia al elemento ul que contiene la lista de categorías.

  private isDragging = false; // Indica si el usuario está arrastrando la lista.
  private startX!: number; // Almacena la posición inicial del mouse al comenzar el arrastre.
  private scrollLeftStart!: number; // Almacena la posición inicial del scroll al comenzar el arrastre.

  categorias = [
    // Array de categorías para el filtro.
    'Todo',
    'Música',
    'Videojuegos',
    'En directo',
    'Podcasts',
    'Documentales',
    'Series',
    'Ciencia',
    'Tecnología',
    'Deportes',
    'Noticias',
    'Cocina',
    'Arte culinario',
    'Anime',
    'Comedia',
    'Educación',
  ];

  ngAfterViewInit() {
    // Se ejecuta después de que la vista del componente y sus hijos han sido inicializados.
    this.verificarScroll(); // Verifica si la lista de categorías es scrollable inicialmente.
  }

  seleccionarCategoria(cat: string) {
    // Actualiza la categoría seleccionada.
    this.categoriaSeleccionada = cat;
  }

  scrollDerecha() {
    // Desplaza la lista de categorías hacia la derecha de forma suave.
    this.lista.nativeElement.scrollBy({ left: 400, behavior: 'smooth' });
  }

  scrollIzquierda() {
    // Desplaza la lista de categorías hacia la izquierda de forma suave.
    this.lista.nativeElement.scrollBy({ left: -400, behavior: 'smooth' });
  }

  verificarScroll() {
    // Verifica la posición del scroll para mostrar u ocultar el botón de scroll izquierdo.
    const scrollLeft = this.lista.nativeElement.scrollLeft;
    this.mostrarBotonIzquierda = scrollLeft > 0;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    // Se ejecuta al presionar el botón del mouse sobre la lista.
    this.isDragging = true; // Indica que el arrastre ha comenzado.
    this.startX = event.pageX - this.lista.nativeElement.offsetLeft; // Calcula la posición inicial del mouse relativa al contenedor.
    this.scrollLeftStart = this.lista.nativeElement.scrollLeft; // Guarda la posición inicial del scroll.
  }

  @HostListener('mouseup')
  onMouseUp() {
    // Se ejecuta al soltar el botón del mouse.
    this.isDragging = false; // Indica que el arrastre ha terminado.
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    // Se ejecuta cuando el mouse sale del área de la lista.
    this.isDragging = false; // Indica que el arrastre ha terminado.
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Se ejecuta cuando el mouse se mueve sobre la lista mientras el botón está presionado.
    if (!this.isDragging) {
      return; // Si no se está arrastrando, no hacer nada.
    }

    const x = event.pageX - this.lista.nativeElement.offsetLeft; // Calcula la posición actual del mouse relativa al contenedor.
    const walk = (x - this.startX) * 1; // Calcula la distancia recorrida por el mouse.
    this.lista.nativeElement.scrollLeft = this.scrollLeftStart - walk; // Actualiza la posición del scroll para simular el arrastre.
  }
}
// El componente permite a los usuarios seleccionar una categoría de un conjunto de categorías.
// La lista de categorías es scrollable horizontalmente, y el usuario puede arrastrar la lista para navegar por las categorías.