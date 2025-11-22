import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierCard } from './tier-card';

describe('TierCard', () => {
  let component: TierCard;
  let fixture: ComponentFixture<TierCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TierCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TierCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
