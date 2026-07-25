import { CommonModule } from '@angular/common';
import { Component, computed, inject, output, effect } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IconService } from '@shared/services/icon-service.service';
import { CategoryName } from '../../types/form.type';
import { startWith } from 'rxjs';
import { totalPercentageValidator } from '../../validators/total-percentage.validator';
import { PercentageStatus } from '../../types/percentage-status.type';
import { formInputs } from './../../helpers/form-inputs';
import { EmitForm } from '@interfaces/emit-form.interface';

@Component({
  selector: 'category-percentages',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIcon,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './category-percentages.component.html',
  styleUrl: './category-percentages.component.css',
})
export class CategoryPercentagesComponent {

  // Porcentajes por defecto
  private DEFAULT_PERCENTAGES = {
    saving: 10,
    bills: 70,
    leisure: 15,
    eFund: 5,
  }

  // Total de inputs del formulario
  public readonly formInputs = formInputs;

  private fb = inject(NonNullableFormBuilder)
  private readonly is = inject(IconService); // Obtener iconos registrados en el servicio

  // Declarar formulario reactivo
  public percentagesForm = this.fb.group(
    {
      saving: [this.DEFAULT_PERCENTAGES.saving, [Validators.min(0), Validators.max(100), Validators.required],],
      bills: [this.DEFAULT_PERCENTAGES.bills, [Validators.min(0), Validators.max(100), Validators.required],],
      eFund: [this.DEFAULT_PERCENTAGES.eFund, [Validators.min(0), Validators.max(100), Validators.required],],
      leisure: [this.DEFAULT_PERCENTAGES.leisure, [Validators.min(0), Validators.max(100), Validators.required],]
    },
    // Validación personalizada
    {
      validators: totalPercentageValidator()
    }
  );

  // Convertir el formulario en un signal
  public readonly formValuesSignal = toSignal(
    this.percentagesForm.valueChanges
      .pipe(
        startWith(this.percentagesForm.getRawValue())
      ),
    {
      initialValue: this.percentagesForm.getRawValue()
    }
  );

  // TODO: Emitir el objeto del formulario (si es válido y los valores de los porcentajes)

  // Emitir cuando el formulario sea válido
  public onValidForm = output<EmitForm>();

  // Emitir el valor modelo de reactividad basado en signals
  private readonly emitFormValues = effect(() => {

    // effect() Reacciona cuando esta señal cambia los valores del formulario
    // Sincroniza el estado del formulario con el componente padre.
    this.formValuesSignal();

    const isValid = this.percentagesForm.valid;
    const formValues = this.percentagesForm.getRawValue();

    this.onValidForm.emit({ isValid, formValues });
  })

  /* Emitir el valor de isValid con el modelo de reactividad anterior
  ngOnInit(): void {

    this.percentagesForm.statusChanges
    .subscribe( 
      ( ) => {
        console.log(this.percentagesForm.valid);
        this.onValidForm.emit( this.percentagesForm.valid );
      }
     );
    
  }
  */

  // Obtener la suma de los porcentajes
  public readonly totalPercentages = computed(() => {

    const values = this.formValuesSignal();

    return (
      (values.saving ?? 0) +
      (values.bills ?? 0) +
      (values.leisure ?? 0) +
      (values.eFund ?? 0)
    );
  })

  // Señal para mostrar cuanto porcentaje falta
  public readonly remaining = computed(() => {
    return 100 - this.totalPercentages();
  });

  // Señal para indicar cuando en la suma de los porcentajes ya se tiene el 100%
  public isTotalValid = computed(() => {
    return this.totalPercentages() === 100;
  });

  // Señal para validar cuando manualmente el usuario excede el límite digitando el valor en el input
  public readonly hasReachedLimit = computed(() => {
    return this.totalPercentages() >= 100;
  });

  // Señal para validar cuando manualmente el usuario excede el límite digitando el valor en el input
  public readonly invalidPercentage = computed(() => {
    return this.totalPercentages() > 100;
  });

  // Señal de estados para el feedback del formulario
  public readonly percentageStatus = computed<PercentageStatus>(() => {

    const total = this.totalPercentages();

    if (total < 100) {
      return 'missing';
    }

    if (total > 100) {
      return 'error';
    }

    return 'valid';
  });

  public increasePercentage(inputName: CategoryName): void {
    const control = this.percentagesForm.controls[inputName];

    const currentValue = control.value;

    if (currentValue < 100 && !this.hasReachedLimit()) {
      control.setValue(currentValue + 1);
    }

  }

  public decreasePercentage(inputName: CategoryName): void {
    const control = this.percentagesForm.controls[inputName];

    const currentValue = control.value;

    if (currentValue > 0) {
      control.setValue(currentValue - 1);
    }
  }

  public resetForm(): void {
    this.percentagesForm.reset(this.DEFAULT_PERCENTAGES);
  }

}