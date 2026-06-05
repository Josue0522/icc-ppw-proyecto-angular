import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { StrapiService } from '../../../core/services/strapi.service';

@Component({
  selector: 'app-programmer-detail',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './programmer-detail.html',
  styleUrl: './programmer-detail.css',
})
export class ProgrammerDetail {
  private route = inject(ActivatedRoute);
  private strapiService = inject(StrapiService);

  programmer$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const slug = params.get('slug') ?? '';
      return this.strapiService.getProgramadorBySlug(slug);
    }),
    map((response) => response.data[0])
  );

  getImageUrl(path?: string) {
    return this.strapiService.getImageUrl(path);
  }

  getDescriptionText(description: any[] | null | undefined): string {
    if (!description) return '';

    return description
      .map((block) =>
        block.children?.map((child: any) => child.text).join('')
      )
      .join('\n\n');
  }
}