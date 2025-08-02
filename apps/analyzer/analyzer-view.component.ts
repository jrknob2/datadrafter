/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AnalyzerListComponent } from './components/analyzer-list/analyzer-list.component';
import { AnalyzerFormComponent } from './components/analyzer-form/analyzer-form.component';

@Component({
  selector: 'dd-analyzer-view',
  standalone: true,
  templateUrl: './analyzer-view.component.html',
  imports: [ AnalyzerListComponent, AnalyzerFormComponent ]
})

export class AnalyzerViewComponent {
  @ViewChild('contextTemplate', { static: true }) contextTemplate!: TemplateRef<any>;
  @ViewChild('workspaceTemplate', { static: true }) workspaceTemplate!: TemplateRef<any>;
}
