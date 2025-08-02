import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerStateService } from '../../services/designer-state.service';
import { MouseTracker } from '../mouse-tracker/mouse-tracker.component'

@Component({
  standalone: true,
  selector: 'dd-drawing-properties',
  imports: [CommonModule, MouseTracker ],
  templateUrl: './drawing-properties.component.html',
  styleUrls: ['./drawing-properties.component.scss']
})
export class DrawingPropertiesComponent {
  state = inject(DesignerStateService);
}
