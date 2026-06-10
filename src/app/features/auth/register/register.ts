import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';

  isLoading = signal(false);
  errorMessage = signal('');

  async register() {
    this.errorMessage.set('');

    if (!this.name || !this.email || !this.password) {
      this.errorMessage.set('Completa todos los campos.');
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage.set('La contraseña debe tener mínimo 6 caracteres.');
      return;
    }

    try {
      this.isLoading.set(true);
      await this.authService.register(this.email, this.password);
      await this.router.navigate(['/solicitudes']);
    } catch (error) {
      this.errorMessage.set('No se pudo crear la cuenta. Revisa el correo o intenta con otro.');
    } finally {
      this.isLoading.set(false);
    }
  }
}