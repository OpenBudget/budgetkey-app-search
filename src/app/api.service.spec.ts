import { TestBed } from '@angular/core/testing';

import { SearchService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });
});
