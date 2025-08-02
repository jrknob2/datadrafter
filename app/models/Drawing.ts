import { Level } from './Level';
import { UnitsOfMeasure } from './UnitsOfMeasure';
import { Shape, Style, Transform } from './Shape';
import { SavedView } from './SavedView';

export interface Drawing {
  id: number;
  name: string;
  height: number;
  width: number;
  background: string;
  style: Style; // TODO: move to DrawingView
  transform: Transform; // TODO: move to DrawingView
  shapes: Shape[]; // TODO: remove and replaced with levels
  levels?: Level[];
  savedViews?: SavedView[];
  uom?: UnitsOfMeasure;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
  author?: string;
}
