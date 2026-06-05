import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StrapiService } from '../../../core/services/strapi.service';

@Component({
  selector: 'app-project-list',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
  private strapiService = inject(StrapiService);

  projects$ = this.strapiService.getProyectos();

  getImageUrl(path?: string) {
    return this.strapiService.getImageUrl(path);
  }
}