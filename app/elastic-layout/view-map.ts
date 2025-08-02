/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '@angular/core';
import { DrawingPropertiesComponent } from '../../apps/designer/components/drawing-properties/drawing-properties.component';
import { DesignerDashboardComponent } from '../../apps/designer/components/designer-dashboard/designer-dashboard.component';
import { ObjectTypesListComponent } from '../../apps/modeler/components/object-types-list/object-types-list.component';
import { ObjectTypeDashboardComponent } from '../../apps/modeler/components/object-type-dashboard/object-type-dashboard.component';
//import { DynamicFormWrapperComponent } from '../dynamic-forms/components/dynamic-form-wrapper/dynamic-form-wrapper.component';
import { DynamicFormComponent } from '../dynamic-forms/components/dynamic-form/dynamic-form.component';

export interface ComponentConfig {
  component: Type<unknown>;
  inputs?: Record<string, any>;
}

export interface ViewDescriptor {
  context: ComponentConfig;
  workspace: ComponentConfig;
}

export const VIEW_MAP: Record<string, ViewDescriptor> = {
  'designer-dashboard': {
    context: { component: DrawingPropertiesComponent },
    workspace: { component: DesignerDashboardComponent }
  },
  'modeler-dashboard': {
    context: { component: ObjectTypesListComponent },
    workspace: { component: ObjectTypeDashboardComponent }
  },
  'object-types-form': {
    context: { component: ObjectTypesListComponent },
    workspace: { component: DynamicFormComponent }
  }
};
