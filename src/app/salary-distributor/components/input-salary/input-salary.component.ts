import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IconService } from '@shared/services/icon-service.service';
import { PercentagesForm } from '@interfaces/percentages-form.interface';
import { SalaryDistributorService } from '../../services/salary-distributor-service.service';
import { DistributeCalculus } from '@interfaces/distribute-calculus.interface';

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
export class InputSalaryComponent implements AfterViewInit {

  private fb = inject(NonNullableFormBuilder);
  private is = inject(IconService);
  private salaryDistributorService = inject(SalaryDistributorService);
  private elementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  public percentagesValues = input<PercentagesForm>()

  public salaryForm = this.fb.group(
    {
      salary: [ , [Validators.required, Validators.min(1),], ]
    }
  );

  public onCalcDistribution = output<DistributeCalculus[]>();

  calcDistribution(salary: number) {

    if( this.percentagesValues === null ) return;

    this.onCalcDistribution.emit(this.salaryDistributorService.calculateDistribution(salary, this.percentagesValues()!));

    this.salaryDistributorService.showDistributionFlag.update(value => true);

  }

}
