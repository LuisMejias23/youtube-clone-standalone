import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../../video-card/video-card.component';

@Component({
  selector: 'app-lista-de-videos',
  standalone: true,
  imports: [CommonModule, VideoCardComponent],
  templateUrl: './lista-de-videos.component.html',
  styleUrl: './lista-de-videos.component.scss',
})
export class ListaDeVideosComponent {
  images = [
    {
      title: 'Título del Video 1',
      channel: 'Canal 1',
      views: '100K vistas',
      thumbnail: 'assets/images/img1.jpeg',
    },
    {
      title: 'Título del Video 2',
      channel: 'Canal 2',
      views: '50K vistas',
      thumbnail: 'assets/images/img2.jpeg',
    },
    {
      title: 'Título del Video 3',
      channel: 'Canal 3',
      views: '55K vistas',
      thumbnail: 'assets/images/img3.jpeg',
    },
    {
      title: 'Título del Video 4',
      channel: 'Canal 4',
      views: '5K vistas',
      thumbnail: 'assets/images/img4.jpeg',
    },
    {
      title: 'Título del Video 5',
      channel: 'Canal 5',
      views: '40K vistas',
      thumbnail: 'assets/images/img5.jpeg',
    },
    {
      title: 'Título del Video 6',
      channel: 'Canal 6',
      views: '50K vistas',
      thumbnail: 'assets/images/img6.jpeg',
    },
    {
      title: 'Título del Video 7',
      channel: 'Canal 7',
      views: '50K vistas',
      thumbnail: 'assets/images/img7.jpeg',
    },
    {
      title: 'Título del Video 8',
      channel: 'Canal 8',
      views: '50K vistas',
      thumbnail: 'assets/images/img8.jpeg',
    },
    {
      title: 'Título del Video 9',
      channel: 'Canal 9',
      views: '550K vistas',
      thumbnail: 'assets/images/img9.jpeg',
    },
    {
      title: 'Título del Video 10',
      channel: 'Canal 10',
      views: '50K vistas',
      thumbnail: 'assets/images/img10.jpeg',
    },
    {
      title: 'Título del Video 11',
      channel: 'Canal 11',
      views: '30K vistas',
      thumbnail: 'assets/images/img11.jpeg',
    },
    {
      title: 'Título del Video 12',
      channel: 'Canal 12',
      views: '50K vistas',
      thumbnail: 'assets/images/img12.jpeg',
    },
  ];
}
