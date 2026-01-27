import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomToaster } from './shared/components/custom-toaster/custom-toaster';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CustomToaster],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projectZ');
}
