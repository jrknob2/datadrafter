import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerStateService } from '../../services/designer-state.service';

@Component({
  standalone: true,
  selector: 'dd-designer-dashboard',
  imports: [CommonModule],
  templateUrl: './designer-dashboard.component.html',
  styleUrls: ['./designer-dashboard.component.scss']
})
export class DesignerDashboardComponent {
  state = inject(DesignerStateService);
}
