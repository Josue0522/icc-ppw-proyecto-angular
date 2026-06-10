import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface StrapiResponse<T> {
  data: T[];
}

export interface Programador {
  id: number;
  nombreCompleto: string;
  especialidad: string;
  descripcionBreve: string;
  descripcionCompleta: any[];
  correoContacto: string;
  github: string;
  linkedin: string | null;
  slug: string;
  activo: boolean;
  fotoPerfil?: {
    url: string;
  };
  proyectos?: Proyecto[];
}

export interface Proyecto {
  id: number;
  nombre: string;
  slug: string;
  descripcionBreve: string;
  descripcionCompleta: any[];
  tipoProyecto: string | null;
  tecnologias: string[];
  repositorio: string;
  demo: string;
  destacado: boolean;
  imagenPrincipal?: {
    url: string;
  };
  programadores?: {
    id: number;
    nombreCompleto: string;
    slug: string;
  }[];
}

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  private http = inject(HttpClient);

  private apiUrl = 'https://reassuring-sunrise-734f67d339.strapiapp.com/api';
  private uploadsUrl = 'https://reassuring-sunrise-734f67d339.strapiapp.com';

  getProgramadores() {
    return this.http.get<StrapiResponse<Programador>>(
      `${this.apiUrl}/programadors?populate=*`
    );
  }


  getProyectos() {
    return this.http.get<StrapiResponse<Proyecto>>(
      `${this.apiUrl}/proyectos?populate=*`
    );
  }

  getProyectoBySlug(slug: string) {
    return this.http.get<StrapiResponse<Proyecto>>(
      `${this.apiUrl}/proyectos?filters[slug][$eq]=${slug}&populate=*`
    );
  }

  getProyectosDestacados() {
    return this.http.get<StrapiResponse<Proyecto>>(
      `${this.apiUrl}/proyectos?filters[destacado][$eq]=true&populate=*`
    );
  }

  getServicios() {
    return this.http.get<StrapiResponse<Servicio>>(
      `${this.apiUrl}/servicios`
    );
  }

  getImageUrl(path?: string) {
    if (!path) return '/images/default-user.png';

    if (path.startsWith('http')) {
      return path;
    }

    return `${this.uploadsUrl}${path}`;
  }


  getProgramadorBySlug(slug: string) {
  return this.http.get<StrapiResponse<Programador>>(
    `${this.apiUrl}/programadors?filters[slug][$eq]=${slug}&populate[fotoPerfil]=true&populate[proyectos][populate][imagenPrincipal]=true`
  );
}
}