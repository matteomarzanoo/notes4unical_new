import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { docDeactivateGuard } from './doc-deactivate.guard';

describe('docDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => docDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
