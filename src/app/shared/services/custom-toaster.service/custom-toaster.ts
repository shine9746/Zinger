import { Injectable, signal } from '@angular/core';
import { ToasterOptions, ToastType } from '../../models/custom-toaster';

@Injectable({
  providedIn: 'root',
})
export class CustomToasterService {
  private counter = 0;

  toasts = signal<ToasterOptions[]>([]);

  show(message: string, type: ToastType, duration = 3000) {
    const id = ++this.counter;

    this.toasts.update(list => [
      ...list,
      { id, message, type, duration }
    ]);

    setTimeout(() => this.remove(id), duration);
  }

  success(msg: string) {
    this.show(msg, 'success');
  }

  error(msg: string) {
    this.show(msg, 'error', 4000);
  }

  warning(msg: string) {
    this.show(msg, 'warning');
  }

  info(msg: string) {
    this.show(msg, 'info');
  }

  remove(id: number) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}
