import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandService } from '../../../../app/services/command.service';

@Component({
  selector: 'dd-canvas-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas-toolbar.component.html',
  styleUrl: './canvas-toolbar.component.scss'
})
export class CanvasToolbar {

  currentCommand = 'select';
  dropdownOpen = false;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private commandService: CommandService) { }

  selectMode() { this.commandService.execute('select'); }
  drawRect() { this.commandService.execute('draw-rect'); }
  drawCircle() { this.commandService.execute('draw-circle'); }
  drawEllipse() { this.commandService.execute('draw-ellipse'); }
  drawPolygon() { this.commandService.execute('draw-polygon'); }
  deleteShape() { this.commandService.execute('delete'); }

  setCommand(cmd: string) {
    this.currentCommand = cmd;
    this.dropdownOpen = false;
    // TODO: Call the relevant command logic (drawRect, etc)
    // Example:
    switch (cmd) {
      case 'rect': this.drawRect(); break;
      case 'circle': this.drawCircle(); break;
      case 'ellipse': this.drawEllipse(); break;
      case 'polygon': this.drawPolygon(); break;
      case 'select': this.selectMode(); break;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  newDrawing() {
    // TODO: Implement open drawing dialog/logic
    console.log('New Drawing clicked');
  }

  deleteDrawing() {
    // TODO: Implement delete drawing dialog/logic
    console.log('Delete Drawing clicked');
  }

  openDrawing() {
    // TODO: Implement open drawing dialog/logic
    console.log('Open Drawing clicked');
  }
  isDrawingCommand(cmd: string) {
    return ['rect', 'circle', 'ellipse', 'polygon'].includes(cmd);
  }
}
