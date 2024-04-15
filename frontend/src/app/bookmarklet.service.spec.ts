import { TestBed } from '@angular/core/testing';

import { BookmarkletService } from './bookmarklet.service';

describe('BookmarkletService', () => {
  let service: BookmarkletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
