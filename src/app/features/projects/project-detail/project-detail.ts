import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  imports: [ RouterLink ],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {
  private route = inject(ActivatedRoute);

  projects = [
    {
      slug: 'portafolio-devduo',
      title: 'Portafolio DevDuo Studio',
      image: 'portafolio.png',
      type: 'Académico / Integrador',
      description:
        'Aplicación web tipo portafolio profesional multiusuario, desarrollada con Angular, Firebase y Strapi. Permite mostrar programadores, proyectos, servicios y solicitudes de contacto.',
      technologies: ['Angular', 'Firebase', 'Strapi', 'Tailwind CSS'],
      participants: 'Bryan y Josué Abad',
      repository: 'https://github.com/Josue0522/icc-ppw-proyecto-angular',
      demo: '#',
    },
    {
      slug: 'simpsons-api',
      title: 'Simpsons API App',
      image: 'simpsons.png',
      type: 'Académico',
      description:
        'Aplicación web desarrollada en Angular que consume una API de personajes de Los Simpsons. Incluye listado de personajes, diseño con componentes reutilizables y visualización organizada de datos.',
      technologies: ['Angular', 'TypeScript', 'API REST', 'Tailwind CSS'],
      participants: 'Bryan y Josué Abad',
      repository: '#',
      demo: '#',
    },
    {
      slug: 'angular-firebase-app',
      title: 'Aplicación Angular con Firebase',
      image: '/images/project3.jpg',
      type: 'Académico / Práctica',
      description:
        'Proyecto web desarrollado con Angular y Firebase para practicar autenticación, rutas protegidas, estructura por componentes y conexión con servicios externos.',
      technologies: ['Angular', 'Firebase', 'Firestore', 'TypeScript'],
      participants: 'Bryan y Josué Abad',
      repository: '#',
      demo: '#',
    },
  ];

  project = computed(() => {
    const slug = this.route.snapshot.paramMap.get('slug');
    return this.projects.find((project) => project.slug === slug) ?? this.projects[0];
  });
}
