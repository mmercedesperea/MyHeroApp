import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTeamDialogComponent } from './select-team-dialog.component';

describe('SelectTeamDialogComponent', () => {
  let component: SelectTeamDialogComponent;
  let fixture: ComponentFixture<SelectTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTeamDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
