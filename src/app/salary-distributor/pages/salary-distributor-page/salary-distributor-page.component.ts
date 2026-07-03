import { Component, signal } from '@angular/core';
import { PageHeader } from '@interfaces/page-header.interface';
import { Header } from '@shared/components/page-header/page-header.component';
import { BidiModule } from "@angular/cdk/bidi";

@Component({
  selector: 'app-salary-distributor-page',
  imports: [Header, BidiModule],
  templateUrl: './salary-distributor-page.component.html',
  styleUrl: './salary-distributor-page.component.css',
})
export default class SalaryDistributorPage {

  public headerData = signal<PageHeader>({
    title: 'Distribuidor de salario',
    subtitle: 'Define como deseas distribuir tu salario en diferentes categorías.',
    iconStr: 'money_bag'
  })

}
