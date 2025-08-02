import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'dd-object-type-dashboard',
    imports: [CommonModule ],
    templateUrl: './object-type-dashboard.component.html',
})
export class ObjectTypeDashboardComponent {
    @Input() selectedTypeUuid: string | null = null;

    // testMetadata: FormMetadata = {
    //     title: 'Smoke Test Form',
    //     fields: [
    //         { key: 'name', label: 'Name', type: 'text', required: true },
    //         { key: 'description', label: 'Description', type: 'textarea' }
    //     ]
    // };

    // formData = {
    //     name: 'Sample Object',
    //     description: 'Testing form integration'
    // };
}
