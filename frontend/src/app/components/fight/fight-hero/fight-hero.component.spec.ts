import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightHeroComponent } from './fight-hero.component';

describe('FightHeroComponent', () => {
  let component: FightHeroComponent;
  let fixture: ComponentFixture<FightHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FightHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
