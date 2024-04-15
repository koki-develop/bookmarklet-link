import { Component, input, inject } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import copy from 'copy-to-clipboard';
import { BookmarkletPipe } from '../../../../pipes/bookmarklet.pipe';
import { SafeUrlPipe } from '../../../../pipes/safe-url.pipe';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [BookmarkletPipe, SafeUrlPipe, NgIconComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
  providers: [BookmarkletPipe],
})
export class PreviewComponent {
  readonly #bookmarkletPipe = inject(BookmarkletPipe);

  readonly name = input.required<string>();
  readonly code = input.required<string>();

  copyToClipboard() {
    const bookmarklet = this.#bookmarkletPipe.transform(this.code());
    copy(bookmarklet);
  }
}
