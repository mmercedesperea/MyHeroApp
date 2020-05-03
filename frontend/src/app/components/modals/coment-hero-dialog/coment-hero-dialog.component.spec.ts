import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentHeroDialogComponent } from './coment-hero-dialog.component';

describe('ComentHeroDialogComponent', () => {
  let component: ComentHeroDialogComponent;
  let fixture: ComponentFixture<ComentHeroDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentHeroDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
