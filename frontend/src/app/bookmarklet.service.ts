import { Injectable, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class BookmarkletService {
  readonly #sanitizer = inject(DomSanitizer);

  toBookmarklet(code: string) {
    return `javascript:${encodeURIComponent(code)}`;
  }

  sanitize(bookmarklet: string) {
    return this.#sanitizer.bypassSecurityTrustUrl(bookmarklet);
  }

  run(code: string) {
    eval(code);
  }
}
