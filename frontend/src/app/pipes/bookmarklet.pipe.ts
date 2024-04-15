import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookmarklet',
  standalone: true,
})
export class BookmarkletPipe implements PipeTransform {
  transform(code: string): string {
    return `javascript:${encodeURIComponent(code)}`;
  }
}
