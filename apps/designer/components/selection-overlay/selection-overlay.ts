/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircleShape, EllipseShape, PolygonShape, RectShape } from '../../../../app/models/Shape';

const DEFAULT_SELECT_STYLE = {
  handle_shape: 'square', // square or circle
  handle_style: '1px solid #000',
  bounding_box_style: '1px dashed #000'
}

@Component({
  selector: 'dd-selection-overlay',
  templateUrl: './selection-overlay.html',
  styleUrls: ['./selection-overlay.scss'],
  imports: [
    CommonModule
  ]
})
export class SelectionOverlay implements AfterViewInit, OnChanges {
  @Input() selectedShape: RectShape | CircleShape | EllipseShape | PolygonShape | null = null;
  @Input() canvasRect: DOMRect | null = null; // bounding rect of the canvas, needed for absolute positioning
  @Input() editMode: 'scale' | 'direct' = 'scale';

  @Output() handlePointerDown = new EventEmitter<{ handleIndex: number, event: PointerEvent }>();

  handles: { x: number, y: number }[] = [];
  hoveredHandle: number | null = null;
  draggingHandle: number | null = null;
  dragStart: { x: number, y: number } | null = null;
  originalBox: { x: number, y: number, width: number, height: number } | null = null;

  ngAfterViewInit() {
    this.updateHandles();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateHandles();
  }

  updateHandles() {
    if (this.selectedShape) {
      const bbox = this.getBoundingBox(this.selectedShape);
      this.handles = this.getHandlePositions(bbox);
    } else {
      this.handles = [];
    }
  }

  get boxStyle() {
    if (!this.selectedShape) return {};

    const rect = this.getBoundingBox(this.selectedShape);
    return {
      position: 'absolute',
      left: rect.x + 'px',
      top: rect.y + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
      border: DEFAULT_SELECT_STYLE.bounding_box_style, //'2px dashed #2196F3',
      pointerEvents: 'none',
      boxSizing: 'border-box',
      zIndex: 1001,
      background: 'none'
    };
  }

