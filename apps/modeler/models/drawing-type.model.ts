import { AttributeDefinition } from "./attribute-definition";

export interface DrawTypeRecord {
  uuid: string;
  name: string;
  description?: string;
  version: number;
}

export interface DrawingElement {
  uuid: string;
  type: string;
}

export interface DrawingLayers {
  uuid: string;
  name: string;
  elements: DrawingElement[];
}

export interface DrawingType {
  recordHeader: DrawTypeRecord;
  userData: AttributeDefinition[];
  layers: DrawingLayers[];
}
