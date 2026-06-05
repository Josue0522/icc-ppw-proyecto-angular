import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StrapiService, Proyecto,
  Servicio,
  StrapiResponse, } from '../../core/services/strapi.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private strapiService = inject(StrapiService);

  servicios$: Observable<StrapiResponse<Servicio>> =
    this.strapiService.getServicios();

  proyectosDestacados$: Observable<StrapiResponse<Proyecto>> =
    this.strapiService.getProyectosDestacados();

  getIcon(icono: string) {
    const icons: Record<string, string> = {
      laptop: '💻',
      server: '⚙️',
      palette: '🎨',
    };

    return icons[icono] ?? '✨';
  }

  getImageUrl(path?: string) {
    return this.strapiService.getImageUrl(path);
  }
}