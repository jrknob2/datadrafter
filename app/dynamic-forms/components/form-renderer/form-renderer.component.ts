import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';
import { RenderableSchema, RenderableSection } from '../../../schemas/schema-definitions.model';

@Component({
    selector: 'dd-form-renderer',
    standalone: true,
    imports: [CommonModule, DynamicFieldComponent],
    template: `
  <div class="form-controls">
  <button type="button" (click)="setMode('edit')" *ngIf="mode === 'view'">
    <i class="fas fa-pen"></i> Edit
  </button>
  <button type="button" (click)="setMode('view')" *ngIf="mode === 'edit'">
    <i class="fas fa-eye"></i> View
  </button>
</div>
  <ng-container *ngFor="let section of allSections">
  <fieldset
  class="field-container"
  [class.no-border]="!section.label.caption.trim()"
  [attr.aria-label]="section.label.caption || 'Field group'"
>
  <legend *ngIf="section.label.caption.trim()">{{ section.label.caption }}</legend>

    <dd-dynamic-field class="field-wrapper" [ngClass]="attr.size || 'medium'"
      *ngFor="let attr of section.attributes"
      [field]="attr" [mode]="mode"
    />
  </fieldset>
</ng-container>
  `,
    styles: []
})
export class FormRendererComponent {
    @Input() schema!: RenderableSchema;

    mode: 'view' | 'edit' = 'edit';

    setMode(newMode: 'view' | 'edit') {
        this.mode = newMode;
    }

    get allSections(): RenderableSection[] {
        return [this.schema.header, ...this.schema.sections];
    }
}
