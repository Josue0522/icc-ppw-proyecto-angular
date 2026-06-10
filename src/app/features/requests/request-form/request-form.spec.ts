import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { RequestsService } from '../../../core/services/requests.service';
import { StrapiService } from '../../../core/services/strapi.service';

@Component({
  selector: 'app-request-form',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './request-form.html',
  styleUrl: './request-form.css',
})
export class RequestForm {
  private authService = inject(AuthService);
  private requestsService = inject(RequestsService);
  private strapiService = inject(StrapiService);

  user$ = this.authService.user$;
  programadores$ = this.strapiService.getProgramadores();

  nombre = '';
  correo = '';
  programadorSlug = '';
  descripcionProyecto = '';

  isLoading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  async submitRequest() {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (!this.nombre || !this.correo || !this.programadorSlug || !this.descripcionProyecto) {
      this.errorMessage.set('Completa todos los campos.');
      return;
    }

    const user = await firstValueFrom(this.user$);

    if (!user) {
      this.errorMessage.set('Debes iniciar sesión para enviar una solicitud.');
      return;
    }

    const programadoresResponse = await firstValueFrom(this.programadores$);

    const programador = programadoresResponse.data.find(
      (p) => p.slug === this.programadorSlug
    );

    if (!programador) {
      this.errorMessage.set('Selecciona un programador válido.');
      return;
    }

    try {
      this.isLoading.set(true);

      await this.requestsService.createRequest({
        nombreSolicitante: this.nombre,
        correoSolicitante: this.correo,
        descripcionProyecto: this.descripcionProyecto,
        programadorId: programador.id,
        programadorNombre: programador.nombreCompleto,
        programadorSlug: programador.slug,
        userId: user.uid,
        userEmail: user.email ?? '',
      });

      this.successMessage.set('Solicitud enviada correctamente.');

      this.nombre = '';
      this.correo = '';
      this.programadorSlug = '';
      this.descripcionProyecto = '';
    } catch (error) {
      this.errorMessage.set('No se pudo enviar la solicitud.');
    } finally {
      this.isLoading.set(false);
    }
  }
}