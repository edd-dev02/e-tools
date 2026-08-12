import { Injectable, signal } from '@angular/core';
import { DistributeCalculus } from '@interfaces/distribute-calculus.interface';
import { PercentagesForm } from '@interfaces/percentages-form.interface';
import { CategoryName } from '../types/form.type';

@Injectable({
  providedIn: 'root',
})
export class SalaryDistributorService {

  public showDistributionFlag = signal<boolean>(false);

  public calculateDistribution(salary: number, percentagesValues: PercentagesForm ): DistributeCalculus[] {

    let distribution: DistributeCalculus[] = [];

    for( const [category, amount] of Object.entries(percentagesValues) as [CategoryName, number][] ) {

      distribution.push( { category, total:( (salary * amount) / 100 ) } );

    }

    return distribution;

  }
  
}
