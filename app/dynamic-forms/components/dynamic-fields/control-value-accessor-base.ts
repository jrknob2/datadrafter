/* eslint-disable @typescript-eslint/no-empty-function */
import { ControlValueAccessor } from '@angular/forms';

export abstract class ControlValueAccessorBase<T> implements ControlValueAccessor {
  value!: T;

  onChange: (value: T) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(newValue: T): void {
    this.value = newValue;
    this.onChange(newValue);
  }
}
