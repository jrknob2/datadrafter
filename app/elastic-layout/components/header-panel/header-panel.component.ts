import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'dd-header-panel',
    standalone: true,
    templateUrl: './header-panel.component.html',
    styleUrls: ['./header-panel.component.scss'],
    imports: [CommonModule]
})
export class HeaderPanelComponent {
    showSettings = false;
    showProfile = false;

    toggleSettings() {
        this.showSettings = !this.showSettings;
        if (this.showSettings) this.showProfile = false;
    }

    toggleProfile() {
        this.showProfile = !this.showProfile;
        if (this.showProfile) this.showSettings = false;
    }

    toggleMenu() {
        alert('Menu toggled!');
    }
}
