import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { IGenderOptions } from '../../../../../shared/models/common-interface';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.scss',
  standalone: false,
})
export class RegistrationForm {
  constructor(private router: Router) {}
  public genderOptions : IGenderOptions[]= [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 },
    { label: 'Other', value: 2 },
  ];
  public goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  public clearForm() {
  }
}
