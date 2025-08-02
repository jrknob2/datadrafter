import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../control-value-accessor-base';

@Component({
  selector: 'dd-select-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
  ],
})
export class SelectFieldComponent extends ControlValueAccessorBase<string> {
  @Input() label = '';
  @Input() placeholder = 'Select...';
  @Input() options: { value: string; label: string }[] = [];
  @Input() readonly = false;

  handleChange(value: string): void {
    this.onChange(value);
  }
}
