import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-programmer-detail',
  imports: [RouterLink],
  templateUrl: './programmer-detail.html',
  styleUrl: './programmer-detail.css',
})
export class ProgrammerDetail {
  private route = inject(ActivatedRoute);

  programmers = [
    {
      slug: 'bryan',
      name: 'Bryan Maita',
      role: 'Frontend Developer',
      image: 'bryan.png',
      color: 'violet',
      description:
        'Desarrollador especializado en Angular, Tailwind CSS, TypeScript y diseño de interfaces centradas en el usuario.',
      technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'UI/UX'],
    },
    {
      slug: 'josue',
      name: 'Josué Abad',
      role: 'Backend Developer',
      image: 'josue.jpg',
      color: 'cyan',
      description:
        'Desarrollador especializado en Firebase, Firestore, APIs REST, Strapi y arquitectura backend.',
      technologies: ['Firebase', 'Firestore', 'Strapi', 'APIs REST'],
    },
  ];

  programmer = computed(() => {
    const slug = this.route.snapshot.paramMap.get('slug');
    return this.programmers.find((p) => p.slug === slug) ?? this.programmers[0];
  });
}