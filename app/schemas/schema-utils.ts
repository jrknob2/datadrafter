/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataInstance } from "./data-instance-schema.model";
import { StructuredSchema, RenderableSchema } from './schema-definitions.model';

export function mergeSchemaWithValues<T extends StructuredSchema>(schema: T, instance: DataInstance): RenderableSchema {
  const merged = JSON.parse(JSON.stringify(schema)) as RenderableSchema;

  [merged.header, ...merged.sections].forEach(section => {
    section.attributes.forEach(attr => {
      attr.value = instance.values[attr.name];
    });
  });

  return merged;
}

export function isStructuredSchema(obj: any): obj is StructuredSchema {
  return obj && Array.isArray(obj.sections) && obj.header?.attributes;
}
