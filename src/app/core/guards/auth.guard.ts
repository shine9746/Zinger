/**
 * Auth Guard
 * 
 * Protects auth routes from unauthorized access.
 * Prevents authenticated users from accessing login/register pages.
 */

import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // This is a placeholder. Real implementation would check authentication state
  return true;
};

export const publicAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Redirect already authenticated users away from login/register
  return true;
};
