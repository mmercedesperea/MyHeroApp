import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightTeamComponent } from './fight-team.component';

describe('FightTeamComponent', () => {
  let component: FightTeamComponent;
  let fixture: ComponentFixture<FightTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FightTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
