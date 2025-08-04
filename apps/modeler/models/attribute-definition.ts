/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AttributeDefinition {
  id: string;
  name: string;
  label: string;
  value: string;
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