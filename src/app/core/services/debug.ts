import { inject, Injectable } from '@angular/core';
import { GameStateService } from '@core/services/game-state';

@Injectable({
  providedIn: 'root',
})
export class Debug {
  private readonly gameState = inject(GameStateService);

  public enableDebug(): void {
    console.log('Debug enabled');
    (window as any).PugForestDebug = {
      addPugs: (howMany: number) => this.addPugs(howMany),
      setPugs: (howMany: number) => this.setPugs(howMany),
    };
  }

  private addPugs(howMany: number): void {
    this.gameState.ownedPugs.update((owned) => owned + howMany);
  }

  private setPugs(howMany: number): void {
    this.gameState.ownedPugs.set(howMany);
  }
}
