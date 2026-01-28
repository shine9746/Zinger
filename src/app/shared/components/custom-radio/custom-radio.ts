import { Component, Input } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../constants';
import { FormsModule } from '@angular/forms';

export interface RadioOption<T = string | number> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-custom-radio',
  imports: [...MATERIAL_IMPORTS, FormsModule],
  templateUrl: './custom-radio.html',
  styleUrl: './custom-radio.scss',
})
export class CustomRadio {
  @Input() label = '';
  @Input() required = false;
  @Input() options: RadioOption[] = [];
  @Input() value: RadioOption | null = null;

  public select(option: RadioOption): void {
    this.value = option;
  }
}
