import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { selectHeroComponent } from './select-hero-dialog.component';

describe('selectHeroComponent', () => {
  let component: selectHeroComponent;
  let fixture: ComponentFixture<selectHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ selectHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(selectHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
