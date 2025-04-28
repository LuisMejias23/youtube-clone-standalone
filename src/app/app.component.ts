import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FiltroCategoriasComponent } from './body/filtro-categorias/filtro-categorias.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isSidebarVisible = true;

  onToggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    console.log('Sidebar visible?', this.isSidebarVisible);
  }
}
