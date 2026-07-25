import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IconService } from '@shared/services/icon-service.service';

@Component({
  selector: 'input-salary',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './input-salary.component.html',
  styleUrl: './input-salary.component.css',
})
export class InputSalaryComponent {

  private fb = inject(NonNullableFormBuilder);
  private is = inject(IconService);

  

}
