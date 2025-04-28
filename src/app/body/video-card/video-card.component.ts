/* Componente para mostrar una tarjeta de video individual */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export class VideoCardComponent {
  @Input() image!: {
    title: string; // Título del video
    channel: string; // Nombre del canal
    views: string; // Número de vistas
    thumbnail: string; // URL de la miniatura del video
  };
}
