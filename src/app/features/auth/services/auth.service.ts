/**
 * Auth Service
 * 
 * Handles authentication logic including login, logout, and user session management.
 * This service should be provided at the root level in the auth feature or core module.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IAuthUser {
  id: string;
  email: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<IAuthUser | null>(null);
  private authStatus$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadUserFromStorage();
  }

  /**
   * Load user from local storage if available
   */
  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUser$.next(user);
      this.authStatus$.next(true);
    }
  }

  /**
   * Get current user observable
   */
  getCurrentUser$(): Observable<IAuthUser | null> {
    return this.currentUser$.asObservable();
  }

  /**
   * Get authentication status observable
   */
  isAuthenticated$(): Observable<boolean> {
    return this.authStatus$.asObservable();
  }

  /**
   * Login user with email and password
   */
  login(email: string, password: string): Observable<any> {
    // TODO: Replace with actual HTTP call
    return new Observable(observer => {
      // Simulated login
      const user: IAuthUser = {
        id: '1',
        email: email,
        name: email.split('@')[0]
      };
      
      this.currentUser$.next(user);
      this.authStatus$.next(true);
      localStorage.setItem('user', JSON.stringify(user));
      
      observer.next({ success: true, user });
      observer.complete();
    });
  }

  /**
   * Logout user
   */
  logout(): void {
    this.currentUser$.next(null);
    this.authStatus$.next(false);
    localStorage.removeItem('user');
  }

  /**
   * Register new user
   */
  register(email: string, password: string, name: string): Observable<any> {
    // TODO: Replace with actual HTTP call
    return new Observable(observer => {
      const user: IAuthUser = {
        id: '1',
        email: email,
        name: name
      };
      
      observer.next({ success: true, user });
      observer.complete();
    });
  }
}
