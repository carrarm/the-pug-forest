import { booleanAttribute, Component, inject, input } from '@angular/core';
import { GameStateService } from '@core/services/game-state';
import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { TierService } from '@core/services/tier';

@Component({
  selector: 'app-pug-counter-panel',
  imports: [ShortNumberPipe],
  templateUrl: './pug-counter-panel.html',
  styleUrl: './pug-counter-panel.css',
})
export class PugCounterPanel {
  public readonly inline = input(false, { transform: booleanAttribute });

  protected readonly gameState = inject(GameStateService);
  protected readonly tierService = inject(TierService);
}
