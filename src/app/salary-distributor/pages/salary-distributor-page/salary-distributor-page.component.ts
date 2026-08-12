import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PageHeader } from '@interfaces/page-header.interface';
import { Header } from '@shared/components/page-header/page-header.component';
import { CategoryPercentagesComponent } from '../../components/category-percentages/category-percentages.component';
import { EmitForm } from '@interfaces/emit-form.interface';
import { PercentagesForm } from '@interfaces/percentages-form.interface';
import { InputSalaryComponent } from '../../components/input-salary/input-salary.component';
import { DistributeCalculus } from '@interfaces/distribute-calculus.interface';
import { CalcGridComponent } from '../../components/calc-grid/calc-grid.component';
import { SalaryDistributorService } from '../../services/salary-distributor-service.service';

@Component({
  selector: 'app-salary-distributor-page',
  imports: [CommonModule, Header, CategoryPercentagesComponent, InputSalaryComponent, CalcGridComponent],
  templateUrl: './salary-distributor-page.component.html',
  styleUrl: './salary-distributor-page.component.css',
})
export default class SalaryDistributorPage {

  public headerData = signal<PageHeader>({
    title: 'Distribuidor de salario',
    subtitle: 'Define como deseas distribuir tu salario en diferentes categorías.',
    iconStr: 'money_bag'
  });

  private salaryDistributorService = inject(SalaryDistributorService);

  public readonly showDistribution = computed(this.salaryDistributorService.showDistributionFlag);

  // Señal para mostrar la siguiente seccion
  public percentageFormStatus = signal<boolean>(true);

  // Recibir y enviar los valores de los porcentajes
  public percentagesValues?: PercentagesForm;

  // Recibir el cálculo
  public calcDistribution = signal<DistributeCalculus[] | null>(null);

  public updateSectionStatus({ isValid, formValues }: EmitForm) {

    this.percentageFormStatus.set(isValid);
    this.percentagesValues = formValues;

  }

  public catchCalc(calc: DistributeCalculus[]): void {
    this.calcDistribution.set(calc);
  }

}
