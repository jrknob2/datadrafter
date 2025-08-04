import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRendererComponent } from './form-renderer.component';
import { RenderableSchema } from '../../../schemas/schema-definitions.model';
import { objectTypeRecordSection } from '../../../schemas/object-schema.model';
import { DataInstance } from '../../../schemas/data-instance-schema.model';
import { mergeSchemaWithValues } from '../../../schemas/schema-utils';

@Component({
  selector: 'dd-form-renderer-test',
  standalone: true,
  imports: [CommonModule, FormRendererComponent],
  template: `
    <h2>Test Form Renderer</h2>
    <dd-form-renderer [schema]="renderable"></dd-form-renderer>
  `
})
export class FormRendererTestComponent {
  renderable: RenderableSchema;
  @Input() schema!: RenderableSchema;

  constructor() {
    const schema = {
      uuid: 'object-type-schema-v1',
      header: objectTypeRecordSection,
      sections: []
    };

    const instance: DataInstance = {
      uuid: 'plant-instance-001',
      modelId: 'object-type-schema-v1',
      values: {
        uuid: 'plant-instance-001',
        name: 'Plant',
        description: 'Test plant type',
        version: 1,
        inheritsFrom: 'base-type-001',
        svg: '<svg>...</svg>'
      }
    };

    this.renderable = mergeSchemaWithValues(schema, instance);
  }
}
