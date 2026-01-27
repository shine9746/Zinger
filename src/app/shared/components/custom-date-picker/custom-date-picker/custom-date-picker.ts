import { FormsModule } from '@angular/forms';
import { Component, input } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../constants';
type Mode = 'date' | 'datetime';
@Component({
  selector: 'app-custom-date-picker',
  imports: [...MATERIAL_IMPORTS,FormsModule],
  templateUrl: './custom-date-picker.html',
  styleUrl: './custom-date-picker.scss',
})
export class CustomDatePicker {
  public required = input<boolean>(false);
  public label = input<string>('Select date');
  public mode = input<Mode>('date');
  public date: Date | null = new Date();
  public time = '12:00';
}
