import { Injectable, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  constructor() {

    this.registerIcons();

  }

  public registerIcons(): void {

    this.addIcons('percent', 'icons/percent.svg');
    this.addIcons('savings', 'icons/savings.svg');
    this.addIcons('bills', 'icons/bills.svg');
    this.addIcons('leisure', 'icons/leisure.svg');
    this.addIcons('efund', 'icons/efund.svg');
    this.addIcons('check', 'icons/check.svg');
    this.addIcons('warning', 'icons/warning.svg');
    this.addIcons('error', 'icons/error.svg');
    this.addIcons('restart', 'icons/restart.svg');
    this.addIcons('money', 'icons/money.svg');
    this.addIcons('finance', 'icons/finance.svg');
    this.addIcons('tip', 'icons/tip.svg');

  }

  public addIcons(iconName: string, iconUrl: string): void {
    this.iconRegistry.addSvgIcon(
      iconName,
      this.sanitizer.bypassSecurityTrustResourceUrl(
        iconUrl
      )
    );
  }

}