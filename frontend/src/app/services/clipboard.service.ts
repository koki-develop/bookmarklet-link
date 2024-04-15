import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  async copy(text: string): Promise<void> {
    await navigator.clipboard.writeText(text);
  }
}
