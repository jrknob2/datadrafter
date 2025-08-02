import { Shape } from './Shape';

export interface Level {
  id: string;             // Unique ID (UUID or slug)
  name: string;           // e.g., "Main Floor", "Roof", "Basement"
  elevation?: number;     // Optional Z-height or vertical position (in drawing units)
  visible?: boolean;      // UI toggle
  locked?: boolean;       // Prevent editing
  shapes: Shape[];        // Shapes on this level
}
