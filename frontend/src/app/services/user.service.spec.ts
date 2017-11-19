import {inject, TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {TestConfig} from "../test.config";

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TestConfig.testModule).compileComponents();
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
