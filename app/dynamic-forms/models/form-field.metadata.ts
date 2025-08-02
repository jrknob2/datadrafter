export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date';
  //| 'array'; // 👈 NEW

type FieldSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export interface FormField {
  key: string;
  label: string;
  type: FormFieldType;
  size?: FieldSize;
  //itemType?: FormFieldType;         // only used for arrays
  //fields?: FormField[];             // for complex array items (like sub-objects)
  required?: boolean;
  options?: string[];               // for select/radio
  readonly?: boolean;
}
