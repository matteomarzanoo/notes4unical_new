import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { docActivateGuard } from './doc-activate.guard';

describe('docActivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => docActivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
