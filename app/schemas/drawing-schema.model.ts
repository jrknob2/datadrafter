import { SchemaSection, StructuredSchema } from "./schema-definitions.model";

export interface DrawingElement {
  uuid: string;
  type: string;
}

export interface DrawingLayer {
  uuid: string;
  name: string;
  elements: DrawingElement[];
}

export interface DrawingSchema extends StructuredSchema {
  uuid: string;
  header: SchemaSection;
  sections: SchemaSection[];
  layers: DrawingLayer[];
}

export const drawingTypeRecordSection: SchemaSection = {
  sectionId: 'recordHeader',
  label: { id: 'schema-label-id', name: 'label', caption: 'Header', type: 'text', required: true },
  system: true,
  attributes: [
    { id: 'uuid', name: 'uuid', caption: 'UUID', type: 'text', readonly: true, required: true },
    { id: 'name', name: 'name', caption: 'Name', type: 'text', required: true },
    { id: 'description', name: 'description', caption: 'Description', type: 'textarea', required: true },
    { id: 'version', name: 'version', caption: 'Version', type: 'number', required: true }
  ]
};