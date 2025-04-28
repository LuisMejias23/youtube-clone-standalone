import { Routes } from '@angular/router';
import { ListaDeVideosComponent } from './body/main-content/lista-de-videos/lista-de-videos.component';
import { SuscriptoresComponent } from './body/main-content/suscriptores/suscriptores.component';

export const routes: Routes = [
  { path: '', component: ListaDeVideosComponent },  
  { path: 'suscriptores', component: SuscriptoresComponent } 
];
