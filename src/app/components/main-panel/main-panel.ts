import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';

import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { GameStateService } from '@core/services/game-state';
import { TierService } from '@core/services/tier';
import { Device } from '@model';
import { sleep } from '@core/services/utils/general-utils';

interface PugSvg {
  path: string;
  bottom: string;
  left: string;
  slot: number;
}

const MAIN_PUG_SVG = 'pugs/pug-2.svg';
const PUG_BLINK_SVG = 'pugs/pug-2-eyes-closed.svg';
const PUG_WAG_SVG = 'pugs/pug-2-tail-wag.svg';
const PUG_GROUPS = [5, 20, 50, 100, 500];

@Component({
  selector: 'app-main-panel',
  imports: [ShortNumberPipe],
  templateUrl: './main-panel.html',
  styleUrl: './main-panel.css',
})
export class MainPanel implements OnInit {
  public readonly device = input.required<Device>();

  protected readonly visitForestText = viewChild.required<ElementRef>('visitForestText');

  protected readonly gameState = inject(GameStateService);
  protected readonly tierService = inject(TierService);

  protected readonly mainPug = signal(MAIN_PUG_SVG);
  protected readonly sidePugs = computed(() => {
    const maxGroup = PUG_GROUPS.at(-1)!;
    const owned = this.gameState.ownedPugs();
    const groupIndex =
      owned > maxGroup ? PUG_GROUPS.length : PUG_GROUPS.findIndex((group) => group > owned);
    return groupIndex > 0 ? `pugs/pug-group-${PUG_GROUPS[groupIndex - 1]}.svg` : '';
  });

  public ngOnInit(): void {
    setInterval(() => this.blink(), 4000);
    setInterval(() => this.tailWag(), 7000);
  }

  protected visitForest(): void {
    this.animateGainsText();
    this.gameState.ownedPugs.update((owned) => owned + this.tierService.clickProduction());
    this.gameState.statistics.update((stats) => {
      const firstClick = stats.firstClickDate ?? Date.now();
      return { ...stats, totalClicks: stats.totalClicks + 1, firstClickDate: firstClick };
    });
  }

  private animateGainsText(): void {
    const animatedText = this.visitForestText().nativeElement as HTMLDivElement;
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
}
