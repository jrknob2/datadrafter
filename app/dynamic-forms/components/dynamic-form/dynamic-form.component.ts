/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ObjectTypesService } from '../../../../apps/modeler/services/object-types.service';
import { ActivatedRoute } from '@angular/router';
import recordHeaderSchema from '../../../schemas/object-type-header.schema.json' assert { type: 'json' };
import { TextFieldComponent } from '../dynamic-fields/text-field/text-field.component'
import { TextareaFieldComponent } from '../dynamic-fields/textarea-field/textarea-field.component';
import { NumberFieldComponent } from '../dynamic-fields/number-field/number-field.component';
import { SelectFieldComponent } from '../dynamic-fields/select-field/select-field.component';
import { CheckboxFieldComponent } from '../dynamic-fields/checkbox-field/checkbox-field.component';
import { RadioFieldComponent } from '../dynamic-fields/radio-field/radio-field.component'
import { DateFieldComponent } from '../dynamic-fields/date-field/date-field.component'

@Component({
    selector: 'dd-dynamic-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TextFieldComponent,
        TextareaFieldComponent,
        NumberFieldComponent,
        SelectFieldComponent,
        CheckboxFieldComponent,
        RadioFieldComponent,
        DateFieldComponent
        //...Object.values(FieldComponents)
    ],
    providers: [
        ObjectTypesService
    ],
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
    @Input() model: any;
    @Input() mode: 'view' | 'edit' | 'create' = 'view';
    //@Input() schema: any;
    @Input() readonly = false;
    @Input() renderModel: any;

    constructor(
        private service: ObjectTypesService,
        private route: ActivatedRoute
    ) { }

    get isReadonly(): boolean {
        return this.mode === 'view';
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const uuid = params['uuid'];
            this.mode = params['mode'];

            const enrichModelForRendering = (model: any, schema: any[]) => {
                const clone = structuredClone(model);
                clone.recordHeaderAttributes = schema; //.map(attr => ({
                //     ...attr,
                //     value: model[attr.name]
                // }));
                return clone;
            };

            if (uuid) {
                this.service.getOne(uuid).then(obj => {
                    this.model = obj;
                    if (recordHeaderSchema) {
                        this.renderModel = enrichModelForRendering(obj, recordHeaderSchema);
                    }
                });
             }
        });
    }

    onChange(fieldName: string, value: any): void {
        if (this.model) {
            this.model[fieldName] = value;
        }
    }

    onCheckboxChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.onChange(input.name, input.checked);
    }

    objectValues(obj: Record<string, any>) {
        return Object.values(obj || {});
    }
}
