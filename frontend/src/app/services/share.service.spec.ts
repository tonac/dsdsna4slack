import { TestBed, inject } from '@angular/core/testing';

import { ShareService } from './share.service';

describe('ResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareService]
    });
  });

  it('should be created', inject([ShareService], (service: ShareService) => {
    expect(service).toBeTruthy();
  }));
});
