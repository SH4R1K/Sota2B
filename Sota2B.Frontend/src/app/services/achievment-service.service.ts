import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Achievement } from '../data/interfaces/achievement';
@Injectable({
  providedIn: 'root',
})
export class achievementService {
  private baseUrl = `${window.location.origin}/api`;

  constructor(
    private http: HttpClient
  ) {}

  getAchievements(): Observable<Achievement[]> {
    return this.http
      .get<Achievement[]>(`${this.baseUrl}/Achievements`);
  }
  // Create a new achievement
  createAchievement(achievement: Achievement): Observable<Achievement> {
    return this.http
      .post<Achievement>(`${this.baseUrl}/Achievements`, achievement);
  }

  // Update an existing achievement
  updateAchievement(id: number, achievement: Achievement): Observable<Achievement> {
    return this.http
      .put<Achievement>(`${this.baseUrl}/Achievements/${id}`, achievement);
  }

  // Delete an achievement
  deleteAchievement(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/Achievements/${id}`);
  }

}
