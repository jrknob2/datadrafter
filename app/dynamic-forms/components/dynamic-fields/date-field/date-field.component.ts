import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../control-value-accessor-base';

@Component({
  selector: 'dd-date-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFieldComponent),
      multi: true,
    },
  ],
})
export class DateFieldComponent extends ControlValueAccessorBase<string> {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() readonly = false;

  handleChange(value: string): void {
    this.onChange(value);
  }
}
