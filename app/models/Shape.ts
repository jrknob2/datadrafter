// src/app/components/drawing-canvas/models/shape.model.ts

/** Base properties shared by every shape */

export interface Style {
  fillColor: string;
  strokeColor: string;
  lineWidth: number;
  lineStyle: string;
}

export interface Transform {
  rotation: number;
  scale: number;
}

export interface BaseShape {
  id: number;
  type: string;
  label: string;
  style: Style;
  transform: Transform
}

/** Rectangle (top-left x/y, width, height) */
export interface RectShape extends BaseShape {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Circle (center x/y, radius) */
export interface CircleShape extends BaseShape {
  centerX: number;
  centerY: number;
  radius: number;
}

/** Ellipse (center x/y, radiusX, radiusY) */
export interface EllipseShape extends BaseShape {
  centerX: number;
  centerY: number
  radiusX: number;
  radiusY: number;
}

/** Polygon (array of vertices) */
export interface PolygonShape extends BaseShape {
  points: { x: number; y: number }[];
}

/** Union of all supported shapes */
export type Shape = RectShape | CircleShape | EllipseShape | PolygonShape;
