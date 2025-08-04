/* eslint-disable @typescript-eslint/no-explicit-any */

import { SchemaSection, StructuredSchema } from "./schema-definitions.model";

export const objectTypeRecordSection: SchemaSection = {
  sectionId: 'recordHeader',
  label: { id: 'schema-label-id', name: 'label', caption: 'Header', type: 'text', required: true },
  system: true,
  attributes: [
    { id: 'uuid', name: 'uuid', caption: 'UUID', type: 'text', readonly: true, required: true, size: "small" },
    { id: 'name', name: 'name', caption: 'Name', type: 'text', required: true, pattern: "^[a-zA-Z0-9 ]*$", patternComment: "No special characters allowed" },
    { id: 'description', name: 'description', caption: 'Description', type: 'textarea', required: true, lines: 10 },
    { id: 'version', name: 'version', caption: 'Version', type: 'number', required: true },
    { id: 'inheritsFrom', name: 'inheritsFrom', caption: 'Inherits From', type: 'text', required: true, pattern: "^[a-zA-Z0-9 ]*$" },
    { id: 'svg', name: 'svg', caption: 'SVG', type: 'text', required: false },
    { id: 'acceptTerms', name: 'terms', type: 'checkbox', caption: 'I agree to the terms', required: true, readonly: false },
    { id: 'color', name: 'color', type: 'select', caption: 'Choose a color',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
            { value: 'green', label: 'Green' }
          ], required: true, readonly: false, size: "xsmall" },
    { id: 'gender', name: 'gender', type: 'radio', caption: 'Gender',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ], required: true, readonly: false },
  ]
};

export interface ObjectSchema extends StructuredSchema {
  schemaId: string;
  header: SchemaSection;
  sections: SchemaSection[];
}
