/**
 * Core Module Configuration
 * 
 * Provides singleton services, guards, and interceptors that are used throughout the application.
 * These are registered at the root level and should NOT be re-imported in feature modules.
 */

import { ApplicationConfig } from '@angular/core';

export function provideCoreServices(): any[] {
  return [
    // Add core service providers here
    // Example: provideHttpClient(withInterceptors([...]))
  ];
}
