import { Component, computed, inject, input, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerArrowBigUp,
  tablerCheck,
  tablerCopy,
  tablerLink,
} from '@ng-icons/tabler-icons';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BookmarkletPipe } from '../../../../pipes/bookmarklet.pipe';
import { SafeUrlPipe } from '../../../../pipes/safe-url.pipe';
import { ClipboardService } from '../../../../services/clipboard.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [BookmarkletPipe, SafeUrlPipe, NgIconComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
  providers: [BookmarkletPipe],
  viewProviders: [
    provideIcons({
      arrowUp: tablerArrowBigUp,
      check: tablerCheck,
      copy: tablerCopy,
      link: tablerLink,
    }),
  ],
})
export class PreviewComponent {
  readonly #clipboardService = inject(ClipboardService);
  readonly #bookmarkletPipe = inject(BookmarkletPipe);
  readonly #deviceDetector = inject(DeviceDetectorService);

  readonly isDesktop = this.#deviceDetector.isDesktop();

  #copiedCount = signal<number>(0);
  readonly copied = computed(() => this.#copiedCount() > 0);

  readonly name = input.required<string>();
  readonly code = input.required<string>();

  async copyToClipboard() {
    const bookmarklet = this.#bookmarkletPipe.transform(this.code());
    await this.#clipboardService.copy(bookmarklet);
    this.#copiedCount.update((count) => count + 1);
    setTimeout(() => this.#copiedCount.update((count) => count - 1), 1500);
  }
}
