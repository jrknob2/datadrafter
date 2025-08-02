import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl, SafeStyle, SafeScript, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SharedUtilsService {
  constructor(private sanitizer: DomSanitizer) {}

  // Sanitization Utilities
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  sanitizeStyle(style: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  sanitizeScript(script: string): SafeScript {
    return this.sanitizer.bypassSecurityTrustScript(script);
  }

  sanitizeResourceUrl(resourceUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(resourceUrl);
  }

  // String Utilities
  truncate(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '…' : text;
  }

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // ID/UUID Utilities
  shortId(uuid: string): string {
    return uuid?.split('-')[0] || '';
  }

  // Date Formatting
  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString();
  }
}
