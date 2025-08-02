/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextFieldComponent } from '../text-field/text-field.component';
import { CheckboxFieldComponent } from '../checkbox-field/checkbox-field.component';
import { ControlValueAccessorBase } from '../control-value-accessor-base';

@Component({
  selector: 'dd-array-field',
  standalone: true,
  imports: [CommonModule, FormsModule, TextFieldComponent, CheckboxFieldComponent],
  templateUrl: './array-field.component.html',
  styleUrls: ['./array-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArrayFieldComponent),
      multi: true,
    },
  ],
})
export class ArrayFieldComponent extends ControlValueAccessorBase<any[]> {
  @Input() label = '';
  @Input() fields: { key: string; type: 'text' | 'checkbox'; label: string }[] = [];
  @Input() readonly = false;
  
  addItem() {
    const item: any = {};
    for (const field of this.fields) {
      item[field.key] = field.type === 'checkbox' ? false : '';
    }
    const newValue = [...(this.value || []), item];
    this.onChange(newValue);
  }

  removeItem(index: number) {
    const newValue = [...(this.value || [])];
    newValue.splice(index, 1);
    this.onChange(newValue);
  }

  updateItem(index: number, key: string, val: any) {
    const newValue = [...(this.value || [])];
    newValue[index] = { ...newValue[index], [key]: val };
    this.onChange(newValue);
  }

  get safeItems(): any[] {
    return Array.isArray(this.value) ? this.value : [];
  }
}
