import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../data/interfaces/user';
import { IEvent } from '../data/interfaces/event';
import { Purchase } from '../data/interfaces/purchase';
import { Achievement } from '../data/interfaces/achievement';
import { UserDetails } from '../data/interfaces/userDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private baseUrl = `${window.location.origin}/api`;

  constructor(
    private http: HttpClient
  ) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseUrl}/Users`);
  }
  
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/Users`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/Users/${id}`, user);
  }

  getUsersRating(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseUrl}/Users/Rating`);
  }

  getUser(idUser: number): Observable<UserDetails> {
    return this.http
      .get<UserDetails>(`${this.baseUrl}/Users/${idUser}`);
  }

  getUserEvents(idUser: number): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(`${this.baseUrl}/Users/Events/${idUser}`);
  }

  getUserPurchases(idUser: number): Observable<Purchase[]> {
    return this.http
      .get<Purchase[]>(`${this.baseUrl}/Users/Purchases/${idUser}`);
  }
  getUserAchievements(idUser: number): Observable<Achievement[]> {
    return this.http
      .get<Achievement[]>(`${this.baseUrl}/Users/achievements/${idUser}`);
  }
  addUserProduct(idUser: number, idProduct: number): Observable<Purchase> {
    return this.http
      .post<Purchase>(`${this.baseUrl}/Users/purchases/${idUser}/${idProduct}`, null);
  }
}
