import {
  Component,
  HostListener,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'sidemenu',
  imports: [MatIconModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent implements OnInit {

  sidebarService = inject(SidebarService);

  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    const mobile = window.innerWidth <= 768;

    this.sidebarService.isMobile.set(mobile);

    if (mobile) {
      this.sidebarService.collapsed.set(false);
    }
  }
}