import { Component, Input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Shape } from '../../../../app/models/Shape';

@Component({
  selector: 'dd-element-properties',
  templateUrl: './element-properties.component.html',
  styleUrl: './element-properties.component.scss',
  imports: [ TitleCasePipe]
})
export class ElementPropertiesComponent {
  @Input() shape!: Shape | null;
}
