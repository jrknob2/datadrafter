import { Component, forwardRef, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../control-value-accessor-base';

@Component({
  selector: 'dd-text-field',
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  imports: [CommonModule, FormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextFieldComponent),
    multi: true
  }],
  standalone: true
})
export class TextFieldComponent extends ControlValueAccessorBase<string> {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() type: 'text' | 'number' = 'text';

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.setValue(input.value);
  }

  handleChange(value: string): void {
    this.onChange(value);
  }
}
