import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup {
  public readonly popupTitle = input('');
  public readonly closed = output<void>();
}
