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

  public computeAmountCost(amount: number, baseCost: number, owned: number): number {
    let totalCost = 0;
    for (let i = 0; i < amount; i++) {
      totalCost += this.computeCurrentCost(baseCost, owned + i);
    }
    return totalCost;
  }
}
