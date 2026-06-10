import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import {
  ContactRequest,
  RequestsService,
} from '../../../core/services/requests.service';
import { Programador, StrapiService } from '../../../core/services/strapi.service';

@Component({
  selector: 'app-request-list',
  imports: [AsyncPipe, DatePipe, FormsModule],
  templateUrl: './request-list.html',
  styleUrl: './request-list.css',
})
export class RequestList {
  private authService = inject(AuthService);
  private requestsService = inject(RequestsService);
  private strapiService = inject(StrapiService);

  responseText: Record<string, string> = {};
  isSaving = signal(false);

  currentProgrammer$ = this.authService.user$.pipe(
    switchMap((user) => {
      if (!user?.email) return of(null);

      return this.strapiService.getProgramadores().pipe(
        map((response) => {
          return (
            response.data.find(
              (programmer: Programador) =>
                programmer.correoContacto === user.email
            ) ?? null
          );
        })
      );
    })
  );

  requests$ = this.authService.user$.pipe(
    switchMap((user) => {
      if (!user) return of([]);

      return this.currentProgrammer$.pipe(
        switchMap((programmer) => {
          if (programmer) {
            return this.requestsService.getRequestsByProgrammer(programmer.slug);
          }

          return this.requestsService.getRequestsByUser(user.uid);
        })
      );
    })
  );

  isProgrammer$ = this.currentProgrammer$.pipe(
    map((programmer) => Boolean(programmer))
  );

  getCreatedAtDate(request: ContactRequest): Date | null {
    if (!request.createdAt) return null;

    if (request.createdAt.toDate) {
      return request.createdAt.toDate();
    }

    return null;
  }

  async respond(request: ContactRequest) {
    if (!request.id) return;

    const respuesta = this.responseText[request.id];

    if (!respuesta || respuesta.trim().length === 0) {
      alert('Escribe una respuesta antes de guardar.');
      return;
    }

    try {
      this.isSaving.set(true);
      await this.requestsService.respondRequest(request.id, respuesta);
      this.responseText[request.id] = '';
    } catch (error) {
      alert('No se pudo guardar la respuesta.');
    } finally {
      this.isSaving.set(false);
    }
  }
}