import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {

  readonly mobileOpened = signal(false);
  readonly collapsed = signal(false);
  readonly isMobile = signal(window.innerWidth <= 768);

  toggleMobile() {
    this.mobileOpened.update(v => !v);
  }

  openMobile() {
    this.mobileOpened.set(true);
  }

  closeMobile() {
    this.mobileOpened.set(false);
  }

  toggleCollapsed() {
  if (this.isMobile()) {
    return;
  }

  this.collapsed.update(v => !v);
}

  collapse() {
    this.collapsed.set(true);
  }

  expand() {
    this.collapsed.set(false);
  }

}
