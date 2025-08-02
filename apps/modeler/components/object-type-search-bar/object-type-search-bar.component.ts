// apps/modeler/components/object-type-search-bar/object-type-search-bar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'dd-object-type-search-bar',
  templateUrl: './object-type-search-bar.component..html',
  styleUrl: './object-type-search-bar.component.scss',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
})
export class ObjectTypeSearchBarComponent {
  search = new FormControl('');

  @Output() searchChanged = new EventEmitter<string>();

  constructor() {
    this.search.valueChanges.pipe(
      filter((value): value is string => value !== null),
      debounceTime(300)
    ).subscribe(value => {
      this.searchChanged.emit(value.trim());
    });
  }
}
