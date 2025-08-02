import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../control-value-accessor-base';

@Component({
  selector: 'dd-textarea-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaFieldComponent),
      multi: true,
    },
  ],
})
export class TextareaFieldComponent extends ControlValueAccessorBase<string> {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() rows = 4;
  @Input() readonly = false;

  onInput(event: Event): void {
  const textarea = event.target as HTMLTextAreaElement;
  this.setValue(textarea.value);
}
}
