import { Injectable } from '@angular/core';

const COST_SCALING_FACTOR = 1.2;

@Injectable({
  providedIn: 'root',
})
export class TierService {
  public computeCurrentCost(baseCost: number, owned: number): number {
    const exactCost = baseCost * Math.pow(COST_SCALING_FACTOR, owned);
    return Math.round(exactCost);
  }
}
