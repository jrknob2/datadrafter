/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RenderableAttribute } from '../../../schemas/schema-definitions.model';

@Component({
    selector: 'dd-dynamic-field',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: 'dynamic-field.component.html',
    styleUrl: './dynamic-field.component.scss'
})
export class DynamicFieldComponent {
    @Input() field!: RenderableAttribute;
    @Input() mode: 'view' | 'edit' = 'edit';

    onTouched?: () => void;

    getInputClasses(model: NgModel): any {
        return {
            'locked': !this.field.readonly && this.mode === 'view',
            'valid-input': model.valid && (model.dirty || model.touched),
            'invalid-input': model.invalid && (model.dirty || model.touched)
        };
    }

}
