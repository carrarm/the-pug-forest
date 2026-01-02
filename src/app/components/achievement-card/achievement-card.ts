import { booleanAttribute, Component, input } from '@angular/core';

import { Achievement } from '@model';

@Component({
  selector: 'app-achievement-card',
  imports: [],
  templateUrl: './achievement-card.html',
  styleUrl: './achievement-card.css',
})
export class AchievementCard {
  public readonly achievement = input.required<Achievement>();
  public readonly unlocked = input(false, { transform: booleanAttribute });
}
