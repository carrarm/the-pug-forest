import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-toaster',
  imports: [],
  templateUrl: './toaster.html',
  styleUrl: './toaster.css',
})
export class Toaster {
  protected toasterVisible = signal(false);

  public showToaster(delay = 2000): void {
    this.toasterVisible.set(true);

    setTimeout(() => this.toasterVisible.set(false), delay);
  }
}
