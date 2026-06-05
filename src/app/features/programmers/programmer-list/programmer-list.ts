import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StrapiService } from '../../../core/services/strapi.service';

@Component({
  selector: 'app-programmer-list',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './programmer-list.html',
  styleUrl: './programmer-list.css',
})
export class ProgrammerList {
  private strapiService = inject(StrapiService);

  programmers$ = this.strapiService.getProgramadores();

  getImageUrl(path?: string) {
    return this.strapiService.getImageUrl(path);
  }
}