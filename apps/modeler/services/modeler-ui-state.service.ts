import { Injectable, signal } from '@angular/core';
import { ObjectTypes } from '../models/object-types.model';

@Injectable({ providedIn: 'root' })
export class ModelerUiStateService {
  readonly selectedType = signal<ObjectTypes | null>(null);
  readonly activePanel = signal<'type' | 'attribute'>('type');

readonly formMode = signal<'view' | 'edit' | 'create'>('view');

selectType(type: ObjectTypes | null, mode: 'view' | 'edit' | 'create' = 'view') {
  this.selectedType.set(type);
  this.formMode.set(mode);
  this.activePanel.set('type');
}

//   selectType(type: ObjectTypes | null) {
//     this.selectedType.set(type);
//     this.activePanel.set('type');
//   }

  selectAttributePanel() {
    this.activePanel.set('attribute');
  }
}
