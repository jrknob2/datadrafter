import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModelerUiStateService } from '../../services/modeler-ui-state.service';

@Component({
  selector: 'dd-object-type-form',
  standalone: true,
  templateUrl: './object-type-form.component.html',
  styleUrls: ['./object-type-form.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ObjectTypeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ui = inject(ModelerUiStateService);

  form!: FormGroup;
  mode: 'create' | 'edit' | 'view' = 'create';
  
  ngOnInit(): void {
    const selected = this.ui.selectedType();
    const formMode = this.ui.formMode();

    if (selected && formMode === 'create') {
      this.mode = 'create';

      this.form = this.fb.group({
        name: [''],
      });
    }
  }

  isFormReady(): boolean {
    return !!this.form;
  }
}