  getBoundingBox(shape: any): { x: number; y: number; width: number; height: number } {
    if (!shape) return { x: 0, y: 0, width: 0, height: 0 };

    if (shape.type === 'rect') {
      // Rectangle: use position and size
      return {
        x: Math.round(shape.x),
        y: Math.round(shape.y),
        width: Math.round(shape.width),
        height: Math.round(shape.height)
      };
    }

    if (shape.type === 'circle') {
      // Circle: box from center and radius
      return {
        x: Math.round(shape.centerX - shape.radius),
        y: Math.round(shape.centerY - shape.radius),
        width: Math.round(shape.radius * 2),
        height: Math.round(shape.radius * 2)
      };
    }

    if (shape.type === 'ellipse') {
      // Ellipse: box from center and radii
      return {
        x: Math.round(shape.centerX - shape.radiusX),
        y: Math.round(shape.centerY - shape.radiusY),
        width: Math.round(shape.radiusX * 2),
        height: Math.round(shape.radiusY * 2)
      };
    }

    if (shape.type === 'polygon' && Array.isArray(shape.points)) {
      // Polygon: bounding box of all points
      const xs = shape.points.map((pt: any) => pt.x);
      const ys = shape.points.map((pt: any) => pt.y);
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const maxX = Math.max(...xs);
      const maxY = Math.max(...ys);
      return {
        x: Math.round(minX),
        y: Math.round(minY),
        width: Math.round(maxX - minX),
        height: Math.round(maxY - minY)
      };
    }

    // Fallback for unknown shape
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  getHandlePositions(bbox: { x: number, y: number, width: number, height: number }) {
    const { x, y, width, height } = bbox;
    return [
      { x: Math.round(x), y: Math.round(y) },                           // TL
      { x: Math.round(x + width / 2), y: Math.round(y) },               // TC
      { x: Math.round(x + width - 1), y: Math.round(y) },               // TR
      { x: Math.round(x + width - 1), y: Math.round(y + height / 2) },  // RC
      { x: Math.round(x + width - 1), y: Math.round(y + height - 1) },  // BR
      { x: Math.round(x + width / 2), y: Math.round(y + height - 1) },  // BC
      { x: Math.round(x), y: Math.round(y + height - 1) },              // BL
      { x: Math.round(x), y: Math.round(y + height / 2) }               // LC
    ];
  }
  handlePointer(e: PointerEvent, idx: number) {
    this.handlePointerDown.emit({ handleIndex: idx, event: e });
  }

  onHandleMouseEnter(i: number) {
    this.hoveredHandle = i;
  }

  onHandleMouseLeave(i: number) {
    if (this.hoveredHandle === i) {
      this.hoveredHandle = null;
    }
  }

  onHandleMouseDown(event: MouseEvent, i: number) {
    event.preventDefault();
    event.stopPropagation();
    this.draggingHandle = i;
    this.dragStart = { x: event.clientX, y: event.clientY };
    this.originalBox = this.getBoundingBox(this.selectedShape!);

    window.addEventListener('mousemove', this.onHandleDrag);
    window.addEventListener('mouseup', this.onHandleMouseUp);
  }


  onHandleDrag = (event: MouseEvent) => {
    if (this.draggingHandle === null || !this.dragStart || !this.originalBox) return;

    const dx = event.clientX - this.dragStart.x;
    const dy = event.clientY - this.dragStart.y;

    // Example: Move top-left handle (index 0)
    // You would switch on this.draggingHandle to adjust box accordingly
    if (this.draggingHandle === 0) { // top-left
      // Example for rectangles (add logic for other shapes as needed)
      const newX = this.originalBox.x + dx;
      const newY = this.originalBox.y + dy;
      const newWidth = this.originalBox.width - dx;
      const newHeight = this.originalBox.height - dy;

      // Set temporary "preview" (update how you want; here you might update a local variable or emit an event)
      // e.g. this.previewBox = { x: newX, y: newY, width: newWidth, height: newHeight }
      // For a real app, emit to parent, or apply directly if editing state
    }

    // Implement logic for other handles similarly...
  };

  onHandleMouseUp = () => {
    this.draggingHandle = null;
    this.dragStart = null;
    this.originalBox = null;
    window.removeEventListener('mousemove', this.onHandleDrag);
    window.removeEventListener('mouseup', this.onHandleMouseUp);

    // Commit the resize/move here, e.g., emit an event to update the actual shape
  };

  getHandleStyle(h: { x: number, y: number }, i: number) {
    const base = {
      position: 'absolute',
      left: (Math.round(h.x) - 4) + 'px',
      top: (Math.round(h.y) - 4) + 'px',
      width: '7px',
      height: '7px',
      background: this.hoveredHandle === i ? '#2196F3' : '#fff',
      border: DEFAULT_SELECT_STYLE.handle_style,
      borderRadius: '1px',
      zIndex: 2001,
      pointerEvents: 'auto',
      transition: 'background 0.15s'
    };
    return base;
  }

  getVertexHandleStyle(pt: { x: number; y: number }, i: number) {
    const size = 14; // Diameter of the handle in pixels
    return {
      position: 'absolute',
      left: (pt.x - size / 2) + 'px',
      top: (pt.y - size / 2) + 'px',
      width: size + 'px',
      height: size + 'px',
      background: '#fff',
      opacity: 0.5,
      border: '2px solid #ff6600',
      borderRadius: '50%',
      boxShadow: '0 1px 6px rgba(0,0,0,0.14)',
      pointerEvents: 'auto',
      zIndex: 1002,
      cursor: 'pointer',
    };
  }

  isPolygonShape(shape: any): shape is { type: 'polygon', points: { x: number, y: number }[] } {
    return shape && shape.type === 'polygon' && Array.isArray(shape.points);
  }
  get selectedPolygonPoints(): { x: number, y: number }[] {
    return this.isPolygonShape(this.selectedShape) ? this.selectedShape.points : [];
  }
  handleClass(i: number): string {
    // 0: top-left, 1: top, 2: top-right, 3: right,
    // 4: bottom-right, 5: bottom, 6: bottom-left, 7: left
    const positions = [
      'handle-corner handle-top-left',
      'handle-edge handle-top',
      'handle-corner handle-top-right',
      'handle-edge handle-right',
      'handle-corner handle-bottom-right',
      'handle-edge handle-bottom',
      'handle-corner handle-bottom-left',
      'handle-edge handle-left'
    ];
    return positions[i] || '';
  }

  getScaleCursor(i: number): string {
    // Standard cursor names for 8 handles:
    // 0: top-left, 1: top, 2: top-right, 3: right,
    // 4: bottom-right, 5: bottom, 6: bottom-left, 7: left
    const cursors = [
      'nwse-resize', // top-left
      'ns-resize',   // top
      'nesw-resize', // top-right
      'ew-resize',   // right
      'nwse-resize', // bottom-right
      'ns-resize',   // bottom
      'nesw-resize', // bottom-left
      'ew-resize'    // left
    ];
    return cursors[i] || 'default';
  }

}
