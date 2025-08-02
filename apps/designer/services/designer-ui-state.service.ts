import { Injectable } from '@angular/core';
import { DesignerDashboardComponent } from '../components/designer-dashboard/designer-dashboard.component';
import { Type } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DesignerUiStateService {
  activeComponent: Type<unknown> = DesignerDashboardComponent;
}
