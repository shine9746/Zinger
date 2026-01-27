import { Component, inject } from '@angular/core';
import { CustomToasterService } from '../../services/custom-toaster.service/custom-toaster';

@Component({
  selector: 'app-custom-toaster',
  imports: [],
  templateUrl: './custom-toaster.html',
  styleUrl: './custom-toaster.scss',
  standalone: true
})
export class CustomToaster {
  public toastService = inject(CustomToasterService);
}
