import { Drawing } from '../../../../../app/models/Drawing';
import { 
    Shape, 
    RectShape, 
    CircleShape, 
    EllipseShape, 
    PolygonShape, 
    BaseShape, 
    Style, 
    Transform } from '../../../../../app/models/Shape';

/**
 * Draw a generic shape on the canvas.
 * @param ctx CanvasRenderingContext2D
 * @param shape Shape to draw
 * @param isSelected (No longer used for selection rendering)
 * @param options Optional shape-specific drawing options
 */
export function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: Shape,
  drawingStyle: Drawing['style']
): void {

  const styles = getStyles(shape, drawingStyle);

  switch (shape.type) {
    case 'rect':
      drawRect(ctx, shape as RectShape, styles);
      break;
    case 'circle':
      drawCircle(ctx, shape as CircleShape, styles);
      break;
    case 'ellipse':
      drawEllipse(ctx, shape as EllipseShape, styles);
      break;
    case 'polygon':
      drawPolygon(ctx, shape as PolygonShape, styles);
      break;
    default:
      // Unknown shape type; ignore
      break;
  }
}

export function drawRect(
  ctx: CanvasRenderingContext2D,
  shape: RectShape,
  style: Drawing['style']
) {
  ctx.lineWidth = style.lineWidth;
  ctx.strokeStyle = style.strokeColor;
  ctx.fillStyle = style.fillColor

  ctx.beginPath();
  ctx.rect(shape.x, shape.y, shape.width, shape.height);
  ctx.fill();
  ctx.stroke();
}

function drawCircle(ctx: CanvasRenderingContext2D, shape: CircleShape, style: Drawing['style']) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
  ctx.fillStyle = style.fillColor;
  ctx.fill();
  ctx.strokeStyle = style.strokeColor;
  ctx.lineWidth = style.lineWidth ?? 1;
  ctx.stroke();
  ctx.restore();
}

function drawEllipse(ctx: CanvasRenderingContext2D, shape: EllipseShape, style: Drawing['style']) {
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(shape.centerX, shape.centerY, shape.radiusX, shape.radiusY, 0, 0, Math.PI * 2);
  ctx.fillStyle = style.fillColor;
  ctx.fill();
  ctx.strokeStyle = style.strokeColor;
  ctx.lineWidth = style.lineWidth ?? 1;
  ctx.stroke();
  ctx.restore();
}

function drawPolygon(ctx: CanvasRenderingContext2D, shape: PolygonShape, style: Drawing['style']) {
  if (!shape.points || shape.points.length < 2) return;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(shape.points[0].x, shape.points[0].y);
  for (let i = 1; i < shape.points.length; i++) {
    ctx.lineTo(shape.points[i].x, shape.points[i].y);
  }

  ctx.closePath();
  ctx.fillStyle = style.fillColor;
  ctx.fill();
  ctx.strokeStyle = style.strokeColor;
  ctx.lineWidth = style.lineWidth;
  ctx.stroke();
  ctx.restore();
}

export function buildPolygon(
  points: { x: number; y: number }[],
  style: Style, trans: Transform): PolygonShape {
  return {
    type: 'polygon',
    label: 'Polygon',
    id: Date.now(),
    points: points.map(pt => ({ x: pt.x, y: pt.y })), // copy for safety
    style: style,
    transform: trans
    }
  };

export function buildRectangle(
  start: { x: number; y: number },
  end: { x: number; y: number },
  style: BaseShape['style'],
  trans: BaseShape['transform']): RectShape {
  const x = Math.min(start.x, end.x);
  const y = Math.min(start.y, end.y);
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);

  return {
    type: 'rect',
    label: 'Rectangle',
    id: Date.now(),
    x, y, width, height,
    style: style,
    transform: trans
  };
}

// Builds a CircleShape object from two points (box corners)
export function buildCircleFromBox(
  start: { x: number; y: number },
  end: { x: number; y: number },
  style: BaseShape['style'],
  trans: BaseShape['transform']
): CircleShape {
  // Calculate the radius as the distance from start to end
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const radius = Math.sqrt(dx * dx + dy * dy);

  return {
    type: 'circle',
    label: 'Circle',
    id: Date.now(),
    centerX: start.x,
    centerY: start.y,
    radius,
    style,
    transform: trans
  };
}


// Builds an EllipseShape object from two points (box corners)
export function buildEllipseFromBox(
  start: { x: number; y: number },
  end: { x: number; y: number },
  style: BaseShape['style'],
  trans: BaseShape['transform']
): EllipseShape {
  const left = Math.min(start.x, end.x);
  const top = Math.min(start.y, end.y);
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);
  const cx = left + width / 2;
  const cy = top + height / 2;
  const rx = width / 2;
  const ry = height / 2;
  return {
    type: 'ellipse',
    label: 'Ellipse',
    id: Date.now(),
    centerX: cx,
    centerY: cy,
    radiusX: rx,
    radiusY: ry,
    style: style,
    transform: trans
  };
}

/**
 * Returns mouse position in canvas coordinate space,
 * accounting for CSS scaling, retina displays, and transforms.
 */
export function getCanvasCoordinates(
  event: MouseEvent,
  canvas: HTMLCanvasElement
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  let x = Math.round((event.clientX - rect.left) * scaleX);
  let y = Math.round((event.clientY - rect.top) * scaleY);

  // If either x or y is out of bounds, return {0, 0}
  if (x < 0 || x >= canvas.width) x = 0;
  if (y < 0 || y >= canvas.height) y = 0;

  return { x, y };
}


function getStyles(shape: Shape, drawingStyle: { lineWidth: number; lineStyle: string; strokeColor: string; fillColor: string; }) {
  const style = shape.style;
  style.lineWidth = style.lineWidth ?? drawingStyle.lineWidth;
  style.strokeColor = style.strokeColor ?? drawingStyle.strokeColor;
  style.lineStyle = drawingStyle.lineStyle;
  style.fillColor = style.fillColor ?? drawingStyle.fillColor;
  return style;
}

