import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../control-value-accessor-base';

@Component({
  selector: 'dd-number-field',
  templateUrl: './number-field.component.html',
  imports: [ CommonModule ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => 
        NumberFieldComponent),
      multi: true
    }
  ]
})
export class NumberFieldComponent extends ControlValueAccessorBase<number> {
  @Input() label = '';
  @Input() readonly = false;
  @Input() placeholder = '';
  @Input() step = 1;
  @Input() prefix?: string;

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const raw = input.value;

    if (raw === '') {
      this.setValue(0); // or use a default/fallback
      return;
    }

    const parsed = parseFloat(raw);
    this.setValue(isNaN(parsed) ? 0 : parsed);
  }
}
