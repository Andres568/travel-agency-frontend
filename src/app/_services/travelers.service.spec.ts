import { TestBed } from '@angular/core/testing';

import { TravelersService } from './travelers.service';

describe('TravelersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TravelersService = TestBed.get(TravelersService);
    expect(service).toBeTruthy();
  });
});
