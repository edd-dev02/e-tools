import { SalaryDistributorService } from './../../services/salary-distributor-service.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { DistributeCalculus } from '@interfaces/distribute-calculus.interface';
import { PercentagesForm } from '@interfaces/percentages-form.interface';

import { IconService } from '@shared/services/icon-service.service';
import { formInputs } from '../../helpers/form-inputs';

@Component({
  selector: 'calc-grid',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './calc-grid.component.html',
  styleUrl: './calc-grid.component.css',
})
export class CalcGridComponent implements AfterViewInit, OnDestroy {
  
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

  ngOnDestroy(): void {
    this.salaryDistributorService.showDistributionFlag.update( value => false );
  }

  private is = inject(IconService);


  // Metadatos de cada categoría
  private dataInputs = formInputs;

  // Inputs
  public categorysPercentage = input<PercentagesForm>();

  public distribution = input<DistributeCalculus[]>();

  /**
   * Une:
   * - iconos y estilos
   * - porcentaje
   * - cálculo final
   */
  public gridData = computed(() => {

    const distribution = this.distribution();
    const percentages = this.categorysPercentage();

    if (!distribution || !percentages) {
      return [];
    }

    return this.dataInputs.map(input => {

      const calculation = distribution.find(
        item => item.category === input.inputName
      );

      return {
        ...input,

        percentage: percentages[input.inputName],

        total: calculation?.total ?? 0,
      };

    });

  });

}