import { TestBed } from '@angular/core/testing';

import { GutenbergAngularService } from './gutenberg-angular.service';

describe('GutenbergAngularService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GutenbergAngularService = TestBed.get(GutenbergAngularService);
    expect(service).toBeTruthy();
  });
});
