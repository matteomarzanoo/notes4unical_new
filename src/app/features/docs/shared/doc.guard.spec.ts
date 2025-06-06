import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { docGuard } from './doc.guard';

describe('docGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => docGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
