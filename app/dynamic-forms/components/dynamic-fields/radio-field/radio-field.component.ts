import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../control-value-accessor-base';

@Component({
  selector: 'dd-radio-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioFieldComponent),
      multi: true,
    },
  ],
})
export class RadioFieldComponent extends ControlValueAccessorBase<string> {
  @Input() label = '';
  @Input() name = '';
  @Input() options: { label: string; value: string }[] = [];
  @Input() readonly = false;

  handleChange(value: string): void {
    this.onChange(value);
  }
}
