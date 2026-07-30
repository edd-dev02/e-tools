import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IconService } from '@shared/services/icon-service.service';
import { PercentagesForm } from '@interfaces/percentages-form.interface';
import { SalaryDistributorService } from '../../services/salary-distributor-service.service';

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
  private salaryDistributorService = inject(SalaryDistributorService);

  public percentagesValues = input<PercentagesForm>()

  public salaryForm = this.fb.group(
    {
      salary: [ , [Validators.required, Validators.min(1),], ]
    }
  );

  calcDistribution(salary: number) {

    if( this.percentagesValues === null ) return;

    this.salaryDistributorService.calculateDistribution(salary, this.percentagesValues()!);

  }

}
