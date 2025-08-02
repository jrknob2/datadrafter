/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    CircleShape, 
    EllipseShape, 
    PolygonShape, 
    RectShape, 
    Shape } from '../../../../../app/models/Shape';

//let shapes: Shape[] = [];

function pointInPolygon(px: number, py: number, polygon: { x: number, y: number }[]): boolean {
    // Ray-casting algorithm
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;
        const intersect =
            ((yi > py) !== (yj > py)) &&
            (px < (xj - xi) * (py - yi) / (yj - yi + 0.00001) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

export function getShapeAt(x: number, y: number, shapes: Shape[]): Shape | null {
    for (let i = shapes.length - 1; i >= 0; i--) {
        const s = shapes[i];

        // Rectangle
        if (s.type === 'rect') {
            const rectange = s as RectShape;
            if (x >= rectange.x && 
                x <= rectange.x + rectange.width && 
                y >= rectange.y && 
                y <= rectange.y + rectange.height) {
                return s;
            }
        }

        // Ellipse
        if (s.type === 'ellipse') {
            const ellipse = s as EllipseShape;
            const dx = x - ellipse.centerX;
            const dy = y - ellipse.centerY;
            if ((dx * dx) / (ellipse.radiusX * ellipse.radiusX) + (dy * dy) / (ellipse.radiusY * ellipse.radiusY) <= 1) {
                return s;
            }
        }

        // Circle
        if (s.type === 'circle') {
            const circle = s as CircleShape;
            const dx = x - circle.centerX;
            const dy = y - circle.centerY;
            if (dx * dx + dy * dy <= circle.radius * circle.radius) {
                return s;
            }
        }

        // Polygon
        if ('points' in s && Array.isArray(s.points) && s.type === 'polygon') {
            if (pointInPolygon(x, y, s.points)) {
                return s;
            }
        }
    }
    return null;
}

export function isPolygonShape(shape: any): shape is PolygonShape {
  return shape && shape.type === 'polygon' && Array.isArray(shape.points);
}

