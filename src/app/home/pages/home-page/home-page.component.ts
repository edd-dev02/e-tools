import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IconService } from '@shared/services/icon-service.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, MatIcon, MatCardModule, MatButton, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export default class HomePage {

  private is = inject(IconService);

}
