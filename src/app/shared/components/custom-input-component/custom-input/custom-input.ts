import { MATERIAL_IMPORTS } from '../../../constants';
import { Component, input, model, signal } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
})
export class CustomInput {
  public label = input<string>('');
  public inputType = input<'text' | 'email' | 'password' | 'tel' | 'date' | 'emailOrPhone' | 'numberOnly' | 'textOnly' | 'decimalRange'>('text');
  public required = input<boolean>(false);
  public inputValue = model<string>('');
  public showPassword = signal(false);
  public toggle() {
    this.showPassword.update(v => !v);
  }
}
