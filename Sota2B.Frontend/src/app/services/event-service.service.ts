import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent } from '../data/interfaces/event';
import { EventDetails } from '../data/interfaces/eventDetails';

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

  getEvent(idEvent: number): Observable<EventDetails> {
    return this.http
      .get<EventDetails>(`${this.baseUrl}/Events/${idEvent}`);
  }
  
  createEvent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(`${this.baseUrl}/Events`, event);
  }

  // Обновить существующее событие
  updateEvent(id: number, event: IEvent): Observable<IEvent> {
    console.log(event)
    return this.http.put<IEvent>(`${this.baseUrl}/Events/${id}`, event);
  }

  patchEvent(id: number, userIds: Number[]): Observable<IEvent> {
    return this.http.patch<IEvent>(`${this.baseUrl}/Events/users/${id}`, userIds);
  }


  // Удалить событие
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Events/${id}`);
  }
}
