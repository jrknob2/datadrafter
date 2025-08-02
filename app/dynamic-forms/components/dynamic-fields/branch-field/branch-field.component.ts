import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dd-branch-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch-field.component.html',
  styleUrls: ['./branch-field.component.scss']
})
export class BranchFieldComponent {
  @Input() label = '';
}
