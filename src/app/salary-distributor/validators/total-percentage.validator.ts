import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/* 
Validador para evitar que el valor de 'valid' del form sea true si la cantidad
de la suma de los porcentajes no es 100
*/

export function totalPercentageValidator(expectedTotal = 100): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const values = control.value as Record<string, number | null>;

    const total = Object.values(values).reduce<number>(
      (sum, value) => sum + (value ?? 0),
      0
    );

    return total === expectedTotal
      ? null
      : { totalPercentage: { expected: expectedTotal, actual: total } };
  };
}