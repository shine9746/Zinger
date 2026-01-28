import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IGenderOptions } from '../../../../shared/models/common-interface';
import { CustomDatePicker, CustomInput, CustomRadio } from '../../../../shared/components';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.scss',
  standalone: true,
  imports: [FormsModule, CustomInput, CustomDatePicker, CustomRadio]
})
export class RegistrationForm {
  private router = inject(Router);
  public genderOptions: IGenderOptions[] = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 },
    { label: 'Other', value: 2 },
  ];
  
  public goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  public clearForm(): void {
    // Implementation can be added here
  }
}
