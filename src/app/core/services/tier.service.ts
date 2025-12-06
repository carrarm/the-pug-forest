import { Injectable } from '@angular/core';

const COST_SCALING_FACTOR = 1.07;

@Injectable({
  providedIn: 'root',
})
export class TierService {
  public computeCost(amount: number, baseCost: number, owned: number): number {
    // cost(n) + cost(n+1) + ... is a geometric-series
    // Geometric-series formula: S =  (r^(n+1) - 1) / (r - 1) with r = scaling factor
    // Use n instead of n+1 to consider "n" a single term rather than an offset (base convention)
    // and avoid to double-count n = 1
    const geometricSeriesCost =
      (Math.pow(COST_SCALING_FACTOR, amount) - 1) / (COST_SCALING_FACTOR - 1);
    return Math.round(baseCost * Math.pow(COST_SCALING_FACTOR, owned) * geometricSeriesCost);
  }
}
