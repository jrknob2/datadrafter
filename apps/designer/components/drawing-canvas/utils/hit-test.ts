// src/app/components/drawing-canvas/utils/hit-test.ts

import { Shape, RectShape, CircleShape, EllipseShape, PolygonShape } from '../../../../../app/models/Shape';

/**
 * Return true if (px,py) lies within shape s, using isPointInPath.
 */
export function isPointInShape(
  ctx: CanvasRenderingContext2D,
  s: Shape,
  px: number,
  py: number
): boolean {
  ctx.beginPath();
  switch (s.type) {
    case 'rect': {
      const r = s as RectShape;
      ctx.rect(r.x, r.y, r.width, r.height);
      return ctx.isPointInPath(px, py);
    }
    case 'circle': {
      const c = s as CircleShape;
      ctx.arc(c.centerX, c.centerY, c.radius, 0, Math.PI * 2);
      return ctx.isPointInPath(px, py);
    }
    case 'ellipse': {
      const e = s as EllipseShape;
      ctx.ellipse(e.centerX, e.centerY, e.radiusX, e.radiusY, 0, 0, Math.PI * 2);
      return ctx.isPointInPath(px, py);
    }
    case 'polygon': {
      const p = s as PolygonShape;
      if (p.points.length === 0) return false;
      ctx.moveTo(p.points[0].x, p.points[0].y);
      for (let i = 1; i < p.points.length; i++) {
        ctx.lineTo(p.points[i].x, p.points[i].y);
      }
      ctx.closePath();
      return ctx.isPointInPath(px, py);
    }
  }
  return false;
}
