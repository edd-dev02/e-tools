import { Injectable } from '@angular/core';
import { DistributeCalculus } from '@interfaces/distribute-calculus.interface';
import { PercentagesForm } from '@interfaces/percentages-form.interface';

@Injectable({
  providedIn: 'root',
})
export class SalaryDistributorService {

  //public calculateDistribution( percentagesValues: PercentagesForm ): DistributeCalculus[] {
  public calculateDistribution(salary: number, percentagesValues: PercentagesForm ): DistributeCalculus[] {

    let distribution: DistributeCalculus[] = [];

    for( const [category, amount] of Object.entries(percentagesValues) ) {

      distribution.push( { category, total:( (salary * amount) / 100 ) } );

    }

    return distribution;

  }
  
}
