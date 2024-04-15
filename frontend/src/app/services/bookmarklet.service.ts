import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookmarkletService {
  toBookmarklet(code: string) {
    return `javascript:${encodeURIComponent(code)}`;
  }

  run(code: string) {
    eval(code);
  }
}
