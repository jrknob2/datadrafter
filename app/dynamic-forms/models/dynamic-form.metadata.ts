import { FormField } from "./form-field.metadata";

export interface FormMetadata {
  title?: string;
  fields: FormField[];
}