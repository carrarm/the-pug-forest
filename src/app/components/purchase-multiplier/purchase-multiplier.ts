import { Component, model } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-purchase-multiplier',
  imports: [NgClass],
  templateUrl: './purchase-multiplier.html',
  styleUrl: './purchase-multiplier.css',
})
export class PurchaseMultiplier {
  public readonly multiplier = model(1);

  protected readonly multiplierOptions = [1, 10, 25];
}
