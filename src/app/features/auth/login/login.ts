import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  isLoading = signal(false);
  errorMessage = signal('');

  async login() {
    this.errorMessage.set('');

    if (!this.email || !this.password) {
      this.errorMessage.set('Ingresa tu correo y contraseña.');
      return;
    }

    try {
      this.isLoading.set(true);
      await this.authService.login(this.email, this.password);
      await this.router.navigate(['/solicitudes']);
    } catch (error) {
      this.errorMessage.set('Correo o contraseña incorrectos.');
    } finally {
      this.isLoading.set(false);
    }
  }
}