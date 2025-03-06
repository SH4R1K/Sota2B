import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent } from '../data/interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = `${window.location.origin}/api`;

  constructor(
    private http: HttpClient
  ) {}

  getEvents(): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(`${this.baseUrl}/Events`);
  }
  
  createEvent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(`${this.baseUrl}/Events`, event);
  }

  // Обновить существующее событие
  updateEvent(id: number, event: IEvent): Observable<IEvent> {
    return this.http.put<IEvent>(`${this.baseUrl}/Events/${id}`, event);
  }

  // Удалить событие
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Events/${id}`);
  }
}
