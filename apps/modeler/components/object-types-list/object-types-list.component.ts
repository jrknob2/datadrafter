/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ObjectTypesService } from '../../services/object-types.service';
import { ObjectType } from '../../models/object-type.model';
import { ObjectTypeSearchBarComponent } from '../object-type-search-bar/object-type-search-bar.component';

@Component({
    selector: 'dd-object-types-list',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        ObjectTypeSearchBarComponent
    ],
    templateUrl: './object-types-list.component.html',
})
export class ObjectTypesListComponent implements OnInit {
    @Input() model: ObjectType | null = null;
    @Input() mode: 'view' | 'edit' | 'create' = 'view';

    private service = inject(ObjectTypesService);
    private sanitizer = inject(DomSanitizer);
    private router = inject(Router);

    allTypes: ObjectType[] = [];
    searchTerm = '';
    filteredTypes: ObjectType[] = [];
    getAllTypes: any;
    usedBy = 0;
    readOnly = true;

    ngOnInit(): void {
        this.service.getAll().subscribe(data => {
            this.allTypes = data;
            this.filterTypes();
        });
    }

    onSearchChanged(term: string) {
        this.searchTerm = term.toLowerCase();
        this.filterTypes();
    }

    sanitize(svg: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }

    viewModel(uuid: string) {
        const match = this.allTypes.find((t) => t.uuid === uuid);
        if (match) {
            this.model = match;
        }
    }

    filterTypes(): void {
        const term = this.searchTerm.toLowerCase();
        this.filteredTypes = this.allTypes.filter(type =>
            type.name.toLowerCase().includes(term) ||
            type.description?.toLowerCase().includes(term)
        );
    }

    addObjectType(): void {
        // Replace with your actual navigation or modal logic
        console.log('Add object type');
    }

    onClick(type: ObjectType, mode: string) {
        this.router.navigate([], {
            queryParams: {
                view: 'object-types-form',
                uuid: type.uuid,
                mode: mode
            },
            queryParamsHandling: 'merge'
        });
    }

    onDelete(type: ObjectType): void {
        // Replace with your actual delete logic
        const confirmed = confirm(`Are you sure you want to delete ${type.name}?`);
        if (confirmed) {
            console.log('Delete', type);
            // TODO: Call delete from service and refresh list
        }
    }

    sanitizeSvg(svg: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }
}
