import {inject, TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {TestConfig} from "../test.config";

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TestConfig.testModule).compileComponents();
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
