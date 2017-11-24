import {inject, TestBed} from '@angular/core/testing';

import {AlertService} from './alert.service';
import {TestConfig} from "../test.config";

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(TestConfig.testModule).compileComponents();
  });

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});
