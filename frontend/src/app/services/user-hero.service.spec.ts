import { TestBed } from '@angular/core/testing';

import { UserHeroService } from './user-hero.service';

describe('UserHeroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserHeroService = TestBed.get(UserHeroService);
    expect(service).toBeTruthy();
  });
});
