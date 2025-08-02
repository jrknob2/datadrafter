/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AttributeDefinition {
  id: string;
  name: string;
  type: 'text'
    | 'textarea'
    | 'number'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'date';
  options?: { label: string; value: any }[]; // for select, check and radio
  required?: boolean;
  pattern?: string;
  default?: any;
  minItems?: number;
  maxItems?: number;
}

export interface ObjectType {
  uuid: string;
  name: string;
  description?: string;
  version: number;
  inheritsFrom?: string;
  svg?: string;
  staticAttributes: AttributeDefinition[];
  dynamicAttributes: AttributeDefinition[];
}
