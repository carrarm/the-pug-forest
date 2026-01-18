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
      addPrestiges: (howMany: number) => this.addPrestiges(howMany),
      addPugs: (howMany: number) => this.addPugs(howMany),
      resetGame: () => this.resetGame(),
      setPugs: (howMany: number) => this.setPugs(howMany),
    };
  }

  private addPrestiges(howMany: number): void {
    this.gameState.statistics.update(({ allTimes, currentRun }) => {
      allTimes.totalPrestiges += howMany;
      allTimes.totalClicks = (allTimes.totalClicks || 1) * howMany;
      allTimes.totalPugs = (allTimes.totalPugs || 1) * howMany;
      allTimes.totalSpent = (allTimes.totalSpent || 1) * howMany;
      return { allTimes: { ...allTimes }, currentRun: { ...currentRun } };
    });
  }

  private addPugs(howMany: number): void {
    this.gameState.ownedPugs.update((owned) => owned + howMany);
  }

  private resetGame(): void {
    this.gameState.resetGame();
  }

  private setPugs(howMany: number): void {
    this.gameState.ownedPugs.set(howMany);
  }
}
