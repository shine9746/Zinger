import { Component } from '@angular/core';
import { RegistrationForm } from '../../../components/registration-form/registration-form';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.scss',
  standalone: true,
  imports: [RegistrationForm]
})
export class RegistrationPage {}
