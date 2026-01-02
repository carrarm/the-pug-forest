import { booleanAttribute, Component, effect, input, model, signal } from '@angular/core';

@Component({
  selector: 'app-toaster',
  imports: [],
  templateUrl: './toaster.html',
  styleUrl: './toaster.css',
})
export class Toaster {
  public readonly visible = model(false);
  public readonly delay = input(2000);
  public readonly alwaysVisible = input(false, { transform: booleanAttribute });

  constructor() {
    effect(() => {
      if (this.visible() && !this.alwaysVisible()) {
        this.showToaster();
      }
    });
  }

  public showToaster(delay = this.delay()): void {
    if (!this.visible()) {
      this.visible.set(true);
    }

    setTimeout(() => this.visible.set(false), delay);
  }
}
