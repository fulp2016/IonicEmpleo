import { TestBed } from '@angular/core/testing';

import { OfertasProviderService } from './ofertas-provider.service';

describe('OfertasProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfertasProviderService = TestBed.get(OfertasProviderService);
    expect(service).toBeTruthy();
  });
});
