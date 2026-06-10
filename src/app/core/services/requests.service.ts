import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface ContactRequest {
  id?: string;
  nombreSolicitante: string;
  correoSolicitante: string;
  descripcionProyecto: string;
  programadorId: number;
  programadorNombre: string;
  programadorSlug: string;
  userId: string;
  userEmail: string;
  estado: 'Pendiente' | 'Respondida';
  respuesta: string;
  createdAt: any;
  updatedAt?: any;
}

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private firestore = inject(Firestore);

  createRequest(
    request: Omit<ContactRequest, 'id' | 'estado' | 'respuesta' | 'createdAt'>
  ) {
    const requestsRef = collection(this.firestore, 'solicitudes');

    return addDoc(requestsRef, {
      ...request,
      estado: 'Pendiente',
      respuesta: '',
      createdAt: serverTimestamp(),
    });
  }

  getRequestsByUser(userId: string): Observable<ContactRequest[]> {
    const requestsRef = collection(this.firestore, 'solicitudes');

    const q = query(requestsRef, where('userId', '==', userId));

    return collectionData(q, { idField: 'id' }) as Observable<ContactRequest[]>;
  }

  getRequestsByProgrammer(programadorSlug: string): Observable<ContactRequest[]> {
    const requestsRef = collection(this.firestore, 'solicitudes');

    const q = query(
      requestsRef,
      where('programadorSlug', '==', programadorSlug)
    );

    return collectionData(q, { idField: 'id' }) as Observable<ContactRequest[]>;
  }

  respondRequest(requestId: string, respuesta: string) {
    const requestRef = doc(this.firestore, `solicitudes/${requestId}`);

    return updateDoc(requestRef, {
      respuesta,
      estado: 'Respondida',
      updatedAt: serverTimestamp(),
    });
  }
}