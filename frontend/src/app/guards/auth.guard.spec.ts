import {inject, TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {TestConfig} from "../test.config";

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TestConfig.testModule).compileComponents();
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
