/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StructuredSchema {
  uuid: string;
  header: SchemaSection;
  sections: SchemaSection[];
}
export interface RenderableAttribute extends AttributeDefinition {
  value?: any;
}

export interface RenderableSection extends Omit<SchemaSection, 'attributes'> {
  attributes: RenderableAttribute[];
}

export interface RenderableSchema extends Omit<StructuredSchema, 'header' | 'sections'> {
  header: RenderableSection;
  sections: RenderableSection[];
}

export interface AttributeDefinition {
  id: string;
  name: string;
  caption: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'radio' | 'date';
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  options?: { label: string; value: any }[];
  step?: number;
  lines?: number;
  required: boolean;
  readonly?: boolean;
  pattern?: string;
  patternComment?: string;
  default?: any;
  max?: number;
  min?: number;
  minItems?: number;
  maxItems?: number;
}

export interface SchemaSection {
  sectionId: string;
  label: AttributeDefinition;
  system: boolean;
  attributes: AttributeDefinition[];
}