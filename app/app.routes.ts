import { Routes } from '@angular/router';
import { ElasticLayoutComponent } from './elastic-layout/elastic-layout.component';
import { FormRendererTestComponent } from './dynamic-forms/components/form-renderer/form-renderer-test.component';

export const appRoutes: Routes = [
  // {
  //   path: 'engage',
  //   component: ElasticLayoutComponent,
  //   data: {
  //     contextComponent: () =>
  //       import('../apps/engage/engage-context.component').then(m => m.EngageContextComponent),
  //     workspaceComponent: () =>
  //       import('../apps/engage/engage-workspace.component').then(m => m.EngageWorkspaceComponent),
  //   }
  // },
  {
    path: 'designer',
    component: ElasticLayoutComponent,
    data: {
      contextComponent: () =>
        import('../apps/designer/designer-context.component').then(m => m.DesignerContextComponent),
      workspaceComponent: () =>
        import('../apps/designer/designer-workspace.component').then(m => m.DesignerWorkspaceComponent),
    }
  }, 
  {
    path: 'modeler',
    component: ElasticLayoutComponent,
    data: {
      contextComponent: () =>
        import('../apps/modeler/modeler-context.component').then(m => m.ModelerContextComponent),
      workspaceComponent: () =>
        import('../apps/modeler/modeler-workspace.component').then(m => m.ModelerWorkspaceComponent),
    }
  },
  {
    path: 'form-test',
    component: FormRendererTestComponent
  }
  // {
  //   path: 'analyze',
  //   component: ElasticLayoutComponent,
  //   data: {
  //     contextComponent: () =>
  //       import('../apps/analyze/analyze-context.component').then(m => m.AnalyzeContextComponent),
  //     workspaceComponent: () =>
  //       import('../apps/analyze/analyze-workspace.component').then(m => m.AnalyzeWorkspaceComponent),
  //   }
  // }
];

