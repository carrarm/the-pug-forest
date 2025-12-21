import { Component, model } from '@angular/core';


@Component({
  selector: 'app-purchase-multiplier',
  templateUrl: './purchase-multiplier.html',
  styleUrl: './purchase-multiplier.css',
})
export class PurchaseMultiplier {
  public readonly multiplier = model(1);

  protected readonly multiplierOptions = [1, 10, 25];
}
