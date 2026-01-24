import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { PugCounterPanel } from '@components/pug-counter-panel/pug-counter-panel';
import { GameStateService } from '@core/services/game-state';
import { sleep } from '@core/services/utils/general-utils';
import { TierService } from '@core/services/tier';
import { Device } from '@model';
import { SettingsService } from '@core/services/settings';

const MAIN_PUG_SVG = 'pugs/pug-2.svg';
const PUG_BLINK_SVG = 'pugs/pug-2-eyes-closed.svg';
const PUG_WAG_SVG = 'pugs/pug-2-tail-wag.svg';
const PUG_GROUPS = [5, 20, 50, 100, 500];

@Component({
  selector: 'app-main-panel',
  imports: [PugCounterPanel],
  templateUrl: './main-panel.html',
  styleUrl: './main-panel.css',
})
export class MainPanel {
  public readonly device = input.required<Device>();

  protected readonly visitForestText = viewChild.required<ElementRef>('visitForestText');

  protected readonly gameState = inject(GameStateService);
  protected readonly tierService = inject(TierService);
  private readonly settings = inject(SettingsService);

  protected readonly mainPug = signal(MAIN_PUG_SVG);
  protected readonly sidePugs = computed(() => {
    if (!this.settings.animatedBackgroundEnabled()) {
      return '';
    }
    const maxGroup = PUG_GROUPS.at(-1)!;
    const owned = this.gameState.ownedPugs();
    const groupIndex =
      owned > maxGroup ? PUG_GROUPS.length : PUG_GROUPS.findIndex((group) => group > owned);
    return groupIndex > 0 ? `pugs/pug-group-${PUG_GROUPS[groupIndex - 1]}.svg` : '';
  });

  private animationIntervals: number[] = [];

  constructor() {
    effect(() => {
      if (this.settings.animationsEnabled()) {
        this.enableAnimations();
      } else {
        this.disableAnimations();
      }
    });
  }

  protected visitForest(): void {
    const generatedPugs =
      this.tierService.clickProduction() * this.tierService.getBonusProductionFactor();
    this.animateGainsText(generatedPugs);
    this.gameState.ownedPugs.update((owned) => owned + generatedPugs);
    this.gameState.statistics.update(({ allTimes, currentRun }) => ({
      allTimes: {
        ...allTimes,
        totalClicks: allTimes.totalClicks + 1,
        firstClickDate: allTimes.firstClickDate ?? Date.now(),
      },
      currentRun: {
        ...currentRun,
        totalClicks: currentRun.totalClicks + 1,
        firstClickDate: currentRun.firstClickDate ?? Date.now(),
      },
    }));
  }

  private animateGainsText(gains: number): void {
    const animatedText = this.visitForestText().nativeElement as HTMLDivElement;
    animatedText.innerText = `+${gains} pug(s)`;
    animatedText.animate(
      [
        { transform: 'translate(-50%, 0)', opacity: 0 },
        { opacity: 1, offset: 0.3 },
        { transform: 'translate(-50%, -20px)', opacity: 0 },
      ],
      {
        duration: 1000,
        easing: 'ease',
        fill: 'none',
      },
    );
  }

  private async blink(): Promise<void> {
    this.mainPug.set(PUG_BLINK_SVG);
    await sleep(200);
    this.mainPug.set(MAIN_PUG_SVG);
  }

  private async tailWag(): Promise<void> {
    const wag = async () => {
      this.mainPug.set(PUG_WAG_SVG);
      await sleep(200);
      this.mainPug.set(MAIN_PUG_SVG);
    };
    await wag();
    await sleep(200);
    await wag();
  }

  private enableAnimations(): void {
    this.animationIntervals.push(setInterval(() => this.blink(), 4000));
    this.animationIntervals.push(setInterval(() => this.tailWag(), 7000));
  }

  private disableAnimations(): void {
    this.animationIntervals.forEach((interval) => clearInterval(interval));
    this.mainPug.set(MAIN_PUG_SVG);
    this.animationIntervals = [];
  }
}
