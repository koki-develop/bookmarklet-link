import { Component, input, inject, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import copy from 'copy-to-clipboard';
import { BookmarkletPipe } from '../../../../pipes/bookmarklet.pipe';
import { SafeUrlPipe } from '../../../../pipes/safe-url.pipe';
import { tablerCheck, tablerCopy, tablerLink } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [BookmarkletPipe, SafeUrlPipe, NgIconComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
  providers: [BookmarkletPipe],
  viewProviders: [
    provideIcons({
      check: tablerCheck,
      copy: tablerCopy,
      link: tablerLink,
    }),
  ],
})
export class PreviewComponent {
  readonly #bookmarkletPipe = inject(BookmarkletPipe);

  #copiedCount = signal<number>(0);
  readonly copied = computed(() => this.#copiedCount() > 0);

  readonly name = input.required<string>();
  readonly code = input.required<string>();

  copyToClipboard() {
    const bookmarklet = this.#bookmarkletPipe.transform(this.code());
    if (!copy(bookmarklet)) return;

    this.#copiedCount.update((count) => count + 1);
    setTimeout(() => this.#copiedCount.update((count) => count - 1), 1500);
  }
}
