import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerosSearchComponent } from './heroes-search.component';

describe('HerosSearchComponent', () => {
  let component: HerosSearchComponent;
  let fixture: ComponentFixture<HerosSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerosSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerosSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
