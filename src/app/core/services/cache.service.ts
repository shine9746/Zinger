import { Injectable } from '@angular/core';

/**
 * Application State Cache Service
 * Manages local storage and session storage with persistence
 * Survives browser/app crashes by maintaining cache across sessions
 */
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly CACHE_VERSION = 'app-cache-v1';
  private readonly SESSION_CACHE_KEY = 'app-session-cache';
  private readonly PERSISTENT_CACHE_KEY = 'app-persistent-cache';
  private readonly EXECUTION_STATE_KEY = 'app-execution-state';
  
  // In-memory cache for performance
  private memoryCache = new Map<string, any>();
  private sessionMemoryCache = new Map<string, any>();

  constructor() {
    this.initializeCache();
  }

  /**
   * Initialize cache from localStorage
   */
  private initializeCache(): void {
    try {
      const persistent = this.getFromStorage(this.PERSISTENT_CACHE_KEY);
      if (persistent) {
        Object.entries(persistent).forEach(([key, value]) => {
          this.memoryCache.set(key, value);
        });
      }

      const session = this.getFromStorage(this.SESSION_CACHE_KEY);
      if (session) {
        Object.entries(session).forEach(([key, value]) => {
          this.sessionMemoryCache.set(key, value);
        });
      }
    } catch (error) {
      console.error('Error initializing cache:', error);
    }
  }

  /**
   * Set a persistent cache value (survives app restart)
   */
  setPersistent(key: string, value: any): void {
    this.memoryCache.set(key, value);
    this.persistToStorage();
  }

  /**
   * Get a persistent cache value
   */
  getPersistent(key: string): any {
    return this.memoryCache.get(key);
  }

  /**
   * Set a session cache value (temporary, cleared on app close)
   */
  setSession(key: string, value: any): void {
    this.sessionMemoryCache.set(key, value);
    this.persistSessionToStorage();
  }

  /**
   * Get a session cache value
   */
  getSession(key: string): any {
    return this.sessionMemoryCache.get(key);
  }

  /**
   * Save execution state to survive power loss
   */
  saveExecutionState(state: any): void {
    this.setPersistent(this.EXECUTION_STATE_KEY, {
      ...state,
      timestamp: Date.now(),
      version: this.CACHE_VERSION
    });
  }

  /**
   * Recover execution state after power loss
   */
  recoverExecutionState(): any {
    const state = this.getPersistent(this.EXECUTION_STATE_KEY);
    if (state && state.version === this.CACHE_VERSION) {
      return state;
    }
    return null;
  }

  /**
   * Save form data to prevent loss on interruption
   */
  saveFormData(formName: string, data: any): void {
    this.setSession(`form-${formName}`, {
      data,
      savedAt: Date.now()
    });
  }

  /**
   * Recover form data
   */
  recoverFormData(formName: string): any {
    const formData = this.getSession(`form-${formName}`);
    return formData ? formData.data : null;
  }

  /**
   * Clear expired form data (older than 24 hours)
   */
  clearExpiredFormData(formName: string): void {
    const formData = this.getSession(`form-${formName}`);
    if (formData) {
      const hoursDiff = (Date.now() - formData.savedAt) / (1000 * 60 * 60);
      if (hoursDiff > 24) {
        this.removeSession(`form-${formName}`);
      }
    }
  }

  /**
   * Remove a persistent cache value
   */
  removePersistent(key: string): void {
    this.memoryCache.delete(key);
    this.persistToStorage();
  }

  /**
   * Remove a session cache value
   */
  removeSession(key: string): void {
    this.sessionMemoryCache.delete(key);
    this.persistSessionToStorage();
  }

  /**
   * Clear all persistent cache
   */
  clearPersistent(): void {
    this.memoryCache.clear();
    this.persistToStorage();
  }

  /**
   * Clear all session cache
   */
  clearSession(): void {
    this.sessionMemoryCache.clear();
    this.persistSessionToStorage();
  }

  /**
   * Get all persistent cache keys
   */
  getPersistentKeys(): string[] {
    return Array.from(this.memoryCache.keys());
  }

  /**
   * Get all session cache keys
   */
  getSessionKeys(): string[] {
    return Array.from(this.sessionMemoryCache.keys());
  }

  /**
   * Check if key exists in persistent cache
   */
  hasPersistent(key: string): boolean {
    return this.memoryCache.has(key);
  }

  /**
   * Check if key exists in session cache
   */
  hasSession(key: string): boolean {
    return this.sessionMemoryCache.has(key);
  }

  /**
   * Get cache size statistics
   */
  getCacheStats(): { persistent: number; session: number; total: number } {
    return {
      persistent: this.memoryCache.size,
      session: this.sessionMemoryCache.size,
      total: this.memoryCache.size + this.sessionMemoryCache.size
    };
  }

  /**
   * Persist memory cache to localStorage
   */
  private persistToStorage(): void {
    try {
      const cacheObject = Object.fromEntries(this.memoryCache);
      localStorage.setItem(this.PERSISTENT_CACHE_KEY, JSON.stringify(cacheObject));
    } catch (error) {
      console.error('Error persisting cache to storage:', error);
    }
  }

  /**
   * Persist session cache to localStorage
   */
  private persistSessionToStorage(): void {
    try {
      const cacheObject = Object.fromEntries(this.sessionMemoryCache);
      localStorage.setItem(this.SESSION_CACHE_KEY, JSON.stringify(cacheObject));
    } catch (error) {
      console.error('Error persisting session cache to storage:', error);
    }
  }

  /**
   * Retrieve object from localStorage with error handling
   */
  private getFromStorage(key: string): any {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error retrieving ${key} from storage:`, error);
      return null;
    }
  }

  /**
   * Export cache for debugging
   */
  exportCache(): { persistent: any; session: any } {
    return {
      persistent: Object.fromEntries(this.memoryCache),
      session: Object.fromEntries(this.sessionMemoryCache)
    };
  }

  /**
   * Import cache (useful for testing)
   */
  importCache(data: { persistent?: any; session?: any }): void {
    if (data.persistent) {
      Object.entries(data.persistent).forEach(([key, value]) => {
        this.memoryCache.set(key, value);
      });
      this.persistToStorage();
    }
    if (data.session) {
      Object.entries(data.session).forEach(([key, value]) => {
        this.sessionMemoryCache.set(key, value);
      });
      this.persistSessionToStorage();
    }
  }
}
