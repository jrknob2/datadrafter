import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../control-value-accessor-base';

@Component({
  selector: 'dd-checkbox-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxFieldComponent),
      multi: true,
    },
  ],
})
export class CheckboxFieldComponent extends ControlValueAccessorBase<boolean> {
  @Input() value = false;
  @Input() name!: string;
  @Input() label!: string;
  @Input() readonly = false;
  @Output() valueChange = new EventEmitter<boolean>();

handleChange(value: boolean): void {
    this.onChange(value);
  }
}
