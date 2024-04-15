import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookmarkletService {
  run(code: string) {
    eval(code);
  }
}
