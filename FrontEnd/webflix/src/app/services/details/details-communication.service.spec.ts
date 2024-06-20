import { TestBed } from '@angular/core/testing';

import { DetailsCommunicationService } from './details-communication.service';

describe('DetailsCommunicationService', () => {
  let service: DetailsCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
