import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookmarklet',
  standalone: true
})
export class BookmarkletPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
