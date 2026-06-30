import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { SidebarService } from '../../services/sidebar.service';
import { RouterModule } from '@angular/router';
import { routes } from '@routes/';

@Component({
  selector: 'sidemenu',
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent implements OnInit {

  public sidebarService = inject(SidebarService);

  public menuItems = routes
    .flatMap(route =>
      (route.children ?? []).map(child => ({
        ...child,
        fullPath: `${route.path}/${child.path}`
      }))
    )
    .filter(route => route.path)
    .filter(route => !route.path?.includes(':'))
    .filter(route => !route.path?.includes('*'));

  ngOnInit() {
    this.onResize();
    console.log(this.menuItems);
  }

  @HostListener('window:resize')
  public onResize(): void {
    const mobile = window.innerWidth <= 768;

    this.sidebarService.isMobile.set(mobile);

    if (mobile) {
      this.sidebarService.collapsed.set(false);
    }
  }
}