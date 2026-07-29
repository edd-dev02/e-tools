import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { PageHeader } from '@interfaces/page-header.interface';
import { Header } from '@shared/components/page-header/page-header.component';
import { CategoryPercentagesComponent } from '../../components/category-percentages/category-percentages.component';
import { EmitForm, PercentagesForm } from '@interfaces/emit-form.interface';
import { InputSalaryComponent } from '../../components/input-salary/input-salary.component';

@Component({
  selector: 'app-salary-distributor-page',
  imports: [CommonModule, Header, CategoryPercentagesComponent, InputSalaryComponent],
  templateUrl: './salary-distributor-page.component.html',
  styleUrl: './salary-distributor-page.component.css',
})
export default class SalaryDistributorPage {
  
  public headerData = signal<PageHeader>({
    title: 'Distribuidor de salario',
    subtitle: 'Define como deseas distribuir tu salario en diferentes categorías.',
    iconStr: 'money_bag'
  })

  // Señal para mostrar la siguiente seccion
  public percentageFormStatus = signal<boolean>( true );

  // Recibir y enviar los valores de los porcentajes
  public percentagesValues?: PercentagesForm;

  public updateSectionStatus({ isValid, formValues }: EmitForm) {

    this.percentageFormStatus.set( isValid );
    this.percentagesValues = formValues;

  }

}
