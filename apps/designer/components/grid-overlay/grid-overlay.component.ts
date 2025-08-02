import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitsOfMeasure } from '../../../../app/models/UnitsOfMeasure';

@Component({
  selector: 'dd-grid-overlay',
  templateUrl: './grid-overlay.component.html',
  styleUrl: './grid-overlay.component.scss',
  imports: [ CommonModule ]
})
export class GridOverlayComponent implements OnChanges {
  @Input() zoom!: number;
  @Input() panX!: number;
  @Input() panY!: number;
  @Input() uom!: UnitsOfMeasure;
  @Input() canvasWidth!: number;
  @Input() canvasHeight!: number;

  gridLines: { x: number[]; y: number[] } = { x: [], y: [] };

  ngOnChanges() {
    if (!this.uom || !this.zoom || !this.canvasWidth || !this.canvasHeight) return;
    const spacing = this.uom.scale * this.zoom;
    const offsetX = this.panX % spacing;
    const offsetY = this.panY % spacing;

    const xLines: number[] = [];
    const yLines: number[] = [];

    for (let x = -offsetX; x < this.canvasWidth; x += spacing) xLines.push(x);
    for (let y = -offsetY; y < this.canvasHeight; y += spacing) yLines.push(y);

    this.gridLines = { x: xLines, y: yLines };
  }
}