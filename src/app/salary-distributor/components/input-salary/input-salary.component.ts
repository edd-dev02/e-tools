import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IconService } from '@shared/services/icon-service.service';
import { validQuantity } from '../../validators/custom-validators';

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

  public salaryForm = this.fb.group(
    {
      salary: [1, [Validators.required, Validators.min(1), Validators.pattern(validQuantity)], ]
    }
  );

}
